/**
 * Papa Chad is a mostly idle entity who must be able to walk for the tutorial.
 * Otherwise he stands still in his idle position and offers dialog options to Chad.
 */
class PapaChad {
    constructor(x, y, isLeft) {
        /** The x position of the Papa Chad (in the game world). */
        this.x = x;
        /** The y position of the Papa Chad (in the game world). */
        this.y = y;
        /** An associative array of the animations for this Papa Chad. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Papa Chad looking? */
        this.facing = isLeft ? "left" : "right";
        /** What is the Papa Chad doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox();
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
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
        return PapaChad.SCALE * 30;
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
        // Papa Chad is listening for user input to determine his movement.
        // This is a temporary thing, while we have an incomplete chad. I am using him to test the camera and worldbuilding.
        // TODO: remove this and update to how he should be.
        let xVelocity = 0;
        let yVelocity = 0;
        if (GAME.up) {
            yVelocity -= PapaChad.SPEED * PapaChad.SCALE;
            this.action = "walking";
        }
        if (GAME.down) {
            yVelocity += PapaChad.SPEED * PapaChad.SCALE;
            this.action = "walking";
        }
        if (GAME.left) {
            xVelocity -= PapaChad.SPEED * PapaChad.SCALE;
            this.facing = "left";
            this.action = "walking";
        }
        if (GAME.right) {
            xVelocity += PapaChad.SPEED * PapaChad.SCALE;
            this.facing = "right";
            this.action = "walking";
        }
        if (!(GAME.up || GAME.down || GAME.right || GAME.left)) {
            this.action = "idle";
        }
        // Trigonometry:
        if (xVelocity && yVelocity) {
            let xMult = xVelocity > 0 ? 1 : -1;
            let yMult = yVelocity > 0 ? 1 : -1;
            const perpSpeed = PapaChad.SPEED / Math.cos(Math.PI / 4);
            xVelocity = xMult * perpSpeed;
            yVelocity = yMult * perpSpeed;
        }
        // Actually adjust position
        this.x += xVelocity;
        this.y += yVelocity;
    };

    /** Draw Papa Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.x, this.y, PapaChad.SCALE);
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