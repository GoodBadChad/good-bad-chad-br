/** 
 * Flowing water for the river.
 * 
 * @author Nathan
 */
class Water {
    /**
     * @param {Vector} pos The coordinates (IN THE BLOCKGRID) at which you want the water block placed.
     */
    constructor(pos) {
        /** The position of the Water block (in the game world). */
        this.pos = Vector.blockToWorldSpace(pos);

        this.animator = new Animator(
            Block.SPRITESHEET,
            new Vector(0, 0),
            new Vector(Water.SIZE, Water.SIZE),
            2, 0.3, true);
    };

    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 2;
    };

    static get SIZE() {
        return 32;
    };

    static get SCALED_SIZE() {
        return Water.SCALE * Water.SIZE;
    };

    /** The filepath to the spritesheet of the Block. */
    static get SPRITESHEET() {
        return "./sprites/water.png";
    };

    /** Change what the entity is doing and where it is. */
    update() {

    };

    /** Draw the entity on the canvas. */
    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), Water.SCALE);
    };
};