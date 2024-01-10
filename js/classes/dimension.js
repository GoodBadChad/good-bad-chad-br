class Dimension {
    constructor(dimension) {
        this.dimension = dimension ?? Dimension.PLAYGROUND;
    }

    get BLOCK_WIDTH() {
        switch (this.dimension) {
            case Dimension.PLAYGROUND:
                return 100;
            default:
                return 100;
        }
    };

    get BLOCK_HEIGHT() {
        switch (this.dimension) {
            case Dimension.PLAYGROUND:
                return 25;
            default:
                return 100;
        }
    };

    get MAX_X() {
        switch (this.dimension) {
            case Dimension.PLAYGROUND:
                return 100 * Block.SCALED_SIZE;
            default:
                return 100;
        }
    };

    get MAX_Y() {
        switch (this.dimension) {
            case Dimension.PLAYGROUND:
                return 25 * Block.SCALED_SIZE;
            default:
                return 100;
        }
    };

    get MIN_X() {
        switch (this.dimension) {
            case Dimension.PLAYGROUND:
                return 0;
            default:
                return 0;
        }
    };

    get MIN_Y() {
        switch (this.dimension) {
            case Dimension.PLAYGROUND:
                return 0;
            default:
                return 0;
        }
    };

    static get PLAYGROUND() {
        return 0;
    }
};