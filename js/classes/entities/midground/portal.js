class Portal {
    constructor(blockX, blockY, dimension) {
        this.x = blockX * Block.SCALED_SIZE;
        this.y = blockY * Block.SCALED_SIZE;
        this.width = Block.SCALED_SIZE;
        this.height = Block.SCALED_SIZE * 2;
        this.dimension = dimension;
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    draw() {
        CTX.fillStyle = "#ff0000";
        CTX.fillRect(this.x - CAMERA.x, this.y - CAMERA.y, this.width, this.height);
    };

    update() {

    };
};