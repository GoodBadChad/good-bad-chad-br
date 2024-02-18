/**
 * Class which provides basic functionality for enemy entities, including movement,
 * taking damage, and block collisions.
 * 
 * @author Trae Claar
 */
class EnemyBase {
    /**
     * Constructor for an EnemyBase.
     * 
     * @param {Entity} enemy the enemy associated with this EnemyBase
     * @param {Vector} pos the initial position of the enemy
     * @param {number} size the size of the enemy
     * @param {number} speed the speed of the enemy
     * @param {number} health the initial health of the enemy
     * @param {number} maxRoamDistance the maximum distance the enemy will wander 
     *      from its initial position when roaming
     * @param {function} onDeath callback function invoked when the enemy dies
     * @param {string} stance the enemy's stance (use an EnemyBase member stance, 
     *      e.g. EnemyBase.AggressiveStance)
     * @param {number} reactionDistance the maximum distance that the enemy will 
     *      react to Chad according to its stance and state
     */
    constructor(enemy, pos, size, speed, health, maxRoamDistance, onDeath, stance, reactionDistance) {
        this.enemy = enemy;
        enemy.pos = pos;
        
        enemy.state = "roam";
        enemy.action = "idle";
        enemy.size = size;
        enemy.speed = speed; // *
        enemy.health = health; // *
        enemy.maxRoamDistance = maxRoamDistance; // *
        enemy.yVelocity = 0;

        enemy.boundingBox = new BoundingBox(pos, size);
        enemy.lastBoundingBox = this.enemy.boundingBox;

        this.maxHealth = health; 
        this.onDeath = onDeath;
        this.minRoamX = pos.x - maxRoamDistance;
        this.targetX = pos.x;
        this.stance = stance;
        this.reactionDistance = reactionDistance ?? Camera.SIZE.x / 2 - size.x;

        GAME.addEntity(new HealthBar(enemy, health, size.x));

        if (!enemy.takeDamage) {
            enemy.takeDamage = (amount) => this.takeDamage(amount);
        }
    }

    /** 
     * Aggressive enemy stance. Aggressive enemies will pursue Chad any time he
     * is within their maximum reaction distance. 
     */
    static get AGGRESSIVE_STANCE() {
        return "aggressive";
    }

    /** 
     * Defensive enemy stance. Defensive enemies will pursue/attack Chad only when
     * provoked.
     */
    static get DEFENSIVE_STANCE() {
        return "defensive";
    }

    /** Passive enemy stance. Passive enemies will run from Chad when attacked. */
    static get PASSIVE_STANCE() {
        return "passive";
    }

    /** 
     * Avoid enemy stance. Enemies with the avoid stance will run from Chad whenever
     * he is within their maximum reaction distance.
     */
    static get AVOID_STANCE() {
        return "avoid";
    }

    /** 
     * Decrease the health of the enemy by the provided amount and perform any necessary operations
     * based on the new health value. If the enemy's health is less than or equal to 0, its onDeath 
     * callback will be invoked. Otherwise, it will react according to its stance.
     * 
     * @param {number} amount the amount by which to decrease the enemy's health
     */
     takeDamage(amount) {
        this.enemy.health -= amount;
        if (this.enemy.health <= 0) {
            this.onDeath();
        } else {
            // otherwise, make it react
            switch (this.stance) {
                case EnemyBase.AGGRESSIVE_STANCE:
                case EnemyBase.DEFENSIVE_STANCE:
                    this.enemy.state = "pursue";
                    break;
                case EnemyBase.PASSIVE_STANCE:
                case EnemyBase.AVOID_STANCE:
                    this.flee();
            }
        }
    };

    /**
     * Set the target x-coordinate of the enemy.
     * 
     * @param {number} targetX the x-coordinate the enemy should move towards
     */
    setTargetX(targetX) {
        this.targetX = targetX;
    };

    /**
     * Get the direction in which the enemy is currently facing.
     * 
     * @returns {number} -1 for left and 1 for right
     */
    getDirection() {
        return this.targetX - this.enemy.pos.x > 0 ? 1 : -1;
    }

    /**
     * Makes the enemy run away from Chad. Also changes its stance to avoid.
     */
    flee() {
        this.setTargetX(this.enemy.pos.x + Math.sign(this.enemy.pos.x - CHAD.pos.x) * this.reactionDistance);
        this.stance = EnemyBase.AVOID_STANCE;
        this.enemy.state = "flee";
    }

    /**
     * The direction in which the enemy is facing as a string, for animation use.
     * 
     * @returns {string} "left" or "right"
     */
    getFacing() {
        return (this.getDirection() < 0) ? "left" : "right";
    }

    /**
     * Calculates the distance between Chad and the enemy, comparing their bottom left corners
     * in order to avoid having to account for character/enemy height.
     * 
     * @returns {number} the distance between the bottom left corners of Chad and the enemy
     */
    chadDistance() {
        return Vector.distance(Vector.add(CHAD.pos, new Vector(0, Chad.SCALED_SIZE.y)), 
            Vector.add(this.enemy.pos, new Vector(0, this.enemy.size.y)));
    }
    
    /**
     * Update the enemy. Updates its position, state variables, and handles block collision.
     */
    update() {
        if (this.enemy.health > 0) {
            let xVelocity = 0;
            // TODO: remove multiplication by GAME.clockTick once PHYSICS.GRAVITY_ACC is reduced
            this.enemy.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick;

            if (this.chadDistance() < this.reactionDistance) {
                // if Chad is within our reaction distance, react based on our stance.
                if (this.stance === EnemyBase.AGGRESSIVE_STANCE) {
                    this.enemy.state = "pursue";
                } else if (this.stance === EnemyBase.AVOID_STANCE) {
                    this.flee();
                }
            } else if (this.enemy.state != "roam") {
                // if we don't have anything to react to anymore, start roaming
                this.enemy.state = "roam";
                this.targetX = this.enemy.pos.x;
                this.minRoamX = this.enemy.pos.x - this.enemy.maxRoamDistance;
            }

            // if we're pursuing Chad, update the target position to Chad's position
            // also avoid changing direction in the middle of an attack animation
            if (this.enemy.state === "pursue" && this.enemy.action != "attacking") {
                this.setTargetX(CHAD.pos.x);
            }

            if (Math.abs(this.targetX - this.enemy.pos.x) < this.enemy.size.x / 2) {
                // if we've reached our target position and we're roaming, set a new target position
                if (this.enemy.state === "roam") {
                    this.setTargetX(this.minRoamX + Math.random() * 2 * this.enemy.maxRoamDistance);
                }
            } else {
                // if we haven't reached our target, set xVelocity in the target's direction
                xVelocity = this.getDirection() * this.enemy.speed;
            }

            // if xVelocity is not 0, set action to "move" (for animation)
            if (xVelocity) {
                this.enemy.action = "moving";
            } else if (this.enemy.action === "moving") {
                this.enemy.action = "idle";
            }

            // update position
            this.enemy.pos = Vector.add(this.enemy.pos,
                Vector.multiply(new Vector(xVelocity, this.enemy.yVelocity), GAME.clockTick));

            // Update bounding box and check collisions.
            this.enemy.lastBoundingBox = this.enemy.boundingBox;
            this.enemy.boundingBox = new BoundingBox(this.enemy.pos, this.enemy.size);
            checkBlockCollisions(this.enemy, this.enemy.size);
        } 
    }
}