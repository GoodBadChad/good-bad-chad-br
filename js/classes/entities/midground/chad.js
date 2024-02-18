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
        // this.boundingBox = new BoundingBox(this.pos, Chad.SCALED_SIZE);
        this.boundingBox = new BoundingBox(Vector.add(this.pos, Vector.multiply(new Vector(32, 16), Chad.SCALE)), Chad.SCALED_SIZE);


        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
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
        /** The scale of Chad on the canvas. A VECTOR */
        this.scale = Chad.DEFAULT_SCALE;
        /** The size of Chad on the canvas */
        this.scaledSize = new Vector(Chad.SIZE.x * Chad.DEFAULT_SCALE.x, Chad.SIZE.y * Chad.DEFAULT_SCALE.y);
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox(this.pos, this.scaledSize);
        /** The force of Chad's first jump. */
        this.firstJumpForce = Chad.DEFAULT_FIRST_JUMP_FORCE;
        /** The force of Chad's second jump. */
        this.secondJumpForce = Chad.DEFAULT_SECOND_JUMP_FORCE;

        this.isJumping = false;
        /** The timer for the jump. Used to ensure the jump force is applied for a minimum amount of time. */
        this.firstJumpTimer = 0;

    };

    /** The size, in pixels of the sprite ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(96, 64);
    }

    /** The size, in pixels of the boundingbox of Chad. */
    static get BOUNDING_BOX_SIZE() {
        return new Vector(32, 64);
    }
    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 2.4;
    };

    /** The offset applied to the bounding box's position from Chad's position. */
    static get BOUNDING_BOX_OFFSET() {
        return Vector.multiply(new Vector(44, 16), Chad.SCALE);
    }

    /** This will be the size of Chad ON THE CANVAS. */
    static get SCALED_SIZE() {
        return Vector.multiply(Chad.BOUNDING_BOX_SIZE, Chad.SCALE);
    }

    /** Chad's speed in pixels per second. */
    static get SPEED() {
        return Chad.SCALE * 115;
    }
    static get DEFAULT_SCALE() {
        return new Vector(3, 3);

    };

    /** The filepath to Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/CHAD1.png";
    };

    /** The mulitiplier that allows CHAD to run. */
    static get SPRINT_SPEED() {
        return Chad.SPEED * 1.8;
    }
    /** The mulitiplier that allows CHAD to run. */
    static get DASH_SPEED() {
        return Chad.SPEED * 3;
    }
    /** The mulitiplier that allows CHAD to run. */
    static get RUN_MULTIPLIER() {
        return 1.4;
    }
    /** The mulitiplier that allows CHAD to run. */
    static get DASH_MULTIPLIER() {
        return 3.5;
    }

    /** The barrier that limits the length of the longest dash. */
    static get DASH_BARRIER() {
        return 250;
    }

    /** The maximum amount of health Chad can have. */
    static get MAX_HEALTH() {
        return 100;
    };

    /** Generate the bounding box for Chad based on his current position. */
    createBoundingBox() {
        return new BoundingBox(Vector.add(this.pos, Chad.BOUNDING_BOX_OFFSET), Chad.SCALED_SIZE);
    }
    static get DEFAULT_SPEED() {
        return Chad.DEFAULT_SCALE.x * 110;
    }

    static get DEFAULT_DAMAGE_MULTIPLIER() {
        return 1;
    }

    static get DEFAULT_FIRST_JUMP_FORCE() {
        return 800;
    }

    static get DEFAULT_SECOND_JUMP_FORCE() {
        return 900;
    }

    /** 
     * Decrease the health of Chad by the provided amount and perform any necessary operations
     * based on the new health value.
     * 
     * @param {number} amount the amount by which to decrease Chad's health
     */
    takeDamage(amount) {
        if (this.isInvincible) {
            // playAudio(SFX.DING.path, SFX.DING.volume);
            return;
        }

        this.health -= amount;
        if (this.health <= 0) {
            // Chad should die here
            ASSET_MGR.playAudio(SFX.GAME_OVER.path, SFX.GAME_OVER.volume);
            //TODO rotate chad 90 degrees on his back?
        }
    };

    /**
     * Increase the health of Chad by the provided amount
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
     * @author Caleb Krauter
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

        if (this.isOnGround) {
            this.hasDoubleJumped = false;
        }

        // Run action
        if (GAME.user.running) {
            this.action = "running";
            xVelocity = dirSign * this.speed * Chad.RUN_MULTIPLIER;


            // if you're on the ground, running, AND moving, release dust particles
            if (this.isOnGround && (GAME.user.movingLeft || GAME.user.movingRight)) {
                GAME.addEntity(new ParticleEffect(new Vector(this.pos.x + this.scaledSize.x / 2, this.pos.y + this.scaledSize.y - 10),
                    ParticleEffect.DUST));
            }
        } else {
            // Walk action
            this.action = "walking";
            xVelocity = dirSign * this.speed;
        }


        // Dash action
        if (GAME.user.dashing && !this.isOnGround && this.canDash) {
            if (!this.isDashing) {
                this.xDashAnchoredOrigin = this.pos.x;
                this.isDashing = true
                ASSET_MGR.playAudio(SFX.SWOOSH.path, SFX.SWOOSH.volume);

            }

            // release wind particles every 0.05 seconds
            if (GAME.gameTime % 0.05 < 0.01) {
                GAME.addEntity(new ParticleEffect(new Vector(this.pos.x + this.scaledSize.x / 2, this.pos.y + this.scaledSize.y / 2),
                    ParticleEffect.WIND));
            }

            this.action = "dashing";
            xVelocity = dirSign * this.speed * Chad.DASH_MULTIPLIER;
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
        if (!GAME.user.dashing && this.isDashing) {
            this.canDash = false;
            this.hasDashed = true;
            this.isDashing = false;
        }

        return xVelocity;
    }

    /**
     * Deals with movement in the y direction including all types of jumping.
     */
    manageYDirectionMovement() {
        let yVelocity = this.velocity.y;
        if (!this.isDashing && GAME.user.jumping) {
            this.action = "jumping";

        }
        if (this.isDashing) {
            yVelocity = 0;
        } else {
            yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick;
        }

        // If the character is on the ground or within the coyote time window
        if (GAME.user.jumping && this.isOnGround) {
            yVelocity = -this.firstJumpForce;
            ASSET_MGR.playAudio(SFX.JUMP1.path, SFX.JUMP1.volume);
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
        // Perform single jump.
        //         if (this.isOnGround) {
        //             ASSET_MGR.playAudio(SFX.JUMP1.path, SFX.JUMP1.volume);
        //             this.velocity.y = Chad.FIRST_JUMP_VELOCITY;
        //             this.hasDoubleJumped = false;
        //             this.isOnGround = false;
        //         }


        // Check that Chad has jumped high enough to jump again and allow a second jump if so.
        // Note that if chad has jumped and is falling he can jump at any point on the way down.
        if (!this.isOnGround && deltaHeight >= Math.abs(this.firstJumpForce / 5) + 32) {
            if (this.hasDoubleJumped) {
                this.canDoubleJump = false;
            } else {
                this.canDoubleJump = true;
            }
        }

        // If Chad can double jump and user is trying to jump than do it!
        if (this.canDoubleJump && GAME.user.jumping && !this.isOnGround) {
            ASSET_MGR.playAudio(SFX.JUMP2.path, SFX.JUMP2.volume);
            //             this.velocity.y = Chad.SECOND_JUMP_VELOCITY;

            GAME.addEntity(new ParticleEffect(new Vector(CHAD.pos.x + this.scaledSize.x / 2, CHAD.pos.y + this.scaledSize.y - 10),
                ParticleEffect.CLOUD));
            this.action = "jumping";
            yVelocity = -this.secondJumpForce;

            this.canDoubleJump = false;
            this.hasDoubleJumped = true;
            this.isOnGround = false;
            if (!this.hasDashed) {
                this.canDash = true;
                this.hasDashed = false;
            }
        }

        if (yVelocity > PHYSICS.TERMINAL_VELOCITY) {
            yVelocity = PHYSICS.TERMINAL_VELOCITY;
        }

        return yVelocity;
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
        if (!this.isOnGround && GAME.user.running && this.canDash && !this.hasDashed) {
            Chad.xDashAnchoredOrigin = this.pos.x;
        }

        // Step 1: Listen for user input.
        const newXVelocity = this.manageXDirectionMovement();
        const newYVelocity = this.manageYDirectionMovement();
        this.velocity = new Vector(newXVelocity, newYVelocity);

        if (!(GAME.user.movingRight || GAME.user.movingLeft)) {
            this.action = "idle";
        }
        // User intends to for Chad to jump in any way possible.
        //         if (GAME.user.jumping) {
        //             if (!this.isDashing) {
        //                 this.action = "jumping";

        //             }
        //             // Gets change in y from when CHAD left ground to current.
        //             this.manageYDirectionMovement()
        //         }

        // this is for the slingshot
        //         if (GAME.user.aiming) {

        // TODO - decide whether this is necessary or not. Make it so that Chad moves in the correct direction
        // when doing this.
        // Step 2: Face in the direction of a mouse click
        if (GAME.user.aiming || GAME.user.jabbing) {
            // determine if mouse is to the right or left of Chad
            // remember, the mouse is in screen coordinates, not world coordinates
            const mouseX = GAME.mousePos.x + CAMERA.pos.x;
            if (mouseX > this.pos.x) {
                this.facing = "right";
            } else {
                this.facing = "left";
            }
        }


        if (GAME.user.jabbing) {
            this.action = "slicing";
        }
        if (this.isOnGround && !(GAME.user.movingRight || GAME.user.movingLeft)) {
            this.action = "idle";
            if (GAME.user.jabbing) {
                this.action = "slicingStill";
            }
            // Uncomment to see chad's death animation.
            // if (true) {
            //     this.action = "death";

            // }
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

                        if (isOverlapX
                            && this.lastBoundingBox.bottom <= entity.boundingBox.top
                            && this.boundingBox.bottom > entity.boundingBox.top) {
                            // We are colliding with the top.

                            this.pos = new Vector(this.pos.x, entity.boundingBox.top - Chad.SCALED_SIZE.y - Chad.BOUNDING_BOX_OFFSET.y);//Chad.SCALED_SIZE.y - Chad.BOUNDING_BOX_OFFSET.y);

                            this.velocity = new Vector(this.velocity.x, 0);
                            this.isOnGround = true;
                            this.prevYPosOnGround = this.pos.y;
                        } else if (isOverlapY
                            && this.lastBoundingBox.right <= entity.boundingBox.left
                            && this.boundingBox.right > entity.boundingBox.left) {
                            // We are colliding with the left side.

                            this.pos = new Vector(entity.boundingBox.left - Chad.SCALED_SIZE.x - Chad.BOUNDING_BOX_OFFSET.x, this.pos.y);

                        } else if (isOverlapY
                            && this.lastBoundingBox.left >= entity.boundingBox.right
                            && this.boundingBox.left < entity.boundingBox.right) {
                            // We are colliding with the right side.

                            this.pos = new Vector(entity.boundingBox.right - Chad.BOUNDING_BOX_OFFSET.x, this.pos.y);
                        } else if (isOverlapX
                            && this.lastBoundingBox.top >= entity.boundingBox.bottom
                            && this.boundingBox.top < entity.boundingBox.bottom) {
                            // We are colliding with the bottom.
                            this.pos = new Vector(this.pos.x, entity.boundingBox.bottom - Chad.BOUNDING_BOX_OFFSET.y);
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


        // Step 6: Now that your position is actually figured out, draw your correct bounding box.
        //         this.boundingBox = new BoundingBox(this.pos, this.scaledSize);


        // Step 7: Has Chad eaten any food?
        // -Consider moving the effects of food into an effect() method in the FoodItem class. 
        //      -This would allow for easier management of food effects
        //      -This would result in tighter coupling between Chad and FoodItem
        /*if (GAME.user.eatFood) {                                                  //! uncomment when HUD food-picker is implemented
            const foodType = INVENTORY.useCurrentFood();

            if (foodType === "Empty") { // no food to eat
                return;
            }

            switch (foodType) {
                case FoodItem.BACON:
                    // give chad invincibility for 10 seconds
                    // grow chad total size by 1.5x 
                    this.isInvincible = true;
                    this.scale = new Vector(Chad.DEFAULT_SCALE.x * 1.2, Chad.DEFAULT_SCALE.y * 1.2);
                    this.scaledSize = new Vector(Chad.SIZE.x * this.scale.x, Chad.SIZE.y * this.scale.y); // update scaled size accordingly
                    this.pos = new Vector(this.pos.x, this.pos.y - 10);
                    setTimeout(() => {
                        this.isInvincible = false;
                        this.scale = Chad.DEFAULT_SCALE;
                        this.scaledSize = new Vector(Chad.SIZE.x * this.scale.x, Chad.SIZE.y * this.scale.y); // update scaled size accordingly
                    }, 10000);
                    console.log("*munch munch* Bacon");
                    break;

                case FoodItem.BURGER:
                    // give chad extra attack power for 20 seconds
                    // grow chad's width by 1.5x
                    this.damageMultiplier = 2;
                    this.speed /= 1.3;
                    this.scale = new Vector(Chad.DEFAULT_SCALE.x * 1.5, Chad.DEFAULT_SCALE.y);
                    this.scaledSize = new Vector(Chad.SIZE.x * this.scale.x, Chad.SIZE.y * this.scale.y); // update scaled size accordingly
                    setTimeout(() => {
                        this.damageMultiplier = Chad.DEFAULT_DAMAGE_MULTIPLIER;
                        this.speed = Chad.DEFAULT_SPEED;
                        this.scale = Chad.DEFAULT_SCALE;
                        this.scaledSize = new Vector(Chad.SIZE.x * this.scale.x, Chad.SIZE.y * this.scale.y); // update scaled size accordingly
                    }, 20000);
                    console.log("*munch munch* Burger");
                    break;

                case FoodItem.ENERGY_DRINK:
                    // give chad extra speed and jump height for 30 seconds
                    this.speed = Chad.DEFAULT_SPEED * 1.5;
                    this.firstJumpForce = Chad.DEFAULT_FIRST_JUMP_FORCE * 1.2;
                    this.secondJumpForce = Chad.DEFAULT_SECOND_JUMP_FORCE * 1.2;
                    setTimeout(() => {
                        this.speed = Chad.DEFAULT_SPEED;
                        this.firstJumpForce = 650;
                        this.secondJumpForce = 700;
                    }, 30000);
                    console.log("*glug glug* Energy Drink");
                    break;

                case FoodItem.CHICKEN:
                    // restore 20 HP
                    this.restoreHealth(20);
                    console.log("*munch munch* Chicken Leg");
                    break;

                case FoodItem.STEAK:
                    // restore 40 HP
                    this.restoreHealth(40);
                    console.log("*munch munch* Steak");
                    break;

                case FoodItem.HAM:
                    // restore 60 HP
                    this.restoreHealth(60);
                    console.log("*munch munch* Ham");
                    break;

                case FoodItem.BEEF:
                    // fully restore HP
                    this.restoreHealth(Chad.MAX_HEALTH);
                    console.log("*munch munch* Beef");
                    break;
            }

            // play a randomly chosen sound effect
            const rand = Math.floor(Math.random() * 4) + 1;
            const sfx = SFX["FOOD_EAT" + rand];
            ASSET_MGR.playAudio(sfx.path, sfx.volume);

            GAME.user.eatFood = false; // we only want to eat once per click
        }*/
    };


    /** Draw Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), this.scale);
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
            31, 1 / 10);
        this.animations["right"]["running"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(0, 0),
            Chad.SIZE,
            31, 1 / 10);
        this.animations["left"]["running"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(96, 64),
            Chad.SIZE,
            31, 1 / 10);

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
            32, 1 / 20);

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

        this.animations["right"]["death"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(432, 1664),
            Chad.SIZE,
            15, 1 / 10);
        this.animations["left"]["death"] = new Animator(
            Chad.SPRITESHEET,
            new Vector(432, 1728),
            Chad.SIZE,
            15, 1 / 10);
    };
};
