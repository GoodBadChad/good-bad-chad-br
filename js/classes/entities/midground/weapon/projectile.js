/**
 * A class which represents a projectile fired from the player's slingshot.
 * 
 * @author Trae Claar
 */
class Projectile {
    
    /**
     * Constructor for a Projectile which takes a type, origin position, and optionally a target position.
     * 
     * @param {number} type the Projectile type (please use Projectile.WOOD, Projectile.BOMB, etc.)
     * @param {number} x the x position at which the projectile should begin
     * @param {number} y the y position at which the projectile should begin
     * @param {number} targetX the x-coordinate of the target position
     * @param {number} targetY the y-coordinate of the target position
     */
    constructor(type, x, y, targetX, targetY) {
        this.type = type;
        this.x = x;
        this.y = y;

        // set properties
        this.action = this.getProperty("ACTION");
        this.speed = this.getProperty("SPEED");
        this.weight = this.getProperty("WEIGHT");
        this.size = this.getProperty("SIZE");

        this.yVelocity = 0;
        this.animator = new Animator(Projectile.SPRITESHEET, 0, type * this.size, this.size, this.size, 1, 1);
        this.updateBoundingBox();

        if (targetX) this.setTarget(targetX, targetY);
    }

    /** The Projectile spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/ammo.png";
    }

    /** The scale at which a Projectile is drawn. */
    static get SCALE() {
        return 3;
    }

    /** The Bomb Projectile type. */
    static get BOMB() {
        return 0;
    }

    /** The Wood Projectile type. */
    static get WOOD() {
        return 1;
    }

    /** The Stone Projectile type. */
    static get STONE() {
        return 2
    }

    /** The Metal Projectile type. */
    static get METAL() {
        return 3
    }

    /** The Laser Projectile type. */
    static get LASER() {
        return 6
    }

    /** The property table for Projectile types. */
    static get PROPERTY_TABLE() {
        return {
            [Projectile.BOMB]: {
                ACTION: () => {
                    console.log("boom");
                },
                SPEED: 30,
                WEIGHT: 0.1,
                SIZE: 13
            },
            [Projectile.WOOD]: {
                ACTION: () => {
                    console.log("wood");
                },
                SPEED: 15,
                WEIGHT: 0.001,
                SIZE: 4
            },
            [Projectile.STONE]: {
                ACTION: () => {
                    console.log("stone");
                },
                SPEED: 14,
                WEIGHT: 0.005,
                SIZE: 4
            },
            [Projectile.METAL]: {
                ACTION: () => {
                    console.log("metal");
                },
                SPEED: 12,
                WEIGHT: 0.07,
                SIZE: 4
            },
            [Projectile.LASER]: {
                ACTION: () => {
                    console.log("laser");
                },
                SPEED: 20,
                WEIGHT: 0,
                SIZE: 13
            }
        };
    }

    /** 
     * Set the target position of the Projectile.
     * 
     * @param {number} x the x-coordinate of the target position
     * @param {number} y the y-coordinate of the target position
     */
    setTarget(x, y) {
        let deltaX = x - this.x;
        let deltaY = y - this.y;
        let magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        this.dirX = deltaX / magnitude;
        this.dirY = deltaY / magnitude;
    }

    /**
     * Helper method. Gets the value of a property for the current Projectile type.
     * 
     * @param {string} propertyName the name of the property
     * @returns the value associated with propertyName for the Projectile type
     */
    getProperty(propertyName) {
        return Projectile.PROPERTY_TABLE[this.type][propertyName];
    }

    /**
     * Indicates whether or not the Projectile's target is set. Note that the Projectile will not 
     * move or check for collision if its target is not set.
     * 
     * @returns true if the Projectile's target is set, false otherwise
     */
    isTargetSet() {
        return this.dirX != null
    }

    /**
     * Update the BoundingBox of the Projectile based on the latter's current position.
     */
    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.x, this.y, this.size * Projectile.SCALE, this.size * Projectile.SCALE);
    }

    /**
     * Update method for a Projectile.
     */
    update() {
        if (this.isTargetSet()) {
            this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick * this.weight;
            this.x += this.dirX * this.speed;
            this.y += this.dirY * this.speed + this.yVelocity;

            this.updateBoundingBox();
            GAME.entities.forEach((entity) => {
                if (this != entity && entity.boundingBox) {
                    if (this.boundingBox.collide(entity.boundingBox)) {
                        this.action();
                        this.removeFromWorld = true;
                    }
                }
            });
        }
    };

    /**
     * Draw method for a Projectile.
     */
    draw() {
        this.animator.drawFrame(this.x - CAMERA.x, this.y - CAMERA.y, Projectile.SCALE);
    }
};