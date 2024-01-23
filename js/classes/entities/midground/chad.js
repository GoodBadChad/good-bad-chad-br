// SHELL FOR AN ENTITY. UPDATE AS WE GO.
class Chad {
    /**
     * 
     * @param {Vector} pos The y position of Chad (in the game world).
     */
    constructor(pos) {
        /** The position of Chad (in the game world). */
        this.pos = pos;
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

    /** The size, in pixels, of Chad's sprite ON THE SPRITESHEET. */
    static get SIZE() {

    };

    /** How much bigger should Chad's sprite be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {

    };

    /** This will be Chad's size ON THE CANVAS. */
    static get SCALED_SIZE() {
        return Vector.multiply(Chad.SIZE, Chad.SCALE);
    };

    /** The filepath to Chad's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/chad.js";
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