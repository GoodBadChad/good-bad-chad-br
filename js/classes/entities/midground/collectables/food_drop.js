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
        this.boundingBox = new BoundingBox(this.pos, FoodDrop.SCALED_SIZE);
        this.animation = new Animator(FoodDrop.SPRITESHEET, 
            new Vector(FoodDrop.SIZE.x, type * FoodDrop.SIZE.y),
            FoodDrop.SIZE, 7, 0.15);
    }

    update() {
        if (this.boundingBox.collide(CHAD.boundingBox)) {
            // play a randomly chosen sound effect
            const rand = Math.floor(Math.random() * 3) + 1;
            const sfx = SFX["ITEM_COLLECT" + rand];
            ASSET_MGR.playAudio(sfx.path, sfx.volume);

            // create a particle effect
            const center = Vector.add(this.pos, Vector.multiply(FoodDrop.SCALED_SIZE, 0.5));
            GAME.addEntity(new ParticleEffect(center, ParticleEffect.FOOD_PICKUP));
            
            this.removeFromWorld = true;
            INVENTORY.adjustFood(this.type, 1);
        }
    }

    draw() {
        this.animation.drawFrame(Vector.worldToCanvasSpace(this.pos), FoodDrop.SCALE);
    }

    /** The Food spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/food.png";
    };

    /** The scale at which a FoodDrop is drawn. */
    static get SCALE() {
        return 2.5;
    };

    /** The size (in pixels) of the space allotted to each FoodDrop type on the spritesheet. */
    static get SIZE() {
        return new Vector(32, 32);
    }

    static get SCALED_SIZE() {
        return Vector.multiply(FoodDrop.SIZE, FoodDrop.SCALE);
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