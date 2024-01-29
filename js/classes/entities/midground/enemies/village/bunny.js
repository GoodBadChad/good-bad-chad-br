/** 
 * A bunny can appear in the village <or the ice> dimension(s).
 * He is able to face right or left, hop, and die.
 * 
 * @author Devin Peevy
 * @author Trae Claar
 */
class Bunny {
    /**
     * Constructor for a Bunny.
     * 
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
        this.boundingBox = new BoundingBox(this.pos, Bunny.SCALED_SIZE);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        this.yVelocity = 0;
        this.health = Bunny.MAX_HEALTH;
        this.elapsedTime = 0;
        this.hops = 0;
        this.targetX = this.pos.x;

        GAME.addEntity(new HealthBar(this, Bunny.MAX_HEALTH, Bunny.SCALED_SIZE.x));
    };

    /** The size, in pixels, of the Bunny ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(27, 24);
    }

    /** How much bigger should the Bunny be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 3;
    };

    /** The size of the Bunny on the Canvas. */
    static get SCALED_SIZE() {
        return Vector.multiply(Bunny.SIZE, Bunny.SCALE);
    };

    /** The speed of the Bunny. */
    static get SPEED() {
        return Bunny.SCALE * 30;
    };

    /** The maximum health of the Bunny. */
    static get MAX_HEALTH() {
        return 20;
    };

    /** The default number of hops a Bunny takes before changing direction. */
    static get DEFAULT_HOP_COUNT() {
        return 2;
    };

    /** The number of hops a Bunny makes when running from the player. */
    static get RUN_HOP_COUNT() {
        return 10;
    };

    /** The filepath to the spritesheet of the Bunny. */
    static get SPRITESHEET() {
        // TODO: make bunny death sprite.
        return "./sprites/bunny.png";
    };

    /** 
     * Decrease the health of the Bunny by the provided amount and perform any necessary operations
     * based on the new health value.
     * 
     * @param {number} amount the amount by which to decrease the Bunny's health
     */
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            // if the Bunny is now dead, remove it from the game
            // replace this code with any death effects, state changes, etc.
            this.removeFromWorld = true;
        } else {
            // otherwise, make it run from the player
            const dirX = (this.pos.x < CHAD.pos.x) ? -1 : 1;
            this.setTargetX(this.pos.x + dirX * Bunny.SCALED_SIZE.x * Bunny.RUN_HOP_COUNT);
        }
    };

    /**
     * Set the target x-coordinate of the Bunny and update its state as needed.
     * 
     * @param {number} targetX the x-coordinate the Bunny should move towards
     */
    setTargetX(targetX) {
        this.targetX = targetX;
        this.facing = (targetX < this.pos.x) ? "left" : "right";
    }
    
    /** Change what the Bunny is doing and where it is. */
    update() {
        // WHAT SHOULD HIS CONDITIONS BE?
        // He's gonna wait 0.5s between hops (which take 0.5s).
        if (this.elapsedTime % 1 < 0.5) {
            this.action = "idle";
        } else {
            this.action = "hopping";
        }
        
        // If we've reached the target x-position, we want to move in the opposite direction.
        const scaledX = Bunny.SCALED_SIZE.x;
        if (Math.abs(this.targetX - this.pos.x) < scaledX && this.action === "idle") {
            this.facing = (this.facing === "left") ? "right" : "left";
            const dirX = (this.facing === "left") ? -1 : 1;
            this.targetX = this.pos.x + dirX * Bunny.DEFAULT_HOP_COUNT * scaledX;
        }

        this.elapsedTime += GAME.clockTick;

        // Increase y velocity to simulate gravity.
        this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick ** 2;

        // HOW SHOULD WE MOVE HIM BASED ON HIS CONDITIONS?
        const mult = (this.facing === "left") ? -1 : 1;
        let xVelocity = 0;
        if (this.action === "hopping") {
            xVelocity = mult * Bunny.SPEED * GAME.clockTick;
        }
        this.pos = Vector.add(this.pos, new Vector(xVelocity, this.yVelocity));
        
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.pos, Bunny.SCALED_SIZE);

        checkBlockCollisions(this);
    };

    /** Draw the Bunny on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), Bunny.SCALE);
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