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
            if (entity.boundingBox && entity.boundingBox.collide(this.boundingBox)) {
                // Is entity a block?
                if (entity instanceof Block) {
                    // Are we falling?
                    if (this.yVelocity > 0) {
                        if (this.lastBoundingBox.bottom < entity.boundingBox.top) {
                            this.yVelocity = 0;
                            this.y = entity.y - PapaChad.SCALED_HEIGHT - .01;
                        }
                    }
                }
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