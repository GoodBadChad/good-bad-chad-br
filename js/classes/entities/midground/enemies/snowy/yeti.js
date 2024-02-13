/**
 * Class that represents a Yeti.
 * 
 * @author Trae Claar
 */
class Yeti {
    /**
     * Constructor for a Yeti.
     * 
     * @param {Vector} pos the initial position of the Yeti
     */
    constructor(pos) {
        this.base = new EnemyBase(
            this, 
            pos, 
            Yeti.SCALED_SIZE, 
            Yeti.SPEED, 
            Yeti.MAX_HEALTH, 
            Yeti.ROAM_DISTANCE, 
            () => this.handleDeath(),
            EnemyBase.AGGRESSIVE_STANCE
        );

        this.animations = [];
        this.loadAnimations();

        this.lastAttack = 0;
        this.dealtDamage = false;
    };

    /** The size, in pixels, of the Yeti on its spritesheet. */
    static get SIZE() {
        return new Vector(64, 64);
    }

    /** The scale factor applied to the Yeti when drawing. */
    static get SCALE() {
        return 5;
    };

    /** The size, in pixels, of the Yeti on the canvas. */
    static get SCALED_SIZE() {
        return Vector.multiply(Yeti.SIZE, Yeti.SCALE);
    }

    /** The speed of the Yeti. */
    static get SPEED() {
        return Yeti.SCALE * 10;
    }

    /** The file path to the Yeti's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/yeti.png";
    };

    /** The maximum health of the Yeti. */
    static get MAX_HEALTH() {
        return 100;
    };

    /** The distance the Yeti will wander from its original position when roaming. */
    static get ROAM_DISTANCE() {
        return Yeti.SCALED_SIZE.x * 2;
    };

    /** The number of seconds between attacks. */
    static get ATTACK_COOLDOWN() {
        return 3;
    };

    /** The amount of damage a Yeti deals during an attack. */
    static get ATTACK_DAMAGE() {
        return 50;
    };

    /** Number of seconds after the start of the attack animation when damage should be dealt. */
    static get DAMAGE_DELAY() {
        return 0.9375;
    }

    /**
     * Perform any necessary operations when the Yeti dies.
     */
    handleDeath() {
        // if the enemy is now dead, remove it from the game
        // replace this code with any death effects, state changes, etc.
        this.removeFromWorld = true;
    }
    
    /** Update the Yeti. */
    update() {
        this.base.update();

        const secondsSinceLastAttack = Date.now() / 1000 - this.lastAttack;

        // if we've finished our current attack, change action to idle
        if (this.action === "attacking" 
            && this.animations[this.base.getFacing()]["attacking"].totalTime < secondsSinceLastAttack) {
                
            this.action = "idle";
        }

        // if Chad is close enough and we want to beat him up, react accordingly
        if (this.base.chadDistance() < Yeti.SCALED_SIZE.x / 2 && this.state === "pursue") {
            if (secondsSinceLastAttack > Yeti.ATTACK_COOLDOWN) {
                // if it's been long enough, start a new attack 
                this.animations[this.base.getFacing()]["attacking"].elapsedTime = 0;
                this.action = "attacking"
                this.lastAttack = Date.now() / 1000;
                this.dealtDamage = false;
            } else if (this.action === "attacking" 
                && secondsSinceLastAttack > Yeti.DAMAGE_DELAY && !this.dealtDamage) {
                // if we're at the proper point in our attack animation, deal damage

                CHAD.takeDamage(Yeti.ATTACK_DAMAGE);
                this.dealtDamage = true;
            }
        }
    };

    /** Draw the Yeti. */
    draw() {
        this.animations[this.base.getFacing()][this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), Yeti.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["right"]["idle"] = new Animator(
            Yeti.SPRITESHEET,
            new Vector(0, Yeti.SIZE.y),
            Yeti.SIZE,
            1, 1);
        this.animations["left"]["idle"] = new Animator(
            Yeti.SPRITESHEET,
            new Vector(0, 0),
            Yeti.SIZE,
            1, 1);
        
        // moving animations
        this.animations["right"]["moving"] = new Animator(
            Yeti.SPRITESHEET,
            new Vector(Yeti.SIZE.x * 7, Yeti.SIZE.y * 2),
            Yeti.SIZE,
            7, 1/6);
        this.animations["left"]["moving"] = new Animator(
            Yeti.SPRITESHEET,
            new Vector(0, Yeti.SIZE.y * 2),
            Yeti.SIZE,
            7, 1/6);

        // attacking animations
        this.animations["right"]["attacking"] = new Animator(
            Yeti.SPRITESHEET,
            new Vector(0, Yeti.SIZE.y),
            Yeti.SIZE,
            18, 1/16);
        this.animations["left"]["attacking"] = new Animator(
            Yeti.SPRITESHEET,
            new Vector(0, 0),
            Yeti.SIZE,
            18, 1/16);
        
    };
};