/**
 * Papa Chad is a mostly idle entity who must be able to walk for the tutorial.
 * Otherwise he stands still in his idle position and offers dialog options to Chad.
 * 
 * @author Devin, Caleb, Nathan, Trae
 */
class PapaChad {
    constructor(x, y) {
        /** Checks if CHAD has collided with the ground. */
        this.isOnGround = false;
        /** Checks if CHAD can double jump. */
        this.canDoubleJump = false;
        /** Checks if CHAD has double jumped. */
        this.hasDoubleJumped = false;
        /** Gets the the y position of CHAD from the last time he was on the ground. */
        this.prevYPosOnGround = 0;
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
        /** Name of character. */
        this.name = "Papa Chad";
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
    /** The velocity of the first jump */
    get FIRST_JUMP_VELOCITY() {
        return -500
    }
    /** The velocity of the double jump. */
    get SECOND_JUMP_VELOCITY() {
        return -600;
    }

    /** The mulitiplier that allows CHAD to run. */
    get SPRINT_MULTIPLIER() {
        return 0.5;
    }

    /** Change what Papa Chad is doing and where it is. */
    update() {
        this.canDoubleJump = false;
        if (this.isOnGround) {
            this.hasDoubleJumped = false;
        }
        // NOTE: this entire method will be moved to Chad as soon as we have his spritesheet ready.

        // Step 1: Listen for user input.
        this.xVelocity = 0;
        if (GAME.left) {
            this.action = "walking";
            this.facing = "left";
            this.xVelocity -= PapaChad.SPEED;
            if (GAME.shift) {
                this.action = "running";
                this.facing = "left";
                this.xVelocity -= PapaChad.SPEED * this.SPRINT_MULTIPLIER;
            }
        }
        if (GAME.right) {
            this.action = "walking";
            this.facing = "right";
            this.xVelocity += PapaChad.SPEED;
            if (GAME.shift) {
                this.action = "running";
                this.facing = "right";
                this.xVelocity += PapaChad.SPEED * this.SPRINT_MULTIPLIER;
            }
        }
        if (GAME.space && this.isOnGround) {
            this.action = "jumping";
            this.yVelocity = this.FIRST_JUMP_VELOCITY;
            this.isOnGround = false;
            this.hasDoubleJumped = false;
        }
        // Gets change in y from when CHAD left ground to current.
        let deltaHeight = Math.abs(CHAD.y - this.prevYPosOnGround);

        if (!this.isOnGround && deltaHeight >= Math.abs(this.FIRST_JUMP_VELOCITY / 5) + 32) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }
        if (!this.isOnGround && CHAD.yVelocity >= 0) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }
        if (GAME.space && this.canDoubleJump) {
            this.action = "jumping";
            this.yVelocity = this.SECOND_JUMP_VELOCITY;
            this.isOnGround = false;
            this.canDoubleJump = false;
            this.hasDoubleJumped = true;
        }

        // this is for the slingshot
        if (GAME.mouseDown) {
            // determine if mouse is to the right or left of Chad
            // remember, the mouse is in screen coordinates, not world coordinates
            const mouseX = GAME.mouseX + CAMERA.x;
            if (mouseX > this.x) {
                this.facing = "right";
            } else {
                this.facing = "left";
            }
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
        this.isOnGround = false;

        // Step 4: Have we collided with anything?
        GAME.entities.forEach((entity) => {
            // Does entity even have a BB?
            if (entity.boundingBox) {
                // Are they even colliding?
                if (this.boundingBox.collide(entity.boundingBox)) {
                    if (entity instanceof Block) {

                        // Is there overlap with the block on the x or y-axes?
                        const isOverlapX = this.lastBoundingBox.left < entity.boundingBox.right
                            && this.lastBoundingBox.right > entity.boundingBox.left;
                        const isOverlapY = this.lastBoundingBox.bottom > entity.boundingBox.top
                            && this.lastBoundingBox.top < entity.boundingBox.bottom;

                        if (isOverlapX
                            && this.lastBoundingBox.bottom <= entity.boundingBox.top
                            && this.boundingBox.bottom > entity.boundingBox.top) {
                            // We are colliding with the top.
                            this.y = entity.boundingBox.top - PapaChad.SCALED_HEIGHT;
                            this.yVelocity = 0;
                            // ON_GROUND(true);
                            this.isOnGround = true;
                            this.prevYPosOnGround = CHAD.y;
                        } else if (isOverlapY
                            && this.lastBoundingBox.right <= entity.boundingBox.left
                            && this.boundingBox.right > entity.boundingBox.left) {
                            // We are colliding with the left side.

                            this.x = entity.boundingBox.left - PapaChad.SCALED_WIDTH;
                        } else if (isOverlapY
                            && this.lastBoundingBox.left >= entity.boundingBox.right
                            && this.boundingBox.left < entity.boundingBox.right) {
                            // We are colliding with the right side.

                            this.x = entity.boundingBox.right;
                        } else if (isOverlapX
                            && this.lastBoundingBox.top >= entity.boundingBox.bottom
                            && this.boundingBox.top < entity.boundingBox.bottom) {
                            // We are colliding with the bottom.
                            this.y = entity.boundingBox.bottom;
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
            6, 1 / 12);
        this.animations["right"]["walking"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            6, 1 / 12);

        this.animations["left"]["running"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.WIDTH, 0,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            6, 1 / 18);
        this.animations["right"]["running"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            6, 1 / 18);

        this.animations["left"]["jumping"] = new Animator(
            PapaChad.SPRITESHEET,
            0, 0,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            1, 1);
        this.animations["right"]["jumping"] = new Animator(
            PapaChad.SPRITESHEET,
            0, PapaChad.HEIGHT,
            PapaChad.WIDTH, PapaChad.HEIGHT,
            1, 1);

    };
};