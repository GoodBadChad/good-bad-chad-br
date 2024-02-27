/**
 * A class that creates a particle effect at a given position.
 * Can be used for explosions, magic, dust, etc.
 * 
 * @author Nathan Hinthorne
 */
class ParticleEffect {

    /**
     * Creates a bunch of ellipses at a position, with a certain amount, and a certain lifetime.
     * @param {Vector} center - The center position of the particle effect.
     * @param {Object} options - The options for the particle effect (use a preset here).
     * @param {number} options.spread - The spread of the particles (How far they can go from the center). 
     * @param {number} options.size - The size each particle will be.
     * @param {number} options.amount - The amount of particles.
     * @param {number} options.lifetime - The lifetime of the particles in seconds.
     * @param {string} options.color - The color of the particles.
     * @param {number} options.opacity - The opacity of the particles.
     * @param {string} options.behavior - The behavior of the particles ()
     */
    constructor(center, {spread, size, amount, lifetime, color, opacity, behavior}) {
        this.particles = [];
        this.lifeTime = lifetime;
        this.color = color;
        this.opacity = opacity;
        this.behavior = behavior;
        this.center = center;
        this.size = size;
        this.removeFromWorld = false;

        for (let i = 0; i < amount; i++) {
            const newPos = new Vector(center.x + Math.random() * spread - spread / 2,
                                        center.y + Math.random() * spread - spread / 2);

            this.particles.push({pos: newPos, size: size});
        }
    }


    /**
     * Updates the particles until their lifetime is up.
     */
    update() {

        for (let i = 0; i < this.particles.length; i++) {
            const currParticle = this.particles[i];

            // shrink the particle
            const shrinkAmount = this.size / (this.lifeTime / GAME.clockTick);
            if (currParticle.size - shrinkAmount > 0.01) {
                currParticle.size -= shrinkAmount;
            } else {
                this.removeFromWorld = true; // once one particle is too small, remove the whole effect
            }

            // apply the behavior
            if (this.behavior == ParticleEffect.EXPAND) {
                const speed = 3;
                const displacement = Vector.direction(this.center, currParticle.pos);
                currParticle.pos = Vector.add(currParticle.pos, Vector.multiply(displacement, speed));

            } else if (this.behavior == ParticleEffect.CONTRACT) {
                const speed = 1;
                const displacement = Vector.direction(this.center, currParticle.pos);
                currParticle.pos = Vector.subtract(currParticle.pos, Vector.multiply(displacement, speed));

            } else if (this.behavior == ParticleEffect.RISE) {
                currParticle.pos.y -= 1;

            } else if (this.behavior == ParticleEffect.FALL) {
                currParticle.pos.y += 1;

            } else if (this.behavior == ParticleEffect.WIGGLE) {
                currParticle.pos.x += Math.random() * 2 - 1;
                currParticle.pos.y += Math.random() * 2 - 1;
            } else if (this.behavior == ParticleEffect.EXPAND_UP) {
                const speed = 1.5;
                const displacement = Vector.direction(this.center, currParticle.pos);
                // freeze any downward movement
                if (displacement.y > 0) {
                    displacement.y = 0;
                }
                currParticle.pos = Vector.add(currParticle.pos, Vector.multiply(displacement, speed));
            } else if (this.behavior == ParticleEffect.SLOW_EXPAND) {
                const speed = 1.5;
                const displacement = Vector.direction(this.center, currParticle.pos);
                currParticle.pos = Vector.add(currParticle.pos, Vector.multiply(displacement, speed));
            }

            // if FREEZE, do nothing
        }
    }

    /**
     * Draws the particles on the canvas.
     */
    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            CTX.beginPath();
            const canvasPos = Vector.worldToCanvasSpace(this.particles[i].pos);
            CTX.ellipse(canvasPos.x, canvasPos.y, 
                this.particles[i].size, this.particles[i].size, 0, 0, Math.PI * 2);
            CTX.fillStyle = this.color;

