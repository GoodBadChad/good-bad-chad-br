/**
 * A Dimension holds data necessary for the six dimensions through which Chad travels.
 * There is also a PLAYGROUND dimension for developer testing.
 * The only ways in which a Dimension should be used is (1) construction (when Chad collides with a portal)
 * @author Devin Peevy
 */
class Dimension {
    
    /**
     * @param {number} dimension The id of the Dimension which you want to load. Dimension.PLAYGROUND, .VILLAGE, .WOODS, .FACTORY, .SNOWY, .LAVA, or .TOWER.
     */
    constructor(dimension) {
        // Did we try and pass an illegal argument?
        if (dimension % 1 !== 0 || dimension > 7 || dimension < 0) {
            throw new Error("Illegal dimension parameter passed in. Try Dimension.PLAYGROUND, .VILLAGE, .WOODS, .FACTORY, .SNOWY, .LAVA, or .TOWER");
        } else {
            this.dimension = dimension;
        }
        this.loadDimension();
    };

    /**
     * This method is going to be called whenever a new dimension needs to be loaded.
     * 
     */
    loadDimension() {
        // First we want to clear all entities and the cache.
        GAME.clearEntities();
        ASSET_MGR.clearCache();
        
        const loadMethods = [
            loadPlaygroundDimension,  // Playground
            null,                       // Village
            null,                       // Woods
            null,                       // Factory
            null,                       // Snowy
            null,                       // Lava
            null                        // Tower
        ];
        loadMethods[this.dimension]();
    };

    // Dynamic getters

    /** The minimum x value allowed in this dimension. */
    get MIN_X() {
        // TODO: everybody fill in.

        // The min x, in BLOCKS! of your world.
        const minXs = [
            -25,    // PLAYGROUND
            0,      // VILLAGE
            0,      // WOODS
            0,      // FACTORY
            0,      // SNOWY
            0,      // LAVA
            0];     // TOWER
        return minXs[this.dimension] * Block.SCALED_SIZE;
    }

    /** The minimum y value allowed in this dimension. */
    get MIN_Y() {
        // TODO: everybody fill in.

        // The min y, in BLOCKS! of your world.
        const minYs = [
            -25,    // PLAYGROUND
            0,      // VILLAGE
            0,      // WOODS
            0,      // FACTORY
            0,      // SNOWY
            0,      // LAVA
            0];     // TOWER
        return minYs[this.dimension] * Block.SCALED_SIZE;
    }

    get BLOCK_WIDTH() {
        // TODO: everybody fill in.

        // The width, in BLOCKS! of your world.
        const blockWidths = [
            50,     // PLAYGROUND
            0,      // VILLAGE
            0,      // WOODS
            0,      // FACTORY
            0,      // SNOWY
            0,      // LAVA
            0];     // TOWER
        return blockWidths[this.dimension] * Block.SCALED_SIZE;
    }

    get BLOCK_HEIGHT() {
        // TODO: everybody fill in.

        // The height, in BLOCKS! of your world.
        const blockHeights = [
            50,     // PLAYGROUND
            0,      // VILLAGE
            0,      // WOODS
            0,      // FACTORY
            0,      // SNOWY
            0,      // LAVA
            0];     // TOWER
        return blockHeights[this.dimension]
    }

    get MAX_X() {
        return this.MIN_X + Block.SCALED_SIZE * this.BLOCK_WIDTH;
    }

    get MAX_Y() {
        return this.MIN_Y + Block.SCALED_SIZE * this.BLOCK_HEIGHT;
    }

    // IDs:

    /** 
     * The id of a Playground dimension, meant for the developers to test things out in.
     * Has nothing to do with the real game.
     */
    static get PLAYGROUND() {
        return 0;
    };

    /** The id of the Village dimension. */
    static get VILLAGE() {
        return 1;
    };

    /** The id of the Woods dimension. */
    static get WOODS() {
        return 2;
    };

    /** The id of the Factory dimension. */
    static get FACTORY() {
        return 3;
    };

    /** The id of the Snowy dimension. */
    static get SNOWY() {
        return 4;
    };

    /** The id of the Lava dimension. */
    static get LAVA() {
        return 5;
    };

    /** The id of the Tower dimension. */
    static get TOWER() {
        return 6;
    };
};