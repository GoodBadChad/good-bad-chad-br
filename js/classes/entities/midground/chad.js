/**
 * Papa Chad is a mostly idle entity who must be able to walk for the tutorial.
 * Otherwise he stands still in his idle position and offers dialog options to Chad.
 * 
 * @author Devin, Caleb, Nathan, Trae
 */
class Chad {
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
        this.boundingBox = new BoundingBox(this.pos, Chad.SCALED_SIZE);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        /** The velocity at which Chad is moving. */
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
        return Vector.multiply(Chad.SIZE, Chad.SCALE);
    }

    static get SPEED() {
        return Chad.SCALE * 100;
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

    /**
     * 
     * @param {String} direction left or right.
     * @param {Integer} xVelocity Chad's velocity in the x direction.
     * @param {GAME} walkInDirection GAME.left or GAME.right user actions.
     * @param {GAME} running GAME.leftShift, user intends for Chad to run.
     * @param {GAME} dashingInEitherDirection GAME.keyX, user intends to dash mid-air.
     * @param {Integer} toggleSign either a 1 or -1 to change the velocity direction.
     * @returns xVelocity so that Chad's velocity can be updated.
     */
    manageAdvancedMovement(direction, xVelocity, walkInDirection, running, dashingInEitherDirection, toggleSign) {
        // Walk action
        this.action = "walking";
        this.facing = direction;
        xVelocity += toggleSign * Chad.SPEED;

        // Run action
        if (running) {
            this.action = "running";
            this.facing = direction;
            xVelocity += toggleSign * Chad.SPEED * this.SPRINT_MULTIPLIER;
        }
        // Dash action
        // When not CHAD is not on the ground and his dash is allowed and the user is trying to dash then enter conditional.
        if (dashingInEitherDirection && walkInDirection && !this.isOnGround && this.canDash && !this.hasDashed) {
            if (!this.isDashing) {
                this.xDashAnchoredOrigin = this.pos.x;
                this.isDashing = true
            }
            this.action = "dash";
            xVelocity += toggleSign * Chad.SPEED * this.DASH_MULTIPLIER;
            // Used to limit the distance of the dash.
            let deltaX = Math.abs(this.pos.x - this.xDashAnchoredOrigin);
            // Limit the delta in x that CHAD can dash. Set booleans as necessary to ensure
            // correct limitations on dash functionality, i.e. no double dashing, no infinite dash.
            if (deltaX >= this.DASH_BARRIER) {
                this.canDash = false;
                this.hasDashed = true;
                this.isDashing = false;
            } else {
                this.canDash = true;
                this.hasDashed = false;
                this.isDashing = true;
            }
        }
        return xVelocity;
    }



    /** Change what Papa Chad is doing and where it is. */
    update() {
        this.canDoubleJump = false;
        if (this.isOnGround) {
            this.hasDoubleJumped = false;
        }

        // Check that CHAD is on the ground and reset his ability to dash.
        if (this.isOnGround) {
            this.canDash = true;
            this.hasDashed = false;
        }

        if (!this.isOnGround && GAME.keyX && this.canDash && !this.hasDashed) {
            Chad.xDashAnchoredOrigin = CHAD.pos.x;

        }

        let xVelocity = 0;
        let yVelocity = this.velocity.y;
        // Step 1: Listen for user input.
        if (GAME.left) {
            xVelocity = this.manageAdvancedMovement("left", xVelocity, GAME.left, GAME.shiftLeft, GAME.keyX, -1);
        }
        if (GAME.right) {
            xVelocity = this.manageAdvancedMovement("right", xVelocity, GAME.right, GAME.shiftLeft, GAME.keyX, 1);

            // this.action = "walking";
            // this.facing = "right";

            // xVelocity += Chad.SPEED;
            // if (GAME.shiftLeft) {
            //     this.action = "running";
            //     this.facing = "right";
            //     xVelocity += Chad.SPEED * this.SPRINT_MULTIPLIER;
            // }
            // if (GAME.keyX && GAME.right && !this.isOnGround && this.canDash && !this.hasDashed) {
            //     if (!this.isDashing) {
            //         this.xDashAnchoredOrigin = CHAD.pos.x;
            //         this.isDashing = true
            //     }
            //     this.action = "dash";
            //     xVelocity += Chad.SPEED * this.DASH_MULTIPLIER;
            //     let deltaX = Math.abs(CHAD.pos.x - this.xDashAnchoredOrigin);
            //     if (deltaX >= this.DASH_BARRIER) {
            //         console.log
            //         this.canDash = false;
            //         this.hasDashed = true;
            //         this.isDashing = false;
            //     } else {
            //         this.canDash = true;
            //         this.hasDashed = false;
            //         this.isDashing = true;
            //     }
            // }

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
        this.boundingBox = new BoundingBox(this.pos, Chad.SCALED_SIZE);
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

                            this.pos = new Vector(this.pos.x, entity.boundingBox.top - Chad.SCALED_SIZE.y);
                            this.velocity = new Vector(this.velocity.x, 0);
                            // ON_GROUND(true);
                            this.isOnGround = true;
                            this.prevYPosOnGround = CHAD.pos.y;
                        } else if (isOverlapY
                            && this.lastBoundingBox.right <= entity.boundingBox.left
                            && this.boundingBox.right > entity.boundingBox.left) {
                            // We are colliding with the left side.

                            this.pos = new Vector(entity.boundingBox.left - Chad.SCALED_SIZE.x, this.pos.y);
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
                    }
                }
                // There's no collision - don't do anything!
            }
            // There's no bounding box, so who gives a shrek?
        });

        // Step 5: Now that your position is actually figured out, draw your correct bounding box.
        this.boundingBox = new BoundingBox(this.pos, Chad.SCALED_SIZE);
    };

    /** Draw Papa Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), Chad.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 0),
            Chad.SIZE,
            1, 1);
        this.animations["right"]["idle"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, Chad.SIZE.y),
            Chad.SIZE,
            1, 1);

        this.animations["left"]["walking"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(Chad.SIZE.x, 0),
            Chad.SIZE,
            6, 1 / 12);
        this.animations["right"]["walking"] = new Animator(
            Chad.SPRITESHEET,
            Chad.SIZE,
            Chad.SIZE,
            6, 1 / 12);

        this.animations["left"]["running"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(Chad.SIZE.x, 0),
            Chad.SIZE,
            6, 1 / 18);
        this.animations["right"]["running"] = new Animator(
            Chad.SPRITESHEET,
            Chad.SIZE,
            Chad.SIZE,
            6, 1 / 18);

        this.animations["left"]["dash"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(Chad.SIZE.x, 0),
            Chad.SIZE,
            6, 1 / 18);
        this.animations["right"]["dash"] = new Animator(
            Chad.SPRITESHEET,
            Chad.SIZE,
            Chad.SIZE,
            6, 1 / 18);

        this.animations["left"]["jumping"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 0),
            Chad.SIZE,
            1, 1);
        this.animations["right"]["jumping"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, Chad.SIZE.y),
            Chad.SIZE,
            1, 1);

    };
};
