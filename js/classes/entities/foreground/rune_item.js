/**
 * A rune item that represents all the runes currently in the player's inventory.
 * 
 * @author Nathan Hinthorne
 */
class RuneItem {
    constructor() {

        this.animator = new Animator(RuneItem.SPRITESHEET,
            new Vector(0, 0), 
            RuneItem.SIZE, 1, 0); //!!! runes are currently not in correct position on the spritesheet
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

        this.amount += amount;
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