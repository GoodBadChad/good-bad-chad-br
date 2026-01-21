/** 
 * Flowing water and lava.
 * 
 * @author Nathan Hinthorne
 */
class LiquidBlock {
    /**
     * @param {Vector} pos The coordinates (IN THE BLOCKGRID) at which you want the liquid block placed.
     * @param {number} type The type of liquid block you want. LiquidBlock.WATER, LAVA.
     */
    constructor(pos, type) {
        /** The position of the Water block (in the game world). */
        this.pos = Vector.blockToWorldSpace(pos);
        this.type = type;

        this.animator = new Animator(
            LiquidBlock.SPRITESHEET,
            new Vector(0, type * LiquidBlock.SIZE.y),
            LiquidBlock.SIZE,
            4, 0.20, true);

        this.isHarmful = true; // change later on if we want to add calm water for a small lake
    };


    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 2;
    };

    static get SIZE() {
        return new Vector(32, 32);
    };

    static get SCALED_SIZE() {
        return LiquidBlock.SCALE * LiquidBlock.SIZE;
    };

    /** The filepath to the spritesheet of the Block. */
    static get SPRITESHEET() {
        return "./sprites/liquid_blocks.png";
    };

    static get LAVA() {
        return 0;
    }

    static get WATER() {
        return 1;
    }


    /** Change what the entity is doing and where it is. */
    update() {
        
    };

    /** Draw the entity on the canvas. */
    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), LiquidBlock.SCALE);
    };
};