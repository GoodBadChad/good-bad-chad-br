/** 
 * A Snake can appear in the village <or the lava> dimension(s).
 * He is able to face right or left, slither, and die.
 * @author Devin Peevy
 */
class Snake {
    /**
     * @param {Vector} pos The position at which the Snake should start.
     */
    constructor(pos) {
        this.pos = pos;
        /** An associative array of the animations for this Snake. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Snake looking? */
        this.facing = "left"; // "left", "right"
        /** What is the Snake doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        //this.boundingBox = new BoundingBox();
        /** Used to check how to deal with collisions with other applicable entities. */
        //this.lastBoundingBox = this.boundingBox;
        this.elapsedTime = 0;
        this.hops = 0;
    };

    /** The size, in pixels, of the Snake ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(40, 13);
    }

    /** How much bigger should the Snake be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 5;
    };

    /** This will be the size of the Snake ON THE CANVAS. */
    static get SCALED_SIZE() {
        return Vector.multiply(Snake.SIZE, Snake.SCALE);
    }

    static get SPEED() {
        return Snake.SCALE * 30;
    }

    /** The filepath to the spritesheet of the Snake. */
    static get SPRITESHEET() {
        // TODO: make bunny death sprite.
        return "./sprites/snake.png";
    };
    
    /** Change what the Snake is doing and where it is. */
    update() {
        // WHAT SHOULD HIS CONDITIONS BE?

        // He's gonna (wait 0.5s, slither once) x2, turn, repeat.
        if (this.elapsedTime % 1.5 < 0.5) {
            this.action = "idle";
        } else {
            this.action = "slithering";
        }
        // His animation takes 1 second. So: 
        this.hops = Math.floor(this.elapsedTime / 1.5);
        this.facing = (Math.floor(this.hops / 2) % 2 === 0) ? "left" : "right";
        this.elapsedTime += GAME.clockTick;

        // HOW SHOULD WE MOVE HIM BASED ON HIS CONDITIONS?
        const mult = (this.facing === "left") ? -1 : 1;
        if (this.action === "slithering") {
            this.pos = Vector.add(this.pos, new Vector(mult * Snake.SPEED * GAME.clockTick, 0));
        }
    };

    /** Draw the Snake on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.pos, Snake.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["right"]["idle"] = new Animator(
            Snake.SPRITESHEET,
            new Vector(0, 0),
            Snake.SIZE,
            1, 1);
        this.animations["left"]["idle"] = new Animator(
            Snake.SPRITESHEET,
            new Vector(0, Snake.SIZE.y),
            Snake.SIZE,
            1, 1);
        
        // HOPPING ANIMATIONS
        // (it takes him 0.5s to hop)
        this.animations["right"]["slithering"] = new Animator(
            Snake.SPRITESHEET,
            new Vector(0, 0),
            Snake.SIZE,
            9, 1/9);
        this.animations["left"]["slithering"] = new Animator(
            Snake.SPRITESHEET,
            new Vector(0, Snake.SIZE.y),
            Snake.SIZE,
            9, 1/9);
        
    };
};