class Sun {
    constructor(pos, type) {
        if (pos.x < 0
            || pos.y < 0
            || pos.x > ZONE.MAX_PT.x - Sun.SCALED_SIZE
            || pos.y > ZONE.MAX_PT.y - Sun.SCALED_SIZE) {

            throw new Error("Your sun exists outside the bounds of the Zone!");
        }
        if (type % 1 !== 0 || type < 0 || type > 3) {
            throw new Error("Your sun is of an improper type! Try Sun.VILLAGE, .MOUNTAIN, .LAVA, .MOON")
        }
        this.pos = pos;
        this.type = type;
        this.animator = new Animator(
            Sun.SPRITESHEET,
            new Vector(0, type * Sun.SIZE),
            new Vector(Sun.SIZE, Sun.SIZE),
            2, 0.8);
    };

    static get VILLAGE() {
        return 0;
    };

    static get MOUNTAIN() {
        return 1;
    };

    static get LAVA() {
        return 2;
    };

    static get MOON() {
        return 3;
    };

    static get SIZE() {
        return 50;
    };

    static get SCALE() {
        return 3;
    };

    static get SCALED_SIZE() {
        return Sun.SIZE * Sun.SCALE;
    };

    static get SPRITESHEET() {
        return "./sprites/suns2.png";
    };

    /** The sun does not change. Do not update. */
    update() {
        // "You can wait your whole life, but he'll never change."
    };

    /**
     * This will draw the Sun on the Canvas! The sun is a unique type of entity who draws in the same spot regardless of CAMERA.
     */
    draw() {
        this.animator.drawFrame(this.pos, Sun.SCALE);
    };
}