            // make the particles slightly transparent
            CTX.globalAlpha = this.opacity;
            CTX.fill();
            CTX.globalAlpha = 1;
        }
    }

    // BEHAVIORS

    /**
     * A behavior for particles that freeze in place.
     */
    static get FREEZE() {
        return 0;
    }

    /**
     * A behavior for particles that expands from the center.
     */
    static get EXPAND() {
        return 1;
    }

    /**
     * A behavior for particles that contracts to the center.
     * (Note: this is not the same as EXPAND in reverse.)
     */
    static get CONTRACT() {
        return 2;
    }

    /**
     * A behavior for particles that rises from the ground.
     */
    static get RISE() {
        return 3;
    }

    /**
     * A behavior for particles that fall to the ground.
     */
    static get FALL() {
        return 4;
    }

    /**
     * A behavior for particles that wiggles in place.
     */
    static get WIGGLE() {
        return 5;
    }

    /**
     * A behavior for particles that expand upwards.
    */
    static get EXPAND_UP() {
        return 6;
    }


    static get SLOW_EXPAND() {
        return 7;
    }





    // PRESET PARTICLE EFFECTS

    /**
     * A "preset" particle effect for dust being kicked up.
     */
    static get LITTLE_DUST() {
        return {
            spread: 30,
            size: 2,
            amount: 1,
            lifetime: 0.3,
            color: COLORS.LIGHT_BROWN,
            opacity: 0.7,
            behavior: ParticleEffect.FREEZE
        };
    }

    static get BIG_DUST() {
        return {
            spread: 50,
            size: 2,
            amount: 6,
            lifetime: 0.5,
            color: COLORS.BROWN,
            opacity: 0.7,
            behavior: ParticleEffect.RISE
        };
    }


    /**
     * A "preset" particle effect for dirt spraying.
     */
    static get DIRT_SPRAY() {
        return {
            spread: 30,
            size: 3,
            amount: 5,
            lifetime: 1,
            color: COLORS.BROWN,
            opacity: 0.9,
            behavior: ParticleEffect.RISE
        };
    }

    /**
     * A "preset" particle effect for snow spraying.
     */
    static get SNOW_SPRAY() {
        return {
            spread: 30,
            size: 3,
            amount: 7,
            lifetime: 1,
            color: COLORS.WHITE,
            opacity: 0.9,
            behavior: ParticleEffect.EXPAND
        };
    }

    /**
     * A "preset" particle effect for snow impacting.
    */
    static get SNOW_SPLAT() {
        return {
            spread: 70,
            size: 4,
            amount: 10,
            lifetime: 0.3,
            color: COLORS.WHITE,
            opacity: 0.9,
            behavior: ParticleEffect.EXPAND_UP
        };
    }

    static get SLIME_SPLAT() {
        return {
            spread: 50,
            size: 4,
            amount: 10,
            lifetime: 0.3,
            color: COLORS.LIGHT_GREEN,
            opacity: 0.9,
            behavior: ParticleEffect.EXPAND_UP
        };
    }

    /**
     * A "preset" particle effect for wind blowing.
     */
    static get WIND() {
        return {
            spread: 30,
            size: 4,
            amount: 3,
            lifetime: 0.5,
            color: COLORS.WHITE,
            opacity: 0.2,
            behavior: ParticleEffect.WIGGLE
        };
    }

    static get CLOUD() {
        return {
            spread: 20,
            size: 20,
            amount: 2,
            lifetime: 0.3,
            color: COLORS.WHITE,
            opacity: 0.3,
            behavior: ParticleEffect.RISE
        };
    }

    /**
     * A "preset" particle effect for a small explosion (bomb, etc.)
     */
    static get SMALL_EXPLOSION() {
        return {
            spread: 80,
            size: 10,
            amount: 15,
            lifetime: 0.5,
            color: COLORS.ORANGE,
            opacity: 1.0,
            behavior: ParticleEffect.EXPAND
        };
    }

    /**
     * A "preset" particle effect for collecting food.
     */
    static get FOOD_PICKUP() {
        return {
            spread: 80,
            size: 4,
            amount: 20,
            lifetime: 0.8,
            color: COLORS.YELLOW,
            opacity: 0.8,
            behavior: ParticleEffect.RISE
        };
    }

    static get GOLD_SPARKLE() {
        return {
            spread: 80,
            size: 4,
            amount: 5,
            lifetime: 0.3,
            color: COLORS.GOLD,
            opacity: 0.7,
            behavior: ParticleEffect.SLOW_EXPAND
        };
    }

    static get RED_SPARKLE() {
        return {
            spread: 80,
            size: 4,
            amount: 5,
            lifetime: 0.3,
            color: COLORS.RED,
            opacity: 0.7,
            behavior: ParticleEffect.SLOW_EXPAND
        };
    }

    static get GREEN_SPARKLE() {
        return {
            spread: 80,
            size: 4,
            amount: 5,
            lifetime: 0.3,
            color: COLORS.GREEN,
            opacity: 0.7,
            behavior: ParticleEffect.SLOW_EXPAND
        };
    }

    static get MAGIC_PURPLE() {
        return {
            spread: 80,
            size: 4,
            amount: 10,
            lifetime: 0.3,
            color: COLORS.PURPLE,
            opacity: 0.7,
            behavior: ParticleEffect.EXPAND
        };
    }

    static get MAGIC_YELLOW() {
        return {
            spread: 80,
            size: 4,
            amount: 10,
            lifetime: 0.3,
            color: COLORS.YELLOW,
            opacity: 0.7,
            behavior: ParticleEffect.EXPAND
        };
    }
}