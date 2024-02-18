/**
 * A rune that is contained in the inventory.
 * Holds all the behavior unique to the assigned of rune.
 * 
 * @author Nathan Hinthorne
 */
class RuneItem {
    /**
     * 
     * @param {number} type The type of rune to create. RuneItem.YELLOW, .WHITE, .BLUE, .RED, .GREEN, or .PURPLE.
     * @param {number} amount The amount of runes to create.
     */
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
        this.isSecret = true;

        this.animator = new Animator(RuneItem.SPRITESHEET,
            new Vector(0, type * RuneItem.SIZE.y), 
            RuneItem.SIZE, 1, 1); //!!! runes are currently not in correct position on the spritesheet
    }

    update() {
        // pretty sure this will stay empty
    }

    draw() {

    }

    adjustSupply(amount) {
        if (typeof amount !== "number" || amount % 1 !== 0) {
            throw new Error("Invalid amount of runes to add");
        }

        if (this.isSecret) { // once the player has collected this rune, it is no longer secret
            this.isSecret = false;
        }

        this.amount += amount;
    }

    static get YELLOW() {
        return 0;
    }

    static get WHITE() {
        return 1;
    }

    static get BLUE() {
        return 2;
    }

    static get RED() {
        return 3;
    }

    static get GREEN() {
        return 4;
    }

    static get PURPLE() {
        return 5;
    }

    static get SCALE() {
        return 4;
    }

    static get SIZE() {
        return new Vector(32, 32);
    }

    static get SCALED_SIZE() {
        return Vector.multiply(RuneItem.SIZE, RuneItem.SCALE);
    }

    static get SPRITESHEET() {
        return "./sprites/runes.png";
    }
}