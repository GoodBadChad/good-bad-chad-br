// SHELL FOR AN ENTITY. UPDATE AS WE GO.
class Chad {
    /**
     * 
     * @param {number} x The y position of Chad (in the game world).
     * @param {number} y The x position of Chad (in the game world).
     */
    constructor(x, y) {
        /** The x position of Chad (in the game world). */
        this.x = x;
        /** The y position of Chad (in the game world). */
        this.y = y;
        /** An associative array of Chad's animations. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is Chad looking? */
        this.facing = "left"; // "left", "right"
        /** What is Chad doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox();
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
    };

    /** The height, in pixels, of Chad's sprite ON THE SPRITESHEET. */
    static get HEIGHT() {

    };

    /** How much bigger should Chad's sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {

    };

    /** This will be Chad's height ON THE CANVAS. */
    static get SCALED_HEIGHT() {
        return Entity.SCALE * Entity.HEIGHT;
    };

    /** This will be Chad's width ON THE CANVAS. */
    static get SCALED_WIDTH() {
        return Entity.SCALE * Entity.WIDTH;
    };

    /** The filepath to Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/";
    };

    /** The width, in pixels, of Chad ON THE SPRITESHEET. */
    static get WIDTH() {

    };
    
    /** Change what Chad is doing and where he is. */
    update() {

    };

    /** Draw Chad on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame();
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];
    };
}