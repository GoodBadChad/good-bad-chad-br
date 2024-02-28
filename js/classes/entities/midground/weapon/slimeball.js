/**
 * A Slimeball is a type of projectile that sticks to blocks.
 * 
 * @author Nathan Hinthorne
 */
class Slimeball {
    /**
     * @param {Vector} startPos The starting position of the Slimeball.
     * @param {Vector} targetPos The target position of the Slimeball.
     */
    constructor(startPos, targetPos) {
        this.base = new ProjectileBase(
            this,
            startPos,
            targetPos,
            Slimeball.SCALED_SIZE,
            Slimeball.INITIAL_SPEED,
            Slimeball.WEIGHT,
            (block) => this.onBlockCollision(block),
            (enemy) => this.onEnemyCollision(enemy)
        );

        this.animations = [];
        this.loadAnimations();

        this.aliveTimer = 0;
        this.action = "firing";
    }

    /** The size, in pixels, of the Slimeball on its spritesheet. */
    static get SIZE() {
        return new Vector(32, 32);
    }

    /** The scale factor applied to the Slimeball when drawing. */
    static get SCALE() {
        return 1.4;
    }

    /** The size, in pixels, of the Slimeball on the canvas. */
    static get SCALED_SIZE() {
        return Vector.multiply(Slimeball.SIZE, Slimeball.SCALE);
    }

    /** The speed of the Slimeball projectile as flies through the air */
    static get INITIAL_SPEED() {
        return 18;
    }

    /** The weight of the Slimeball. */
    static get WEIGHT() {
        return 0.04;
    }

    /** The file path to the Slimeball's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/projectile_slimeball.png";
    }

    static get ALIVE_TIME() {
        return 2;
    }

    static get SLOW_DURATION() {
        return 5;
    }

    static get SLOW_AMOUNT() {
        return 0.3;
    }

    static get DAMAGE() {
        return 5;
    }

    /** Called when the slimeball collides with a block. */
    onBlockCollision(block) {
        // checkBlockCollisions() is NOT stopping the slimeball's movement, but rather resetting its yVelocity to 0.
        // This produces a slight bounce effect, but only when the slimeball was launched upward and on its way down, NOT when Chad is aiming downward.
        const collisions = checkBlockCollisions(this, Slimeball.SCALED_SIZE);
        this.speed = 0; // reduce speed after each bounce

        if (!this.hasHit) {
            ASSET_MGR.playSFX(SFX.SLIME_SPLAT.path, SFX.SLIME_SPLAT.volume);
            
            // release a particle effect
            const center = Vector.add(this.pos, Vector.divide(Slimeball.SCALED_SIZE, 2));
            GAME.addEntity(new ParticleEffect(center, ParticleEffect.SLIME_SPLAT));
            
            this.hasHit = true;
            this.action = "landed";
        }
    }

    /** Called when the slimeball collides with an enemy. */
    onEnemyCollision(enemy) {
        if (!this.hasHit) {
            ASSET_MGR.playSFX(SFX.SLIME_SPLAT.path, SFX.SLIME_SPLAT.volume);
            enemy.takeDamage(Slimeball.DAMAGE);

            enemy.speed *= Slimeball.SLOW_AMOUNT; // slow down the enemy

            setTimeout(() => { // reverse the slow effect after a set duration
                enemy.speed = enemy.baseSpeed;
            }, Slimeball.SLOW_DURATION * 1000);
            
            this.hasHit = true;
        }

        this.removeFromWorld = true;
    }

    loadAnimations() {
        this.animations["firing"] = new Animator(Slimeball.SPRITESHEET, new Vector(0, 0), Slimeball.SIZE, 5, 0.1); // idle, moving through air
        this.animations["landed"] = new Animator(Slimeball.SPRITESHEET, new Vector(Slimeball.SIZE.x*6, 0), Slimeball.SIZE, 1, 0.5); // landing, squishing
    }

    update() {
        this.base.update();

        if (this.hasHit) {
            this.aliveTimer += GAME.clockTick;
            if (this.aliveTimer >= Slimeball.ALIVE_TIME) {
                this.removeFromWorld = true;
            }
        }

        if (this.action == "firing" && GAME.gameTime % 0.1 < 0.01) {
            // release particle trail
            const center = Vector.add(this.pos, Vector.divide(Slimeball.SCALED_SIZE, 2));
            GAME.addEntity(new ParticleEffect(center, ParticleEffect.SLIME_TRAIL));
        }
    }

    draw() {
        this.animations[this.action].drawFrame(Vector.worldToCanvasSpace(this.pos), Slimeball.SCALE);
    }
}