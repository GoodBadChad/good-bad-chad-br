/**
 * Papa Chad is a mostly idle entity who must be able to walk for the tutorial.
 * Otherwise he stands still in his idle position and offers dialog options to Chad.
 */
class PapaChad {
    constructor(x, y) {
        /** The x position of the Papa Chad (in the game world). */
        this.x = x;
        /** The y position of the Papa Chad (in the game world). */
        this.y = y;
        /** An associative array of the animations for this Papa Chad. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Papa Chad looking? */
        this.facing = "right";
        /** What is the Papa Chad doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        /** The velocity at which PapaChad is moving in the x direction. */
        this.xVelocity = 0;
        /** The velocity at which PapaChad is moving in the y direction. */
        this.yVelocity = 0;

        //this.findDirection();
    };

    /** The height, in pixels, of the sprite ON THE SPRITESHEET. */
    static get HEIGHT() {
        return 49;
    };

    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 3;
    };

    /** This will be the height of Papa Chad ON THE CANVAS. */
    static get SCALED_HEIGHT() {
        return PapaChad.SCALE * PapaChad.HEIGHT;
    };

    /** This will be the width of Papa Chad ON THE CANVAS. */
    static get SCALED_WIDTH() {
        return PapaChad.SCALE * PapaChad.WIDTH;
    };

    static get SPEED() {
        return PapaChad.SCALE * 100;
    };

    /** The filepath to Papa Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/parents.png";
    };

    /** The width, in pixels, of the sprite ON THE SPRITESHEET. */
    static get WIDTH() {
        return 29;
    };

    /** Change what Papa Chad is doing and where it is. */
    update() {
        // NOTE: this entire method will be moved to Chad as soon as we have his spritesheet ready.
        
        // Step 1: Listen for user input.
        // for now, just left and right
        this.xVelocity = 0;
        if (GAME.left) {
            this.action = "walking";
            this.facing = "left";
            this.xVelocity -= PapaChad.SPEED;
        }
        if (GAME.right) {
            this.action = "walking";
            this.facing = "right";
            this.xVelocity += PapaChad.SPEED;
        }
        if (GAME.space) {
            this.action = "idle";
            this.yVelocity = -300;
        }
        if (!(GAME.right || GAME.left)) {
            this.action = "idle";
        }

        // Step 2: Account for gravity, which is always going to push you downward.
        this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick;

        // Step 3: Now move.
        this.x += this.xVelocity * GAME.clockTick;
        this.y += this.yVelocity * GAME.clockTick;
        if (this.y > DIMENSION.MAX_Y) {
            this.y -= DIMENSION.BLOCK_HEIGHT * Block.SCALED_SIZE;
        }
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
        
        // Step 4: Have we collided with anything?
        GAME.entities.forEach((entity) => {
            // Does entity even have a BB?
            if (entity.boundingBox) {
                // Are they even colliding?
                let collision = this.boundingBox.collide(entity.boundingBox);
                if (collision) {
                    // NOTE: the collision object tells us which sides of entity
                    //       we are colliding with.
                    if (entity instanceof Block) {
                        // This is how much we have moved since last frame.
                        const movementVector = { deltaX : this.boundingBox.left - this.lastBoundingBox.left, deltaY : this.boundingBox.top - this.lastBoundingBox.top };
                        if (movementVector.deltaX && movementVector.deltaY) {
                            // We are moving in both planes.
                            // This is where it is tricky.
                            // Are we only touching one side, or touching 3? This is simple.
                            if (
                                ((collision.top && !collision.bottom) || (collision.bottom && !collision.top)) // colliding with EITHER bottom OR top
                                && ((collision.right && collision.left) || (!collision.right && !collision.left)) // colliding with BOTH/NEITHER side.
                            ) {
                                // We are falling onto the top OR jumping into the bottom.
                                this.y = movementVector.deltaY > 0 ? entity.y - PapaChad.SCALED_HEIGHT : entity.boundingBox.bottom;
                                this.yVelocity = 0;
                            }
                            else if (
                                ((collision.right && !collision.left) || (collision.left && !collision.right)) //colliding with EITHER left or right.
                                && ((collision.top && collision.bottom) || (!collision.top && !collision.bottom)) // colliding with BOTH/NEITHER top/bottom
                            ) {
                                // We are walking into the side of a block.
                                this.x = movementVector.deltaX > 0 ? entity.x - PapaChad.SCALED_WIDTH : entity.boundingBox.right;
                            }

                            // Now we know that we are touching two sides - intersecting with a single corner.
                            // We also know that we are moving in both planes.
                            // This is the super tricky stuff!

                            // Are we moving off the end of a block? This is simple:
                            else if (
                                (movementVector.deltaX > 0 && collision.right) // moving right off the right edge
                                || (movementVector.deltaX < 0 && collision.left)) // moving left off the left edge
                            {
                                // Just push yourself back up/down!
                                this.y = movementVector.deltaY > 0 ? entity.y - PapaChad.SCALED_HEIGHT : entity.boundingBox.bottom;
                                this.yVelocity = 0;
                            }
                            // We can do the same for the sides:
                            else if (
                                (movementVector.deltaY > 0 && collision.bottom)
                                || (movementVector.deltaY < 0 && collision.top)
                            ) {
                                // Push yourself back over to the side!
                                this.x = movementVector.deltaX > 0 ? entity.x - PapaChad.SCALED_WIDTH : entity.boundingBox.bottom;
                            }
                            // Now, we know we are hitting a single corner AND moving INTO the block, in both directions.
                            // The best thing i can do now is draw a line from the corner that is doing the invading, and find out which
                            // edge it would have naturally landed on, having followed its true path.
                            else if (movementVector.deltaX > 0) {
                                if (movementVector.deltaY > 0) {
                                    // We're moving down and right, hitting TL corner.
                                    // Recall point slope form: (y-y1) = m(x-x1).
                                    const m = movementVector.deltaY / movementVector.deltaX;
                                    const yAtLeft = m * (entity.x - this.x) + this.y;
                                    if (yAtLeft > entity.y) {
                                        // push him to the top
                                        this.y = entity.y - PapaChad.SCALED_HEIGHT;
                                        this.yVelocity = 0;
                                    } else {
                                        //push him to the left.
                                        this.x = entity.x - PapaChad.SCALED_WIDTH;
                                    }
                                } else {
                                    // We're moving up and right, hitting BL corner.
                                    // Recall point slope form: (y-y1) = m(x-x1).
                                    const m = movementVector.deltaY / movementVector.deltaX;
                                    const yAtLeft = m * (entity.x - this.x) + this.y;
                                    if (yAtLeft < entity.boundingBox.bottom) {
                                        // push him to the bottom.
                                        this.y = entity.boundingBox.bottom;
                                        this.yVelocity = 0;
                                    } else {
                                        //push him to the left.
                                        this.x = entity.x - PapaChad.SCALED_WIDTH;
                                    }
                                }
                            } else {
                                // if (movementVector.deltaY > 0) {
                                //     // We're moving down and left, hitting TR corner.
                                //     // Recall point slope form: (y-y1) = m(x-x1).
                                //     const m = movementVector.deltaY / movementVector.deltaX;
                                //     const yAtRight = m * (entity.x - this.x) + this.y;
                                //     if (yAtRight > entity.y) {
                                //         // push him to the top.
                                //         this.y = entity.y - PapaChad.SCALED_WIDTH;
                                //         this.yVelocity = 0;
                                //     } else {
                                //         //push him to the right;
                                //         this.x = entity.boundingBox.right;
                                //     }
                                // } else {
                                //     // We're moving up and left, hitting BR corner.
                                //     // Recall point slope form: (y-y1) = m(x-x1).
                                //     const m = movementVector.deltaY / movementVector.deltaX;
                                //     const yAtRight = m * (entity.x - this.x) + this.y;
                                //     if (yAtRight < entity.y) {
                                //         // push him to the bottom.
                                //         this.y = entity.boundingBox.bottom;
                                //         this.yVelocity = 0;
                                //     } else {
                                //         //push him to the right;
                                //         this.x = entity.boundingBox.right;
                                //     }
                                // }
                            }
                        } else if (movementVector.deltaY) {
                            // We are only moving vertically - we are either jumping through the bottom of a block, or falling through the top.
                            this.y = movementVector.deltaY > 0 ? entity.y - PapaChad.SCALED_HEIGHT : entity.boundingBox.bottom;
                            this.yVelocity = 0;
                        } else if (movementVector.deltaX) {
                            // We are only moving horizontally - we are walking through the size of a block.
                            this.x = movementVector.deltaX > 0 ? entity.x - PapaChad.SCALED_WIDTH : entity.boundingBox.right;
                        } else {
                            // We haven't moved at all, and yet we're still colliding? This is weird.
                            console.log("We haven't moved since last frame, yet we're colliding with a block. Something is wrong.");
                        }
                    }
                    if (entity instanceof Portal) {
                        const dim = DIMENSION.dimension === entity.dimension ? Dimension.VILLAGE : entity.dimension;
                        DIMENSION = new Dimension(dim);
                        DIMENSION.loadDimension();
                    }
                }
                // There's no collision - don't do anything!
            }
            // There's no bounding box, so who gives a shrek?
        });

        // Step 5: Now that your position is actually figured out, draw your correct bounding box.
        this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
    };

    /** Draw Papa Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.x - CAMERA.x, this.y - CAMERA.y, PapaChad.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(
            PapaChad.SPRITESHEET,
            0, 0,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            1, 1);
        this.animations["right"]["idle"] = new Animator(
            PapaChad.SPRITESHEET,
            0, PapaChad.HEIGHT,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            1, 1);
        
        this.animations["left"]["walking"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.WIDTH, 0,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            6, 1 / 6);
        this.animations["right"]["walking"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            6, 1 / 6);
    };
};