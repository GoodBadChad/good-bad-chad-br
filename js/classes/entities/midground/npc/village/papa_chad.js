/**
 * Papa Chad is a mostly idle entity who must be able to walk for the tutorial.
 * Otherwise he stands still in his idle position and offers dialog options to Chad.
 * 
 * @author Devin, Caleb, Nathan, Trae
 */
class PapaChad {
    constructor(pos) {
        /** Checks if CHAD has collided with the ground. */
        this.isOnGround = false;
        /** Checks if CHAD can double jump. */
        this.canDoubleJump = false;
        /** Checks if CHAD has double jumped. */
        this.hasDoubleJumped = false;
        /** Checks if CHAD can dash. */
        this.canDash = false;
        /** Checks if CHAD has dashed. */
        this.hasDashed = false;
        /** Checks if CHAD is dashing. */
        this.isDashing = false;
        /** Gets the the y position of CHAD from the last time he was on the ground. */
        this.prevYPosOnGround = 0;
        /** The position of the Papa Chad (in the game world). */
        this.pos = pos;
        /** Gets the the x position of CHAD from the origin of where he started dashing. */
        this.xDashAnchoredOrigin = 0;
        /** An associative array of the animations for this Papa Chad. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Papa Chad looking? */
        this.facing = "right";
        /** What is the Papa Chad doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox(this.pos, PapaChad.SCALED_SIZE);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        /** The velocity at which PapaChad is moving. */
        this.velocity = new Vector(0, 0);
        /** Name of character. */
        this.name = "Papa Chad";
    };

    /** The size, in pixels of the sprite ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(29, 49);
    }

    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 3;
    };

    /** This will be the size of Papa Chad ON THE CANVAS. */
    static get SCALED_SIZE() {
        return Vector.multiply(PapaChad.SIZE, PapaChad.SCALE);
    }

    static get SPEED() {
        return PapaChad.SCALE * 100;
    };

    /** The filepath to Papa Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/parents.png";
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
    /** The mulitiplier that allows CHAD to run. */
    get DASH_MULTIPLIER() {
        return 3.5;
    }

    /** The barrier that limits the length of the longest dash. */
    get DASH_BARRIER() {
        return 250;
    }

    /** Change what Papa Chad is doing and where it is. */
    update() {
        this.canDoubleJump = false;
        if (this.isOnGround) {
            this.hasDoubleJumped = false;
        }
        // NOTE: this entire method will be moved to Chad as soon as we have his spritesheet ready.

        // Step 1: Listen for user input.
        if (this.isOnGround) {
            this.canDash = true;
            this.hasDashed = false;
        }

        if (!this.isOnGround && GAME.keyX && this.canDash && !this.hasDashed) {
            PapaChad.xDashAnchoredOrigin = CHAD.pos.x;

        }

        let xVelocity = 0;
        let yVelocity = this.velocity.y;
        if (GAME.left) {
            this.action = "walking";
            this.facing = "left";
            xVelocity -= PapaChad.SPEED;
            if (GAME.shiftLeft) {
                this.action = "running";
                this.facing = "left";
                xVelocity -= PapaChad.SPEED * this.SPRINT_MULTIPLIER;
            }
            if (GAME.keyX && GAME.left && !this.isOnGround && this.canDash && !this.hasDashed) {
                console.log("Should be dashing");
                if (!this.isDashing) {
                    this.xDashAnchoredOrigin = CHAD.pos.x;
                    this.isDashing = true
                }
                this.action = "dash";
                xVelocity -= PapaChad.SPEED * this.DASH_MULTIPLIER;
                let deltaX = Math.abs(CHAD.pos.x - this.xDashAnchoredOrigin);
                console.log("last x " + this.xDashAnchoredOrigin);
                if (deltaX >= this.DASH_BARRIER) {
                    console.log
                    this.canDash = false;
                    this.hasDashed = true;
                    this.isDashing = false;
                } else {
                    this.canDash = true;
                    this.hasDashed = false;
                    this.isDashing = true;


                }

            }
        }
        if (GAME.right) {
            this.action = "walking";
            this.facing = "right";

            xVelocity += PapaChad.SPEED;
            if (GAME.shiftLeft) {
                this.action = "running";
                this.facing = "right";
                xVelocity += PapaChad.SPEED * this.SPRINT_MULTIPLIER;
            }
            if (GAME.keyX && GAME.right && !this.isOnGround && this.canDash && !this.hasDashed) {
                if (!this.isDashing) {
                    this.xDashAnchoredOrigin = CHAD.pos.x;
                    this.isDashing = true
                }
                this.action = "dash";
                xVelocity += PapaChad.SPEED * this.DASH_MULTIPLIER;
                let deltaX = Math.abs(CHAD.pos.x - this.xDashAnchoredOrigin);
                if (deltaX >= this.DASH_BARRIER) {
                    console.log
                    this.canDash = false;
                    this.hasDashed = true;
                    this.isDashing = false;
                } else {
                    this.canDash = true;
                    this.hasDashed = false;
                    this.isDashing = true;
                }
            }

        }
        // Prevents continuing a dash after lifting the dash key.
        if (!GAME.keyX && !this.isOnGround && this.isDashing) {
            this.canDash = false;
            this.hasDashed = true;
            this.isDashing = false;
        }
        if (GAME.space && this.isOnGround) {
            ASSET_MGR.playAudio("./sfx/temp_jump.wav", 0.2);
            this.action = "jumping";
            yVelocity = this.FIRST_JUMP_VELOCITY;
            this.isOnGround = false;
            this.hasDoubleJumped = false;
        }
        // Gets change in y from when CHAD left ground to current.
        let deltaHeight = Math.abs(CHAD.pos.y - this.prevYPosOnGround);

        if (!this.isOnGround && deltaHeight >= Math.abs(this.FIRST_JUMP_VELOCITY / 5) + 32) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }

