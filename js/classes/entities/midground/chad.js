/**
 * Chad is the main character controller by the player.
 * Chad has advanced movement and the ability to fight.
 * 
 * @author Devin Peevy
 * @author Caleb Krauter
 * @author Nathan Hinthorne
 * @author Trae Claar
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
        /** Checks if CHAD has dashed. */
        this.hasDashed = false;
        /** Checks if CHAD is dashing. */
        this.isDashing = false;
        /** Gets the the y position of CHAD from the last time he was on the ground. */
        this.prevYPosOnGround = 0;
        /** The position of the Chad (in the game world). */
        this.pos = pos;
        /** An associative array of the animations for this Chad. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Chad looking? */
        this.facing = "right";
        /** What is the Chad doing? */
        this.action = "idle";
        /** The velocity at which Chad is moving. */
        this.velocity = new Vector(0, 0);
        /** Name of character. */
        this.name = "Chad";
        /** The health of Chad. */
        this.health = Chad.MAX_HEALTH;
        /** Chad's base speed */
        this.speed = Chad.DEFAULT_SPEED;
        /** Chad's damage multiplier (applied on sword/slingshot hit) */
        this.damageMultiplier = 1;
        /** Chad's invincibility state. */
        this.isInvincible = false;
        /** Chad's strength state. */
        this.isStrong = false;
        /** Chad's speed state. */
        this.isFast = false;
        /** The size of Chad on the canvas */
        this.scaledSize = new Vector(Chad.DEFAULT_BOUNDING_BOX_SIZE.x * Chad.DEFAULT_SCALE.x, 
            Chad.DEFAULT_BOUNDING_BOX_SIZE.y * Chad.DEFAULT_SCALE.y);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        /** The force of Chad's first jump. */
        this.firstJumpVelocity = Chad.DEFAULT_FIRST_JUMP_VELOCITY;
        /** The force of Chad's second jump. */
        this.secondJumpVelocity = Chad.DEFAULT_SECOND_JUMP_VELOCITY;
        /** If Chad is currently jumping. */
        this.isJumping = false;
        /** The timer for the jump. Used to ensure the jump velocity is applied for a minimum amount of time. */
        this.firstJumpTimer = 0;
        /** Dashes are reset based off a timer  */
        this.canDash = true;
        /** The cooldown timer for the dash. */
        this.dashCooldownTimer = Chad.DASH_COOLDOWN;
        /** The timer for how long Chad has been dashing. */
        this.dashStopTimer = 0;
        /** If Chad has landed on the ground. Used to determine when Chad first hit the ground. */
        this.alreadyLanded = false;
        /** The scale of Chad on the canvas. A VECTOR */
        this.scale = Chad.DEFAULT_SCALE;
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = this.createBoundingBox();
    };

    /** The size, in pixels of the sprite ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(96, 64);
    }

    /** The size, in pixels of the boundingbox of Chad. */
    static get DEFAULT_BOUNDING_BOX_SIZE() {
        return new Vector(28, 49);
    }

    /** The default scale factor applied to Chad. */
    static get DEFAULT_SCALE() {
        return new Vector(2.2, 2.2);
    };

    /** The filepath to Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/CHAD1.png";
    };

    /** The mulitiplier that allows CHAD to run. */
    static get RUN_MULTIPLIER() {
        return 1.4;
    }
    /** How much faster Chad is while dashing than walking */
    static get DASH_MULTIPLIER() {
        return 3.5;
    }

    /** The barrier that limits the time of the longest dash. */
    static get DASH_TIME_LIMIT() {
        return 0.32;
    }

    /** The delay between dashes in seconds. */
    static get DASH_COOLDOWN() {
        return 1;
    }

    /** The maximum amount of health Chad can have. */
    static get MAX_HEALTH() {
        return 100;
    };

    /** Chad's default speed, in pixels/s. */
    static get DEFAULT_SPEED() {
        return Chad.DEFAULT_SCALE.x * 110;
    }

    /** Chad's default damage multiplier. */
    static get DEFAULT_DAMAGE_MULTIPLIER() {
        return 1;
    }

    /**
     * @returns {number} the force of Chad's first jump
     */
    static get DEFAULT_FIRST_JUMP_VELOCITY() {
        return Chad.DEFAULT_SCALE.y * 360;
    }

    /**
     * @returns {number} the force of Chad's second jump
    */
    static get DEFAULT_SECOND_JUMP_VELOCITY() {
        return Chad.DEFAULT_SCALE.y * 380;
    }

    /**
     * Update the scale of Chad along with his scaled size.
     * @param {Vector} newScale the new scale of Chad
     */
    set scale(newScale) {
        this._scale = newScale;

        // we need to update the scaled size of Chad when we change his scale
        // this is the reason we have a getter and setter for scale
        this.scaledSize = new Vector(Chad.SIZE.x * this._scale.x, Chad.SIZE.y * this._scale.y);

        // this.scaledSize = new Vector(Chad.BOUNDING_BOX_SIZE.x * this._scale.x, 
        //     Chad.BOUNDING_BOX_SIZE.y * this._scale.y);
    }

    /**
     * Get the scale of Chad.
     * @returns {Vector} the scale of Chad
     */
    get scale() {
        return this._scale;
    }

    /** 
     * Generate the bounding box for Chad based on his current position. 
     * 
     * @returns {BoundingBox} Chad's new bounding box
     */
    createBoundingBox() {
        const bbSize = new Vector(Chad.DEFAULT_BOUNDING_BOX_SIZE.x * this.scale.x, Chad.DEFAULT_BOUNDING_BOX_SIZE.y * this.scale.y);
        const bbPos = new Vector(this.pos.x + (this.scaledSize.x - bbSize.x) / 2, this.pos.y + (this.scaledSize.y - bbSize.y));
        return new BoundingBox(bbPos, bbSize);
    }

    /** 
     * Decrease the health of Chad by the provided amount and perform any necessary operations
     * based on the new health value.
     * 
     * @param {number} amount the amount by which to decrease Chad's health
     */
    takeDamage(amount) {
        if (this.health > 0) {
            if (this.isInvincible) {
                ASSET_MGR.playSFX(SFX.DING.path, SFX.DING.volume);
                return;
            }
    
            this.health -= amount;
            if (this.health <= 0) {
                // Chad should die here
                ASSET_MGR.playSFX(SFX.GAME_OVER.path, SFX.GAME_OVER.volume);
                //TODO rotate chad 90 degrees on his back?
                GAME.addEntity(new DeathScreen(), 1);
                this.animations[this.facing]["death"].elapsedTime = 0;
                this.action = "death";
            }
        }
    };

    /**
     * Increase the health of Chad by the provided amount
     * 
     * @param {number} amount the amount by which to increase Chad's health
     */
    restoreHealth(amount) {
        if (this.health + amount > Chad.MAX_HEALTH) {
            this.health = Chad.MAX_HEALTH;
        } else {
            this.health += amount;
        }
    }

    /**
     * Deals with movement in the x direction including walking, running and dashing.
     * 
     * @returns {number} the x velocity of Chad
     */
    manageXDirectionMovement() {
        let xVelocity = this.velocity.x;

        let dirSign = 0;

        if (GAME.user.movingLeft) {
            this.facing = "left";
            dirSign = -1;
        } else if (GAME.user.movingRight) {
            this.facing = "right";
            dirSign = 1;
        }


        // Run action
        if (GAME.user.running) {
            this.action = "running";
            xVelocity = dirSign * this.speed * Chad.RUN_MULTIPLIER;

            // if you're on the ground, running, AND moving, release dust particles
            if (this.isOnGround && (GAME.user.movingLeft || GAME.user.movingRight)) {
                GAME.addEntity(new ParticleEffect(
                    new Vector(this.pos.x + this.scaledSize.x / 2, this.pos.y + this.scaledSize.y - 10),
                    ParticleEffect.LITTLE_DUST));
            }
        } else {
            // Walk action
            this.action = "walking";
            xVelocity = dirSign * this.speed;
        }


        // Dash action

        // update dash conditions
        if (this.dashCooldownTimer > 0) {
            this.dashCooldownTimer = Math.max(this.dashCooldownTimer - GAME.clockTick, 0);
        }

        if (this.isDashing) {
            this.dashStopTimer += GAME.clockTick;
        }
        
        if (this.dashCooldownTimer <= 0 && this.dashStopTimer < Chad.DASH_TIME_LIMIT) {
            this.canDash = true;
        }

        // do the dash
        if (GAME.user.dashing && this.canDash) {
            if (!this.isDashing) {
                // we just started dashing
                this.isDashing = true;
            }

            // release wind particles every 0.05 seconds
            if (GAME.gameTime % 0.05 < 0.01) { // we use `< 0.01` instead of `== 0` to avoid floating point errors
                GAME.addEntity(new ParticleEffect(new Vector(this.pos.x + this.scaledSize.x/2, this.pos.y + this.scaledSize.y/2), 
                                        ParticleEffect.WIND));
            }

            this.action = "dashing";
            xVelocity = dirSign * this.speed * Chad.DASH_MULTIPLIER;

            if (this.dashStopTimer >= Chad.DASH_TIME_LIMIT) {
                // we just finished dashing
                this.canDash = false;
                this.hasDashed = true;
                this.isDashing = false;
                this.dashCooldownTimer = Chad.DASH_COOLDOWN;
                this.dashStopTimer = 0;
            }
        }
        // Prevents continuing a dash after lifting the dash key.
        if (!GAME.user.dashing && this.isDashing) {
            // we just finished dashing
            this.canDash = false;
            this.hasDashed = true;
            this.isDashing = false;
            this.dashCooldownTimer = Chad.DASH_COOLDOWN;
            this.dashStopTimer = 0;
        }

        return xVelocity;
    }

    /**
     * Deals with movement in the y direction including all types of jumping.
     * 
     * @returns {number} the y velocity of Chad
     */
    manageYDirectionMovement() {
        let yVelocity = this.velocity.y;

        if (this.isDashing && !this.isOnGround) {
            yVelocity = 0; // anti-gravity when dashing
        } else {
            yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick;
        }

        if (this.isOnGround && !this.alreadyLanded) {
            ASSET_MGR.playSFX(SFX.LAND.path, SFX.LAND.volume);
            // this.groundDashTimer = 0; // let the player dash immediately after landing

            // TODO add a landing animation?
            // TODO more things related to landing

            this.alreadyLanded = true;
        }

        if (!this.isOnGround) {
            this.alreadyLanded = false;
        }
        
        if (GAME.user.jumping && this.isOnGround) {
            yVelocity = -this.firstJumpVelocity;
            ASSET_MGR.playSFX(SFX.JUMP1.path, SFX.JUMP1.volume);
            this.action = "jumping";
            this.isJumping = true; // Set jumping state to true
            this.isOnGround = false;
            this.firstJumpTimer = 0.13;
        }
        
        // If the jump button is released early and the character is still moving upward, reduce the jump force
        if (!GAME.user.jumping && this.isJumping && yVelocity < 0) {
            this.firstJumpTimer -= GAME.clockTick; // Decrease the jump timer
            if (this.firstJumpTimer <= 0) { // If the jump timer has run out
                yVelocity /= 2;
            }
        }

        // The change in distance from the origin of Chad's second jump and his current height.
        let deltaHeight = Math.abs(this.pos.y - this.prevYPosOnGround);


        // This allows chad to jump if he is falling and has not jumped. 
        // Let's call it his recovery jump.
        if (!this.isOnGround && yVelocity >= 0) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }


        // Check that Chad has jumped high enough to jump again and allow a second jump if so.
        // Note that if chad has jumped and is falling he can jump at any point on the way down.
        if (!this.isOnGround && deltaHeight >= Math.abs(this.firstJumpVelocity / 5) + 32) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }

        // If Chad can double jump and user is trying to jump than do it!
        if (this.canDoubleJump && GAME.user.jumping && !this.isOnGround) {
            ASSET_MGR.playSFX(SFX.JUMP2.path, SFX.JUMP2.volume);
            GAME.addEntity(new ParticleEffect( 
            new Vector(this.pos.x + this.scaledSize.x/2, this.pos.y + this.scaledSize.y-10),
                ParticleEffect.CLOUD));
            this.action = "jumping";
            yVelocity = -this.secondJumpVelocity;
            this.canDoubleJump = false;
            this.hasDoubleJumped = true;
            this.isOnGround = false;
        }

        if (yVelocity > PHYSICS.TERMINAL_VELOCITY) {
            yVelocity = PHYSICS.TERMINAL_VELOCITY;
        }

        return yVelocity;
    }

    /** Change what Chad is doing and where it is. */
    update() {
        if (this.health <= 0) {
            return;
        }

        // Chad shouldn't be able to double jump by default.
        this.canDoubleJump = false;

        // Reset double jump and dash if Chad is on the ground.
        if (this.isOnGround) {
            this.hasDoubleJumped = false;
            this.hasDashed = false;
        }

        // Step 1: Listen for user input.
        const newXVelocity = this.manageXDirectionMovement();
        const newYVelocity = this.manageYDirectionMovement();
        this.velocity = new Vector(newXVelocity, newYVelocity);

        if (!(GAME.user.movingRight || GAME.user.movingLeft)) {
            this.action = "idle";
        }

        // Step 2: Face in the direction of a mouse click
        if (GAME.user.aiming || GAME.user.jabbing) {
            // determine if mouse is to the right or left of Chad
            // remember, the mouse is in screen coordinates, not world coordinates
            const mouseX = GAME.mousePos.x + CAMERA.pos.x;
            const chadCenterX = this.pos.x + this.scaledSize.x / 2;
            if (mouseX > chadCenterX) {
                this.facing = "right";
            } else {
                this.facing = "left";
            }
        }

        // if chad has invincibility, release gold particles every 0.05 seconds
        if (this.isInvincible && GAME.gameTime % 0.05 < 0.01) {
            GAME.addEntity(new ParticleEffect(
                new Vector(this.pos.x + this.scaledSize.x/2, this.pos.y + this.scaledSize.y/2),
                ParticleEffect.GOLD_SPARKLE)
            );
        }
        if (this.isStrong && GAME.gameTime % 0.05 < 0.01) {
            GAME.addEntity(new ParticleEffect(
                new Vector(this.pos.x + this.scaledSize.x/2, this.pos.y + this.scaledSize.y/2),
                ParticleEffect.RED_SPARKLE)
            );
        }
        if (this.isFast && GAME.gameTime % 0.05 < 0.01) {
            GAME.addEntity(new ParticleEffect(
                new Vector(this.pos.x + this.scaledSize.x/2, this.pos.y + this.scaledSize.y/2),
                ParticleEffect.GREEN_SPARKLE)
            );
        }


        if (GAME.user.jabbing) {
            this.action = "slicing";
            // GAME.user.aiming = false; // might want to disable aiming while jabbing, giving priority to jabbing
        }
        // if (GAME.user.aiming) {
        //     this.action = this.slingshot.getAction(); // leave it up to the slingshot to decide where chad is aiming
        // }
        if (this.isOnGround && !(GAME.user.movingRight || GAME.user.movingLeft)) {
            this.action = "idle";
            if (GAME.user.jabbing) {
                this.action = "slicingStill";
            }
        } else if (!(this.isOnGround) && GAME.user.jumping && !(GAME.user.dashing)) {
            this.action = "jumping"
        }


        // Step 2: Account for gravity, which is always going to push you downward.
        this.velocity.y += PHYSICS.GRAVITY_ACC * GAME.clockTick;



        // Step 4: Now move.
        this.pos = Vector.add(this.pos, Vector.multiply(this.velocity, GAME.clockTick));
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = this.createBoundingBox();

        this.isOnGround = false;

        // Step 5: Have we collided with anything?
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

                        const bbSize = new Vector(Chad.DEFAULT_BOUNDING_BOX_SIZE.x * this.scale.x, Chad.DEFAULT_BOUNDING_BOX_SIZE.y * this.scale.y);
                        const topGap = Math.abs(bbSize.y - this.scaledSize.y);
                        const bottomGap = 0;
                        const leftGap = Math.abs(bbSize.x - this.scaledSize.x)/2;
                        const rightGap = Math.abs(bbSize.x - this.scaledSize.x)/2;

                        if (isOverlapX
                            && this.lastBoundingBox.bottom <= entity.boundingBox.top
                            && this.boundingBox.bottom > entity.boundingBox.top) {
                            // We are colliding with the top.

                            this.pos = new Vector(this.pos.x, entity.boundingBox.top - this.scaledSize.y - bottomGap);

                            this.velocity = new Vector(this.velocity.x, 0);
                            this.isOnGround = true;
                            this.prevYPosOnGround = this.pos.y;
                        }
                        else if (isOverlapY
                            && this.lastBoundingBox.left >= entity.boundingBox.right
                            && this.boundingBox.left < entity.boundingBox.right) {
                            // We are colliding with the right side.

                            this.pos = new Vector(entity.boundingBox.right - leftGap, this.pos.y);
                        } 
                        else if (isOverlapY
                            && this.lastBoundingBox.right <= entity.boundingBox.left
                            && this.boundingBox.right > entity.boundingBox.left) {
                            // We are colliding with the left side.

                            this.pos = new Vector(entity.boundingBox.left - this.scaledSize.x + rightGap, this.pos.y);
                        } 
                        else if (isOverlapX
                            && this.lastBoundingBox.top >= entity.boundingBox.bottom
                            && this.boundingBox.top < entity.boundingBox.bottom) {
                            // We are colliding with the bottom.
                            this.pos = new Vector(this.pos.x, entity.boundingBox.bottom - topGap);
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
        this.boundingBox = this.createBoundingBox();
    };

    /** Draw Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), this.scale);

        //* draw scaled size in blue
        CTX.strokeStyle = "blue";
        const pos = Vector.worldToCanvasSpace(this.pos);
        CTX.strokeRect(pos.x, pos.y, this.scaledSize.x, this.scaledSize.y);

        //* draw bounding box in red
        CTX.strokeStyle = "red";
        const pos2 = Vector.worldToCanvasSpace(this.boundingBox.pos);
        CTX.strokeRect(pos2.x, pos2.y, this.boundingBox.size.x, this.boundingBox.size.y);
    };



    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["right"]["idle"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 0),
            Chad.SIZE,
            1, 1);
        this.animations["left"]["idle"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, Chad.SIZE.y),
            Chad.SIZE,
            1, 1);

        this.animations["right"]["walking"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 0),
            Chad.SIZE,
            31, 1 / 10);
        this.animations["left"]["walking"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(96, 64),
            Chad.SIZE,
            31, 1 / 10, true, true);
        this.animations["right"]["running"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 0),
            Chad.SIZE,
            31, 1 / 10);
        this.animations["left"]["running"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(96, 64),
            Chad.SIZE,
            31, 1 / 10, true, true);

        this.animations["right"]["dashing"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(32, 1600),
            Chad.SIZE,
            1, 1);
        this.animations["left"]["dashing"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(144, 1600),
            Chad.SIZE,
            1, 1);

        this.animations["right"]["jumping"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 1664),
            Chad.SIZE,
            1, 1);
        this.animations["left"]["jumping"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(96, 1664),
            Chad.SIZE,
            1, 1);
        this.animations["right"]["slicing"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 128),
            Chad.SIZE,
            32, 1 / 20);
        this.animations["left"]["slicing"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(
                0, 192),
            Chad.SIZE,
            32, 1 / 20, true, true);

        this.animations["right"]["slicingStill"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 1824),
            Chad.SIZE,
            8, 1 / 20);
        this.animations["left"]["slicingStill"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(
                0, 1888),
            Chad.SIZE,
            8, 1 / 20);

        this.animations["right"]["slingshotUp"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 448), //TODO adjust as necessary
            Chad.SIZE,
            1, 1);
        this.animations["left"]["slingshotUp"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 512), //TODO adjust as necessary
            Chad.SIZE,
            1, 1, true);
        this.animations["right"]["slingshotDown"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 576), //TODO adjust as necessary
            Chad.SIZE,
            1, 1);
        this.animations["left"]["slingshotDown"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 640), //TODO adjust as necessary
            Chad.SIZE,
            1, 1, true);
        this.animations["right"]["slingshotStraight"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 704), //TODO adjust as necessary
            Chad.SIZE,
            1, 1, true);
        this.animations["left"]["slingshotStraight"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 768), //TODO adjust as necessary
            Chad.SIZE,
            1, 1, true); 

        this.animations["right"]["death"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(432, 1664),
            Chad.SIZE,
            15, 1 / 10, false);
        this.animations["left"]["death"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(432, 1728),
            Chad.SIZE,
            15, 1 / 10, false, true);
    };
};
