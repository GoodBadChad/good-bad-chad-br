/** A Block is the building block of our world. A block cannot be passed through by any entity. 
 * Only certain types of blocks can be broken through.
 * 
 * @author Devin, (modified) Caleb Krauter
 */
class Block {
    /**
     * 
     * @param {Vector} pos The coordinates (IN THE BLOCKGRID) at which you want the block placed.
     * @param {number} type The type of block you want. Block.GRASS, DIRT, SNOWY_ICE, ICE, SNOWY_DIRT, SNOW, LAVA_ROCK.
     * @param {boolean} needsBB Is there any reason that this Block should need a bounding box? Default: true.
     */
    constructor(pos, type, needsBB = true) {
        /** The position of the Block (in the game world). */
        this.pos = Vector.blockToWorldSpace(pos);

        /** The type of block. Block.GRASS, DIRT, SNOWY_ICE, ICE, SNOWY_DIRT, SNOW, LAVA_ROCK. */
        this.type = type;
        /** An associative array of the animations for this Block. Arranged [facing][action]. */
        this.animator = new Animator(
            Block.SPRITESHEET,
            new Vector(0, this.type * Block.SIZE), // "type" is also the number of sprites above it on the spritesheet!
            new Vector(Block.SIZE, Block.SIZE),
            1, 1);
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = needsBB ? new BoundingBox(this.pos, new Vector(Block.SCALED_SIZE, Block.SCALED_SIZE)) : undefined;
    };

    // TYPES:

    static get GRASS() {
        return 0;
    };

    static get DIRT() {
        return 1;
    };

    static get SNOWY_ICE() {
        return 2;
    };

    static get ICE() {
        return 3;
    };

    static get SNOWY_DIRT() {
        return 4;
    };

    static get SNOW() {
        return 5;
    };

    static get LAVA_ROCK() {
        return 6;
    };
    static get BARS() {
        return 7;
    };
    static get PLANKS_OAK() {
        return 8;
    };
    static get PLANKS_SPRUCE() {
        return 9;
    };
    static get LOG_SPRUCE_VIRTICAL() {
        return 10;
    };
    static get LOG_SPRUCE_HORIZONTAL() {
        return 11;
    };
    static get PLANKS_REDWOOD() {
        return 12;
    };
    static get PLANKS_REDWOOD_LIGHT() {
        return 13;
    };
    static get STONE_COBBLE() {
        return 14;
    };
    static get STONE_COBBLE_DARK() {
        return 15;
    };
    static get STONE_COBBLE_VOLCANIC() {
        return 16;
    };
    static get PLANK_OAK_STAIRS_LEFT() {
        return 17;
    };
    static get PLANK_OAK_STAIRS_RIGHT() {
        return 18;
    };
    static get PLANK_SPRUCE_STAIRS_LEFT() {
        return 19;
    };
    static get PLANK_SPRUCE_STAIRS_RIGHT() {
        return 20;
    };
    /** How much bigger should the sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        return 2;
    };

    static get SIZE() {
        return 32;
    };

    static get SCALED_SIZE() {
        return Block.SCALE * Block.SIZE;
    };

    /** The filepath to the spritesheet of the Block. */
    static get SPRITESHEET() {
        return "./sprites/blocks.png";
    };

    /** Change what the entity is doing and where it is. */
    update() {

    };

    /** Draw the entity on the canvas. */
    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), Block.SCALE);
    };
};