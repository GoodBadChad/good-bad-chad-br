class BSHouse {
    constructor(x, y) {
        this.x = x * Block.SCALED_SIZE;
        this.y = y * Block.SCALED_SIZE;
        this.animator = new Animator(BSHouse.SPRITESHEET, 0, 0, BSHouse.SIZE, BSHouse.SIZE,
            4, 1/4);
    };

    static get SPRITESHEET() {
        return "./sprites/blacksmith_house.png";
    };

    static get SIZE() {
        return 192;
    };
    
    static get SCALE() {
        return 3;
    };

    update() {

    };

    draw() {
        this.animator.drawFrame(this.x - CAMERA.x, this.y - CAMERA.y, BSHouse.SCALE);
    };
};
