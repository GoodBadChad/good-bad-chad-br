/**
 * A class which represents a projectile fired from the player's slingshot.
 * 
 * @author Trae Claar
 * @author Nathan Hinthorne
 */
class Projectile {
    
    /**
     * Constructor for a Projectile which takes a type, origin position, and optionally a target position.
     * 
     * @param {number} type the Projectile type (please use Projectile.WOOD, Projectile.BOMB, etc.)
     * @param {Vector} pos the position at which the projectile should begin
     * @param {Vector} target the target position
     */
    constructor(type, pos, target) {
        this.type = type;
        this.pos = pos;

        // set properties
        this.action = this.getProperty("ACTION");
        this.speed = this.getProperty("SPEED");
        this.weight = this.getProperty("WEIGHT");
        this.size = this.getProperty("SIZE");

        this.yVelocity = 0;
        this.animator = new Animator(Projectile.SPRITESHEET, 
            new Vector(0, type * this.size.y), this.size, 1, 1);
        this.updateBoundingBox();

        if (target) this.setTarget(target);
    };

    /** The Projectile spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/ammo.png";
    };

    /** The scale at which a Projectile is drawn. */
    static get SCALE() {
        return 3;
    };

    /** The Bomb Projectile type. */
    static get BOMB() {
        return 0;
    };

    /** The Wood Projectile type. */
    static get WOOD() {
        return 1;
    };

    /** The Stone Projectile type. */
    static get STONE() {
        return 2
    };

    /** The Metal Projectile type. */
    static get METAL() {
        return 3
    };

    /** The Laser Projectile type. */
    static get LASER() {
        return 6
    };

    /** The property table for Projectile types. */
    static get PROPERTY_TABLE() {
        return {
            [Projectile.BOMB]: {
                ACTION: () => {
                    console.log("boom");
                },
                SPEED: 15,
                WEIGHT: 0.05,
                SIZE: new Vector(13, 13)
            },
            [Projectile.WOOD]: {
                ACTION: () => {
                    console.log("wood");
                },
                SPEED: 15,
                WEIGHT: 0.001,
                SIZE: new Vector(4, 4)
            },
            [Projectile.STONE]: {
                ACTION: () => {
                    console.log("stone");
                },
                SPEED: 14,
                WEIGHT: 0.005,
                SIZE: new Vector(4, 4)
            },
            [Projectile.METAL]: {
                ACTION: () => {
                    console.log("metal");
                },
                SPEED: 12,
                WEIGHT: 0.07,
                SIZE: new Vector(4, 4)
            },
            [Projectile.LASER]: {
                ACTION: () => {
                    console.log("laser");
                },
                SPEED: 20,
                WEIGHT: 0,
                SIZE: new Vector(13, 13)
            }
        };
    };

    /** 
     * Set the target position of the Projectile.
     * 
     * @param {Vector} target the target position
     */
    setTarget(target) {
        this.dir = Vector.direction(this.pos, target);
    };

    /**
     * Helper method. Gets the value of a property for the current Projectile type.
     * 
     * @param {string} propertyName the name of the property
     * @returns the value associated with propertyName for the Projectile type
     */
    getProperty(propertyName) {
        return Projectile.PROPERTY_TABLE[this.type][propertyName];
    };

    /**
     * Indicates whether or not the Projectile's target is set. Note that the Projectile will not 
     * move or check for collision if its target is not set.
     * 
     * @returns true if the Projectile's target is set, false otherwise
     */
    isTargetSet() {
        return this.dir != null
    };

    /**
     * Update the BoundingBox of the Projectile based on the latter's current position.
     */
    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.pos, Vector.multiply(this.size, Projectile.SCALE));
    };

    /**
     * Update method for a Projectile.
     */
    update() {
        if (this.isTargetSet()) {
            this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick * this.weight;
          
            if (this.yVelocity > PHYSICS.TERMINAL_VELOCITY) {
                this.yVelocity = PHYSICS.TERMINAL_VELOCITY;
            } 
          
            const posChange = Vector.multiply(this.dir, this.speed);
            this.pos = Vector.add(this.pos, new Vector(posChange.x, posChange.y + this.yVelocity))

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
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), Projectile.SCALE);
    };
};