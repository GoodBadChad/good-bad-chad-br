class Portal {
    constructor(blockPos, dimension) {
        this.pos = Vector.blockToWorldSpace(blockPos);
        this.size = new Vector(Block.SCALED_SIZE, Block.SCALED_SIZE * 2);
        this.dimension = dimension;
        this.boundingBox = new BoundingBox(this.pos, this.size);
    };

    draw() {
        CTX.fillStyle = "#ff0000";
        const canvasPos = Vector.worldToCanvasSpace(this.pos);
        CTX.fillRect(canvasPos.x, canvasPos.y, this.size.x, this.size.y);
    };

    update() {

    };
};