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
            // Does entity even have a BB? Are they even colliding?
            if (entity.boundingBox && this.boundingBox.collide(entity.boundingBox)) {

                if (this.entity instanceof Portal) {
                    if (entity.color === "red") {
                        DIMENSION.dimension = Dimension.LAVA;
                        
                    }
                }
                // Is entity a block?
                // if (entity instanceof Block) {
                //     // Are we falling?
                //     if (this.yVelocity > 0) {
                //         // Was i above it last tick?
                //         if (this.lastBoundingBox.bottom <= entity.boundingBox.top) {
                //             this.yVelocity = 0;
                //             this.y = entity.y - PapaChad.SCALED_HEIGHT;
                //         }
                //     }
                //     // Are we jumping?
                //     else {
                //         // Was i below it last tick?
                //         if (this.lastBoundingBox.top >= entity.boundingBox.bottom) {
                //             this.yVelocity = 0;
                //             this.y = entity.y + Block.SCALED_SIZE;
                //         }
                //     }
                //     // Are we walking right? 
                //     if (this.xVelocity > 0) {
                //         // Was i left of it last tick?
                //         if (this.lastBoundingBox.right <= entity.boundingBox.left) {
                //             this.xVelocity = 0;
                //             this.x = entity.x - PapaChad.SCALED_WIDTH;
                //         }
                //     }
                //     // Are we walking left?
                //     else {
                //         // Was i right of it last tick?
                //         if (this.lastBoundingBox.left >= entity.boundingBox.right) {
                //             this.xVelocity = 0;
                //             this.x = entity.x + Block.SCALED_SIZE;
                //         }
                //     }
                // }

                // if (entity instanceof Block) {
                //     const yMult = this.yVelocity > 0 ? 1 : -1;
                //     const xMult = this.xVelocity > 0 ? 1 : -1;
                //     // This is the most tricky situation: what if you are moving diagonally?
                //     if (this.xVelocity && this.yVelocity) {
                //         // What if we tried JUST doing your horizontal movement?
                //         let newBB = new BoundingBox(this.x, this.lastBoundingBox.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //         if (!newBB.collide(entity.boundingBox)) {
                //             // Technically, we might not be at the limit of our y value though.
                //             if (this.yVelocity > 0) {
                //                 this.y = entity.boundingBox.top - PapaChad.SCALED_HEIGHT;
                //                 this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //             } else {
                //                 this.y = entity.boundingBox.bottom;
                //                 this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //             }
                //             this.yVelocity = 0;
                //         }
                //         // Now - What if we try only doing vertical movement?
                //         newBB = new BoundingBox(this.lastBoundingBox.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //         if (!newBB.collide(entity.boundingBox)) {
                //             // Technically, we might not be at the limit of our x value though.
                //             if (this.xVelocity > 0) {
                //                 this.x = entity.boundingBox.left - PapaChad.SCALED_WIDTH;
                //                 this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //             } else {
                //                 this.x = entity.boundingBox.right;
                //                 this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //             }
                //         }
                //         // If neither of these worked, you can't move.
                //         // TODO: the below is not perfect.
                //         this.boundingBox = this.lastBoundingBox;
                //         this.x = this.boundingBox.x;
                //         this.y = this.boundingBox.y;
                //     }
                //     // Are you just moving in the y?
                //     else if (this.yVelocity) {
                //         // We are falling through the top of a brick, or jumping through the bottom.
                //         const offset = this.yVelocity > 0 ? PapaChad.SCALED_HEIGHT : 0;
                //         const start = this.yVelocity > 0 ? entity.boundingBox.top : entity.boundingBox.bottom;
                //         this.y = start - offset;
                //         this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //         this.yVelocity = 0;
                //     }
                //     // Are you just moving in the x?
                //     else if (this.xVelocity) {
                //         const offset = this.xVelocity > 0 ? PapaChad.SCALED_WIDTH : 0;
                //         const start = this.xVelocity > 0 ? entity.boundingBox.left : entity.boundingBox.right;
                //         this.x = start - offset;
                //         this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);
                //     }
                // }
            }
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