/** 
 * A Snake can appear in the village <or the lava> dimension(s).
 * He is able to face right or left, slither, attack and die.
 * 
 * @author Devin Peevy
 * @author Trae Claar
 */
class Snake {
    /**
     * Constructor for a Snake.
     * 
     * @param {Vector} pos the position at which the Snake should start
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
        this.boundingBox = new BoundingBox(this.pos, Snake.SCALED_SIZE);
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        this.yVelocity = 0;
        this.health = Snake.MAX_HEALTH;
        this.targetX = this.pos.x;
        this.state = "idle";
        this.lastAttack = 0;

        GAME.addEntity(new HealthBar(this, Snake.MAX_HEALTH, Snake.SCALED_SIZE.x));
    };

    /** The size, in pixels, of the Snake ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(40, 13);
    }

    /** How much bigger should the Snake be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 3;
    };

    /** This will be the size of the Snake ON THE CANVAS. */
    static get SCALED_SIZE() {
        return Vector.multiply(Snake.SIZE, Snake.SCALE);
    }

    /** The speed of the Snake. */
    static get SPEED() {
        return Snake.SCALE * 30;
    }

    /** The filepath to the spritesheet of the Snake. */
    static get SPRITESHEET() {
        return "./sprites/snake.png";
    };

    /** The maximum health of the Snake. */
    static get MAX_HEALTH() {
        return 20;
    };

    /** The distance the Snake will "pace" back and forth. */
    static get PACE_DISTANCE() {
        return Snake.SCALED_SIZE.x * 2;
    };

    /** The number of seconds between attacks. */
    static get ATTACK_COOLDOWN() {
        return 1;
    };

    /** The amount of damage a Snake deals during an attack. */
    static get ATTACK_DAMAGE() {
        return 10;
    };

     /** 
     * Decrease the health of the Snake by the provided amount and perform any necessary operations
     * based on the new health value.
     * 
     * @param {number} amount the amount by which to decrease the Snake's health
     */
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            // if the Snake is now dead, remove it from the game
            // replace this code with any death effects, state changes, etc.
            this.removeFromWorld = true;
        } else {
            // otherwise, make it chase the player
            this.state = "pursue";
        }
    };

    /**
     * Set the target x-coordinate of the Snake and update its state as needed.
     * 
     * @param {number} targetX the x-coordinate the Snake should move towards
     */
    setTargetX(targetX) {
        this.targetX = targetX;
        this.facing = (targetX < this.pos.x) ? "left" : "right";
    };
    
    /** Change what the Snake is doing and where it is. */
    update() {
        // WHAT SHOULD HIS CONDITIONS BE?
        this.action = "slithering";

        // If in pursue state, update the target position.
        if (this.state === "pursue" || this.state === "attack") {
            this.setTargetX(CHAD.pos.x);
        }

        const scaledX = Snake.SCALED_SIZE.x;
        if (Math.abs(this.targetX - this.pos.x) < scaledX / 2) {
            // If we've reached the target x-position:

            if (this.state === "idle") {
                // idle state, switch directions
                this.facing = (this.facing === "left") ? "right" : "left";
                const dirX = (this.facing === "left") ? -1 : 1;
                this.targetX = this.pos.x + dirX * Snake.PACE_DISTANCE;
            } else {
                // pursue state, attack the player
                this.state = "attack";
                this.action = "idle";
                if (Date.now() - Snake.ATTACK_COOLDOWN * 1000 > this.lastAttack) {
                    this.lastAttack = Date.now();
                    CHAD.health -= Snake.ATTACK_DAMAGE;
                }
            }
        }

        // Increase y velocity to simulate gravity.
        this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick ** 2;

        // HOW SHOULD WE MOVE HIM BASED ON HIS CONDITIONS?
        const mult = (this.targetX < this.pos.x) ? -1 : 1;
        let xVelocity = 0;
        if (this.action === "slithering") {
            xVelocity = mult * Snake.SPEED * GAME.clockTick;
        }
        this.pos = Vector.add(this.pos, new Vector(xVelocity, this.yVelocity));
        
        // Update bounding box and check collisions.
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.pos, Snake.SCALED_SIZE);
        checkBlockCollisions(this);
    };

    /** Draw the Snake on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), Snake.SCALE);
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
        
        // SLITHERING ANIMATIONS
        // (it takes him 1s to slither)
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