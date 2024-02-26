/**
 * 
 * 
 * @author Nathan Hinthorne
 */
class FoodDrop {

    /**
     * Constructor for a FoodDrop.
     * 
     * @param {number} type The type of FoodDrop that should be generated. FoodDrop.BACON, .BURGER, .ENERGY_DRINK, .STEAK, .HAM, or .CHICKEN. 
     * @param {Vector} pos The position at which the FoodDrop should start.
     */
    constructor(type, pos) {
        if (typeof type !== "number" || type % 1 !== 0 || type < 0 || type > 6) {
            throw new Error("Invalid FoodDrop type: please use a FoodDrop member type (e.g. FoodDrop.STEAK).");
        }

        this.type = type;
        this.pos = pos;
        this.scale = FoodDrop.NORMAL_FOOD_SCALE;
        if (this.type == FoodDrop.BACON) {
            this.scale = FoodDrop.SPECIAL_FOOD_SCALE;
        }
        this.scaledSize = Vector.multiply(FoodDrop.SIZE, this.scale);
        this.boundingBox = new BoundingBox(this.pos, this.scaledSize);
        this.animation = new Animator(FoodDrop.SPRITESHEET, 
            new Vector(FoodDrop.SIZE.x, type * FoodDrop.SIZE.y),
            FoodDrop.SIZE, 7, 0.15);
    }

    update() {
        if (this.boundingBox.collide(CHAD.boundingBox)) {
            // play a randomly chosen sound effect
            // const rand = Math.floor(Math.random() * 3) + 1; //! uncomment when HUD food-picker is implemented
            // const sfx = SFX["ITEM_COLLECT" + rand];
            // ASSET_MGR.playSFX(sfx.path, sfx.volume);



            // create a particle effect
            const center = Vector.add(this.pos, Vector.multiply(this.scaledSize, 0.5));
            GAME.addEntity(new ParticleEffect(center, ParticleEffect.FOOD_PICKUP));
            
            this.removeFromWorld = true;

            // INVENTORY.adjustFood(this.type, 1);  //! uncomment when HUD food-picker is implemented


            //! remove this when HUD food-picker is implemented
            // immediately consume the food

            switch (this.type) {
                case FoodItem.IDK_YET:
                    // grow chad total size by 4x 
                    CHAD.scale = Vector.multiply(Chad.DEFAULT_SCALE, 4);
                    CHAD.pos = new Vector(CHAD.pos.x, CHAD.pos.y - 500);
                    console.log("JUMBO CHAD");
                    setTimeout(() => {
                        CHAD.scale = Chad.DEFAULT_SCALE;
                    }, 20_000);
                    break;
                case FoodItem.BACON:
                    // give chad invincibility for 10 seconds
                    // grow chad total size by 1.2x 
                    CHAD.isInvincible = true;
                    CHAD.scale = Vector.multiply(Chad.DEFAULT_SCALE, 1.2);
                    CHAD.pos = new Vector(CHAD.pos.x, CHAD.pos.y - 10);
                    setTimeout(() => {
                        CHAD.isInvincible = false;
                        CHAD.scale = Chad.DEFAULT_SCALE;
                    }, 20_000);
                    break;

                case FoodItem.BURGER:
                    // give chad extra attack power for 20 seconds
                    // grow chad's width by 1.2x
                    CHAD.damageMultiplier = 2;
                    CHAD.isStrong = true;
                    CHAD.speed /= 1.3;
                    CHAD.scale = new Vector(Chad.DEFAULT_SCALE.x * 1.5, Chad.DEFAULT_SCALE.y);
                    setTimeout(() => {
                        CHAD.damageMultiplier = Chad.DEFAULT_DAMAGE_MULTIPLIER;
                        CHAD.isStrong = false;
                        CHAD.speed = Chad.DEFAULT_SPEED;
                        CHAD.scale = Chad.DEFAULT_SCALE;
                    }, 20_000);
                    console.log("BIG CHUNGUS");
                    break;

                case FoodItem.ENERGY_DRINK:
                    // give chad extra speed and jump height for 30 seconds
                    CHAD.speed = Chad.DEFAULT_SPEED * 1.5;
                    CHAD.isFast = true;
                    CHAD.firstJumpVelocity = Chad.DEFAULT_FIRST_JUMP_VELOCITY * 1.2;
                    CHAD.secondJumpVelocity = Chad.DEFAULT_SECOND_JUMP_VELOCITY * 1.2;
                    setTimeout(() => {
                        CHAD.speed = Chad.DEFAULT_SPEED;
                        CHAD.isFast = false;
                        CHAD.firstJumpVelocity = Chad.DEFAULT_FIRST_JUMP_VELOCITY;
                        CHAD.secondJumpVelocity = Chad.DEFAULT_SECOND_JUMP_VELOCITY;
                    }, 30_000);
                    break;

                case FoodItem.CHICKEN:
                    // restore 20 HP
                    CHAD.restoreHealth(20);
                    break;

                case FoodItem.STEAK:
                    // restore 40 HP
                    CHAD.restoreHealth(40);
                    break;

                case FoodItem.HAM:
                    // restore 60 HP
                    CHAD.restoreHealth(60);
                    break;

                case FoodItem.BEEF:
                    // fully restore HP
                    CHAD.restoreHealth(Chad.MAX_HEALTH);
                    break;
            }

            // play a randomly chosen sound effect
            const rand = Math.floor(Math.random() * 4) + 1;
            const sfx = SFX["FOOD_EAT" + rand];
            ASSET_MGR.playSFX(sfx.path, sfx.volume);
        }
    }

    draw() {
        this.animation.drawFrame(Vector.worldToCanvasSpace(this.pos), this.scale);
    }

    /** The Food spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/food.png";
    };

    /** The scale at which a MEAT FoodDrop is drawn. */
    static get NORMAL_FOOD_SCALE() {
        return 2.5;
    };

    static get SPECIAL_FOOD_SCALE() {
        return 3.5;
    }



    /** The size (in pixels) of the space allotted to each FoodDrop type on the spritesheet. */
    static get SIZE() {
        return new Vector(32, 32);
    }



    // TYPES
    
    /** The Bacon FoodDrop type. */
    static get BACON() {
        return 0;
    };

    /** The Burger FoodDrop type. */
    static get BURGER() {
        return 1;
    };

    /** The Energy Drink FoodDrop type. */
    static get ENERGY_DRINK() {
        return 2;
    };

    /** The Steak FoodDrop type. */
    static get STEAK() {
        return 3;
    };

    /** The Ham FoodDrop type. */
    static get HAM() {
        return 4;
    };

    /** The Chicken FoodDrop type. */
    static get CHICKEN() {
        return 5;
    };

    /** The Beef FoodDrop type. */
    static get BEEF() {
        return 6;
    };
}