/** 
 * A bunny can appear in the village <or the ice> dimension(s).
 * He is able to face right or left, hop, and die.
 * @author Devin Peevy
 */
class Bunny {
    /**
     * @param {Vector} pos The position at which the Bunny should start.
     */
    constructor(pos) {
        /** The position of the Bunny (in the game world). */
        this.pos = pos;
        /** An associative array of the animations for this Bunny. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Bunny looking? */
        this.facing = "left"; // "left", "right"
        /** What is the Bunny doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        //this.boundingBox = new BoundingBox();
        /** Used to check how to deal with collisions with other applicable entities. */
        //this.lastBoundingBox = this.boundingBox;
        this.elapsedTime = 0;
        this.hops = 0;
    };

    /** The size, in pixels, of the Bunny ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(24, 27);
    }

    /** How much bigger should the Bunny be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 5;
    };

    static get SCALED_SIZE() {
        return Vector.multiply(Bunny.SIZE, Bunny.SCALE);
    }

    static get SPEED() {
        return Bunny.SCALE * 30;
    }

    /** The filepath to the spritesheet of the Bunny. */
    static get SPRITESHEET() {
        // TODO: make bunny death sprite.
        return "./sprites/bunny.png";
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
            this.pos = Vector.add(this.pos, new Vector(mult * Bunny.SPEED * GAME.clockTick, 0));
        }
    };

    /** Draw the Bunny on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.pos, Bunny.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(
            Bunny.SPRITESHEET,
            new Vector(0, 0),
            Bunny.SIZE,
            1, 1);
        this.animations["right"]["idle"] = new Animator(
            Bunny.SPRITESHEET,
            new Vector(0, Bunny.SIZE.y),
            Bunny.SIZE,
            1, 1);
        
        // HOPPING ANIMATIONS
        // (it takes him 0.5s to hop)
        this.animations["left"]["hopping"] = new Animator(
            Bunny.SPRITESHEET,
            new Vector(Bunny.SIZE.x, 0),
            Bunny.SIZE,
            4, 0.125);
        this.animations["right"]["hopping"] = new Animator(
            Bunny.SPRITESHEET,
            Bunny.SIZE,
            Bunny.SIZE,
            4, 0.125);
        
    };
};