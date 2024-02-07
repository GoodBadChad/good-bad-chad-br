/**
 * Chad is the main character controller by the player.
 * Chad has advanced movement and the ability to fight.
 * @author Devin, Caleb, Nathan, Trae
 */
class Chad {
    /**
     * @param {Vector} pos The position at which CHAD should spawn.
     */
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
        /** The position of the Chad (in the game world). */
        this.pos = pos;
        /** Gets the the x position of CHAD from the origin of where he started dashing. */
        this.xDashAnchoredOrigin = 0;
        /** An associative array of the animations for this Chad. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Chad looking? */
        this.facing = "right";
        /** What is the Chad doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox(this.pos, Chad.SCALED_SIZE);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        /** The velocity at which Chad is moving. */
        this.velocity = new Vector(0, 0);
        /** Name of character. */
        this.name = "dChad";
        /** The health of Chad. */
        this.health = Chad.MAX_HEALTH;
    };

    /** The size, in pixels of the sprite ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(29, 49);
    }

    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 2.4;
    };

    /** This will be the size of Chad ON THE CANVAS. */
    static get SCALED_SIZE() {
        return Vector.multiply(Chad.SIZE, Chad.SCALE);
    }

    static get SPEED() {
        return Chad.SCALE * 100;
    };

    /** The filepath to Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/parents.png";
    };

    /** The velocity of the first jump */
    static get FIRST_JUMP_VELOCITY() {
        return -400
    }
    /** The velocity of the double jump. */
    static get SECOND_JUMP_VELOCITY() {
        return -500;
    }

    /** The mulitiplier that allows CHAD to run. */
    static get SPRINT_SPEED() {
        return Chad.SPEED * 1.6;
    }
    /** The mulitiplier that allows CHAD to run. */
    static get DASH_SPEED() {
        return Chad.SPEED * 3.5;
    }

    /** The barrier that limits the length of the longest dash. */
    static get DASH_BARRIER() {
        return 250;
    }

    /** The maximum amount of health Chad can have. */
    static get MAX_HEALTH() {
        return 100;
    };

    /** 
     * Decrease the health of Chad by the provided amount and perform any necessary operations
     * based on the new health value.
     * 
     * @param {number} amount the amount by which to decrease Chad's health
     */
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            // Chad should die here
        }
    };

    /**
     * Deals with movement in the x direction including walking, running and dashing.
     * @author Caleb Krauter
     */
    manageXDirectionMovement() {
        const walkInDirection = (GAME.user.movingLeft) ? GAME.user.movingLeft : GAME.user.movingRight;
        const direction = (walkInDirection === GAME.user.movingLeft) ? "left" : "right";
        const toggleSign = this.facing === "left" ? -1 : 1;

        if (this.isOnGround) {
            this.hasDoubleJumped = false;
            this.canDash = true;
            this.hasDashed = false;
        }

        // Run action
        if (GAME.user.sprinting) {
            this.action = "running";
            this.facing = direction;
            this.velocity.x = toggleSign * Chad.SPRINT_SPEED;
        } else {
            // Walk action
            this.action = "walking";
            this.facing = direction;
            this.velocity.x = toggleSign * Chad.SPEED;
        }
        // Dash action
        // When not CHAD is not on the ground and his dash is allowed and the user is trying to dash then enter conditional.
        if (GAME.user.dashing && walkInDirection && !this.isOnGround && this.canDash && !this.hasDashed) {
            if (!this.isDashing) {
                this.xDashAnchoredOrigin = this.pos.x;
                this.isDashing = true
            }
            this.action = "dashing";
            this.velocity.x = toggleSign * Chad.DASH_SPEED;
            // Used to limit the distance of the dash.
            let deltaX = Math.abs(this.pos.x - this.xDashAnchoredOrigin);
            // Limit the delta in x that CHAD can dash. Set booleans as necessary to ensure
            // correct limitations on dash functionality, i.e. no double dashing, no infinite dash.
            if (deltaX >= Chad.DASH_BARRIER) {
                this.canDash = false;
                this.hasDashed = true;
                this.isDashing = false;
            } else {
                this.canDash = true;
                this.hasDashed = false;
                this.isDashing = true;
            }
        }
        // Prevents continuing a dash after lifting the dash key.
        if (!GAME.user.dashing && !this.isOnGround && this.isDashing) {
            this.canDash = false;
            this.hasDashed = true;
            this.isDashing = false;
        }
    }

    /**
     * Deals with movement in the y direction including all types of jumping.
     */
    manageYDirectionMovement() {
        // The change in distance from the origin of Chad's second jump and his current height.
        let deltaHeight = Math.abs(this.pos.y - this.prevYPosOnGround);

        // This allows chad to jump if he is falling and has not jumped. 
        // Let's call it his recovery jump.
        if (!this.isOnGround && this.velocity.y >= 0) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }
        // Perform single jump.
        if (this.isOnGround) {
            ASSET_MGR.playAudio(SFX.JUMP1.path, SFX.JUMP1.volume);
            this.action = "jumping";
            this.velocity.y = Chad.FIRST_JUMP_VELOCITY;
            this.hasDoubleJumped = false;
            this.isOnGround = false;
        }
        // Check that Chad has jumped high enough to jump again and allow a second jump if so.
        // Note that if chad has jumped and is falling he can jump at any point on the way down.
        if (!this.isOnGround && deltaHeight >= Math.abs(Chad.FIRST_JUMP_VELOCITY / 5) + 32) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }
        // If Chad can double jump and user is trying to jump than do it!
        if (this.canDoubleJump) {
            ASSET_MGR.playAudio(SFX.JUMP2.path, SFX.JUMP2.volume);
            this.action = "jumping";
            this.velocity.y = Chad.SECOND_JUMP_VELOCITY;
            this.canDoubleJump = false;
            this.hasDoubleJumped = true;
            this.isOnGround = false;
            if (!this.hasDashed) {
                this.canDash = true;
                this.hasDashed = false;
            }
        }
    }

    /** Change what Chad is doing and where it is. */
    update() {
        // Chad shouldn't be able to double jump by default.
        this.canDoubleJump = false;
        // Reset double jump if Chad is on the ground.
        // Check that CHAD is on the ground and reset his ability to dash.
        if (this.isOnGround) {
            this.hasDoubleJumped = false;
            this.canDash = true;
            this.hasDashed = false;
        }

        // Set the anchor point to measure the delta in dashing distance used to create a dash barrier
        // which to limit Chad's dash distance.
        if (!this.isOnGround && GAME.user.sprinting && this.canDash && !this.hasDashed) {
            Chad.xDashAnchoredOrigin = this.pos.x;
        }

        // Step 1: Listen for user input.
        // User intends to move Chad left or right in any way possible.
        if (GAME.user.movingLeft || GAME.user.movingRight) {
            this.manageXDirectionMovement();
        } else {
            this.velocity.x = 0;

        }
        // User intends to for Chad to jump in any way possible.
        if (GAME.user.jumping) {
            // Gets change in y from when CHAD left ground to current.
            this.manageYDirectionMovement()
        }

        // this is for the slingshot
        if (GAME.user.aiming) {
            // determine if mouse is to the right or left of Chad
            // remember, the mouse is in screen coordinates, not world coordinates
            const mouseX = GAME.mousePos.x + CAMERA.pos.x;
            if (mouseX > this.pos.x) {
                this.facing = "right";
            } else {
                this.facing = "left";
            }
        }
        if (!(GAME.user.movingRight || GAME.user.movingLeft)) {
            this.action = "idle";
        }

        // Step 2: Account for gravity, which is always going to push you downward.
        this.velocity.y += PHYSICS.GRAVITY_ACC * GAME.clockTick;

        this.velocity = new Vector(this.velocity.x, this.velocity.y);

        // Step 3: Now move.
        this.pos = Vector.add(this.pos, Vector.multiply(this.velocity, GAME.clockTick));
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.pos, Chad.SCALED_SIZE);
        this.isOnGround = false;

        // Step 4: Have we collided with anything?
        GAME.entities.midground.forEach((entity) => {
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
                            this.prevYPosOnGround = this.pos.y;
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
                    else if (entity instanceof Border) {
                        LAST_ZONE = ZONE;
                        ZONE = entity.target;
                        ZONE.load();
                    }
                    else if (entity.conversation) {
                        if (GAME.user.interacting) {
                            entity.conversation.initiateConversation();
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

    /** Draw Chad on the canvas. */
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

        this.animations["left"]["dashing"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(Chad.SIZE.x, 0),
            Chad.SIZE,
            6, 1 / 18);
        this.animations["right"]["dashing"] = new Animator(
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
