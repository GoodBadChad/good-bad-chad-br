/** 
 * A bunny can appear in the village <or the ice> dimension(s).
 * He is able to face right or left, hop, and die.
 * @author Devin Peevy
 */
class Bunny {
    /**
     * @param {number} x The x position at which the Bunny should start.
     * @param {number} y The y position at which the Bunny should start.
     */
    constructor(x, y) {
        /** The x position of the Bunny (in the game world). */
        this.x = x;
        /** The y position of the Bunny (in the game world). */
        this.y = y;
        /** An associative array of the animations for this Bunny. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Bunny looking? */
        this.facing = "left"; // "left", "right"
        /** What is the Bunny doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox();
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        this.elapsedTime = 0;
        this.hops = 0;
    };

    /** The height, in pixels, of the Bunny ON THE SPRITESHEET. */
    static get HEIGHT() {
        return 24;
    };

    /** How much bigger should the Bunny be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 5;
    };

    /** This will be the height of the Bunny ON THE CANVAS. */
    static get SCALED_HEIGHT() {
        return Bunny.SCALE * Bunny.HEIGHT;
    };

    /** This will be the width of the Bunny ON THE CANVAS. */
    static get SCALED_WIDTH() {
        return Bunny.SCALE * Bunny.WIDTH;
    };

    static get SPEED() {
        return Bunny.SCALE * 30;
    }

    /** The filepath to the spritesheet of the Bunny. */
    static get SPRITESHEET() {
        // TODO: make bunny death sprite.
        return "./sprites/bunny.png";
    };

    /** The width, in pixels, of the Bunny ON THE SPRITESHEET. */
    static get WIDTH() {
        return 27;
    };
    
    /** Change what the Bunny is doing and where it is. */
    update() {
        // WHAT SHOULD HIS CONDITIONS BE?

        // He's gonna (wait 0.5s, jump) x2, turn, repeat.
        if (this.elapsedTime % 1 < 0.5) {
            this.action = "idle";
        } else {
            this.action = "hopping";
        }
        // His animation takes 1 second. So: 
        this.hops = Math.floor(this.elapsedTime);
        this.facing = (Math.floor(this.hops / 2) % 2 === 0) ? "left" : "right";
        this.elapsedTime += GAME.clockTick;

        // HOW SHOULD WE MOVE HIM BASED ON HIS CONDITIONS?
        const mult = (this.facing === "left") ? -1 : 1;
        if (this.action === "hopping") {
            this.x += mult * Bunny.SPEED * GAME.clockTick;
        }
    };

    /** Draw the Bunny on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.x, this.y, Bunny.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(
            Bunny.SPRITESHEET,
            0, 0,
            Bunny.WIDTH, Bunny.HEIGHT,
            1, 1);
        this.animations["right"]["idle"] = new Animator(
            Bunny.SPRITESHEET,
            0, Bunny.HEIGHT,
            Bunny.WIDTH, Bunny.HEIGHT,
            1, 1);
        
        // HOPPING ANIMATIONS
        // (it takes him 0.5s to hop)
        this.animations["left"]["hopping"] = new Animator(
            Bunny.SPRITESHEET,
            Bunny.WIDTH, 0,
            Bunny.WIDTH, Bunny.HEIGHT,
            4, 0.125);
        this.animations["right"]["hopping"] = new Animator(
            Bunny.SPRITESHEET,
            Bunny.WIDTH, Bunny.HEIGHT,
            Bunny.WIDTH, Bunny.HEIGHT,
            4, 0.125);
        
    };
};