        if (!this.isOnGround && yVelocity >= 0) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }
        if (GAME.space && this.canDoubleJump) {
            ASSET_MGR.playAudio("./sfx/temp_jump.wav", 0.2);
            this.action = "jumping";
            yVelocity = this.SECOND_JUMP_VELOCITY;
            this.isOnGround = false;
            this.canDoubleJump = false;
            this.hasDoubleJumped = true;
        }

        // this is for the slingshot
        if (GAME.mouseDown) {
            // determine if mouse is to the right or left of Chad
            // remember, the mouse is in screen coordinates, not world coordinates
            const mouseX = GAME.mousePos.x + CAMERA.pos.x;
            if (mouseX > this.pos.x) {
                this.facing = "right";
            } else {
                this.facing = "left";
            }
        }
        if (!(GAME.right || GAME.left)) {
            this.action = "idle";
        }


        // Step 2: Account for gravity, which is always going to push you downward.
        yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick;

        this.velocity = new Vector(xVelocity, yVelocity);

        // Step 3: Now move.
        this.pos = Vector.add(this.pos, Vector.multiply(this.velocity, GAME.clockTick));
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.pos, PapaChad.SCALED_SIZE);
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

                            this.pos = new Vector(this.pos.x, entity.boundingBox.top - PapaChad.SCALED_SIZE.y);
                            this.velocity = new Vector(this.velocity.x, 0);
                            // ON_GROUND(true);
                            this.isOnGround = true;
                            this.prevYPosOnGround = CHAD.pos.y;
                        } else if (isOverlapY
                            && this.lastBoundingBox.right <= entity.boundingBox.left
                            && this.boundingBox.right > entity.boundingBox.left) {
                            // We are colliding with the left side.

                            this.pos = new Vector(entity.boundingBox.left - PapaChad.SCALED_SIZE.x, this.pos.y);
                        } else if (isOverlapY
                            && this.lastBoundingBox.left >= entity.boundingBox.right
                            && this.boundingBox.left < entity.boundingBox.right) {
                            // We are colliding with the right side.

                            this.pos = new Vector(entity.boundingBox.right, this.pos.y);
                        } else if (isOverlapX
                            && this.lastBoundingBox.top >= entity.boundingBox.bottom
                            && this.boundingBox.top < entity.boundingBox.bottom) {
                            // We are colliding with the bottom.
                            this.pos = new Vector(this.pos.x, entity.boundingBox.bottom);
                        }
                    } else if (entity instanceof Border) {
                        // You are traveling to a new Zone!
                        LAST_ZONE = ZONE; // Helps you know where to spawn!
                        ZONE = entity.target; // Set ZONE to the zone we're going to.
                        ZONE.load(); // Load that zone. handles everything for us.
                    }
                }
                // There's no collision - don't do anything!
            }
            // There's no bounding box, so who gives a shrek?
        });

        // Step 5: Now that your position is actually figured out, draw your correct bounding box.
        this.boundingBox = new BoundingBox(this.pos, PapaChad.SCALED_SIZE);
    };

    /** Draw Papa Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), PapaChad.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(0, 0),
            PapaChad.SIZE,
            1, 1);
        this.animations["right"]["idle"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(0, PapaChad.SIZE.y),
            PapaChad.SIZE,
            1, 1);

        this.animations["left"]["walking"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(PapaChad.SIZE.x, 0),
            PapaChad.SIZE,
            6, 1 / 12);
        this.animations["right"]["walking"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.SIZE,
            PapaChad.SIZE,
            6, 1 / 12);

        this.animations["left"]["running"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(PapaChad.SIZE.x, 0),
            PapaChad.SIZE,
            6, 1 / 18);
        this.animations["right"]["running"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.SIZE,
            PapaChad.SIZE,
            6, 1 / 18);

        this.animations["left"]["dash"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(PapaChad.SIZE.x, 0),
            PapaChad.SIZE,
            6, 1 / 18);
        this.animations["right"]["dash"] = new Animator(
            PapaChad.SPRITESHEET,
            PapaChad.SIZE,
            PapaChad.SIZE,
            6, 1 / 18);

        this.animations["left"]["jumping"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(0, 0),
            PapaChad.SIZE,
            1, 1);
        this.animations["right"]["jumping"] = new Animator(
            PapaChad.SPRITESHEET,
            new Vector(0, PapaChad.SIZE.y),
            PapaChad.SIZE,
            1, 1);

    };
};
