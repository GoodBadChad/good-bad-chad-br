/**
 * A piece of ammo that is contained in the inventory.
 * Meant to be turned into a Projectile when used.
 * 
 * @author Nathan Hinthorne
 */
class AmmoItem {
    /**
     * 
     * @param {number} type The type of ammo to create. AmmoItem.STONE, .WOOD, .BOMB, .METAL, or .LASER.
     * @param {number} amount The amount of ammo to create.
     */
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
        this.isSecret = true;
    }

    adjustSupply(amount) {
        if (typeof amount !== "number" || amount % 1 !== 0) {
            throw new Error("Invalid amount of ammo to add");
        }

        if (this.isSecret) { // once the player has collected this ammo, it is no longer secret
            this.isSecret = false;
        }

        this.amount += amount;
    }



    static get SPRITESHEET() {
        return "./sprites/ammo.png";
    }

    static get SPRITESHEET_ENTRY_HEIGHT() {
        return 13;
    }

    static get SCALE() {
        return 3;
    }

    static get SIZE() {
        return new Vector(10, 13);
    }

    static get SCALED_SIZE() {
        return Vector.multiply(AmmoItem.SIZE, AmmoItem.SCALE);
    }


    //! TEMPORARY
    static get STONE() {
        return 0;
    };
    static get WOOD() {
        return 1;
    };
    static get BOMB() {
        return 2;
    };
    static get METAL() {
        return 3;
    };
    static get LASER() {
        return 5;
    };





    static get ROCK() {
        return 1;
    }

    static get BOMB() {
        return 2;
    }

    static get SNOWBALL() {
        return 3;
    }

    static get SLIMEBALL() {
        return 4;
    }

    static get LASER() {
        return 5;
    }

    static get SONIC_WAVE() {
        return 6;
    }

    static get BROCCOLI() {
        return 7;
    }

    static get SUS_SNOWBALL() {
        return 8;
    }

}