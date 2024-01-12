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
        this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.WIDTH, PapaChad.HEIGHT);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;

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

    // /**
    //  * determine the direction that Papa Chad is traveling in
    //  */
    // findDirection() {
    //     if (this.x > this.lastBoundingBox.x) {
    //         this.facing = "right";
    //     } else if (this.x < this.lastBoundingBox.x) {
    //         this.facing = "left";
    //     } else if (this.y > this.lastBoundingBox.y) {
    //         this.facing = "down";
    //     } else if (this.y < this.lastBoundingBox.y) {
    //         this.facing = "up";
    //     }
    // } 
    // Nathan: I don't think facing is ever anything but left or right. used to tell which sprite to draw. - Devin

    
    /** Change what Papa Chad is doing and where it is. */
    update() {
        // determine the direction papaChad is traveling in
        // this.findDirection();

        // Update condition!

        this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick;
        this.yVelocity = Math.min(PHYSICS.TERMINAL_VELOCITY, this.yVelocity);
        
        // Update position!
        this.y += this.yVelocity;
        if (this.y > DIMENSION.MAX_Y) {
            this.y -= DIMENSION.MAX_Y;
        }
        
        // Papa Chad is listening for user input to determine his movement.
        // This is a temporary thing, while we have an incomplete chad. I am using him to test the camera and worldbuilding.
        // TODO: remove this and update to how he should be.
        let xVelocity = 0;
        let yVelocity = 0;
        // if (GAME.up) {
        //     yVelocity -= PapaChad.SPEED * PapaChad.SCALE;
        //     this.action = "walking";
        // }
        // if (GAME.down) {
        //     yVelocity += PapaChad.SPEED * PapaChad.SCALE;
        //     this.action = "walking";
        // }
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
        this.x += xVelocity * GAME.clockTick;
        this.y += yVelocity * GAME.clockTick;
        
        // Update Bounding Box!
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.x, this.y, PapaChad.SCALED_WIDTH, PapaChad.SCALED_HEIGHT);

        // Check for collisions!
        GAME.entities.forEach((entity) => {
            // Does entity have a bounding box? Do they even collide?
            if (entity.boundingBox && this.boundingBox.collide(entity.boundingBox)) {
                // Is the entity a block?
                if (entity instanceof Block) {
                    // Are we falling downward through a block?
                    if (yVelocity > 0
                        && this.boundingBox.bottom > entity.boundingBox.top) {
                        this.y = entity.boundingBox.top - PapaChad.SCALED_HEIGHT - .5;
                        this.yVelocity = 0;
                    }
                    // Are we jumping through the bottom of a block?
                    if (yVelocity < 0
                        && this.boundingBox.top < entity.boundingBox.bottom) {
                        this.y = entity.boundingBox.bottom;
                    }

                    // Are we walking right through the left of a block?
                    if (xVelocity > 0
                        && this.boundingBox.right > entity.boundingBox.left) {
                        this.x = entity.boundingBox.left - PapaChad.SCALED_WIDTH;
                    }

                    // Are we walking left through the right of a block?
                    if (xVelocity < 0
                        && this.boundingBox.left < entity.boundingBox.right) {
                        
                        this.x = entity.boundingBox.right - PapaChad.SCALED
                    }
                }

                
            }
        });
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