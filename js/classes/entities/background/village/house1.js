class House {
    constructor(pos) {
        this.pos = pos;
        this.animator = new Animator(House.SPRITESHEET, new Vector(0, 0), new Vector(House.SIZE.x, House.SIZE.y), 4, 1);

    };

    static get SPRITESHEET() {
        return "./sprites/blacksmith_house.png";
    };

    static get SIZE() {
        return new Vector(200, 256);
    };

    update() {

    };

    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), 1);
    };
};