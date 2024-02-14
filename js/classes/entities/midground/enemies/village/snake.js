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
        this.base = new EnemyBase(
            this, 
            pos, 
            Snake.SCALED_SIZE, 
            Snake.SPEED, 
            Snake.MAX_HEALTH, 
            Snake.PACE_DISTANCE, 
            () => this.handleDeath(),
            EnemyBase.DEFENSIVE_STANCE
        );

        /** An associative array of the animations for this Snake. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();

        this.lastAttack = 0;
    };

    /** The size, in pixels, of the Snake ON THE SPRITESHEET. */
    static get SIZE() {
        return new Vector(40, 13);
    }

    /** How much bigger should the Snake be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
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
     * Perform any necessary operations when the Snake dies.
     */
    handleDeath() {
        // if the enemy is now dead, remove it from the game
        // TODO: replace this code with any death effects, state changes, etc.
        this.removeFromWorld = true;
    }
    
    /** Change what the Snake is doing and where it is. */
    update() {
        this.base.update();

        if (this.base.chadDistance() < Snake.SCALED_SIZE.x / 2
            && Date.now() - Snake.ATTACK_COOLDOWN * 1000 > this.lastAttack) {

            this.state = "pursue";
            this.lastAttack = Date.now();
            CHAD.takeDamage(Snake.ATTACK_DAMAGE);
        }
    };

    /** Draw the Snake on the canvas. */
    draw() {
        this.animations[this.base.getFacing()][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), Snake.SCALE);
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
        this.animations["right"]["moving"] = new Animator(
            Snake.SPRITESHEET,
            new Vector(0, 0),
            Snake.SIZE,
            9, 1/9);
        this.animations["left"]["moving"] = new Animator(
            Snake.SPRITESHEET,
            new Vector(0, Snake.SIZE.y),
            Snake.SIZE,
            9, 1/9);
        
    };
};