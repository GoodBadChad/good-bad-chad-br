/**
 * A class which represents a projectile fired by an entity.
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
     * @param {Vector} [target] (OPTIONAL) the target position
     * @throws {Error} Will throw an error if type is not a Projectile member type.
     */
    constructor(type, pos, target) {
        if (typeof type !== "number" || type % 1 !== 0 || type < 0 || type > 5) {
            throw new Error("Invalid Projectile type: please use a Projectile member type (e.g. Projectile.WOOD).");
        }

        this.type = type;
        this.pos = pos;

        // set properties
        this.action = this.getProperty("ACTION");
        this.speed = this.getProperty("SPEED");
        this.weight = this.getProperty("WEIGHT");
        this.size = this.getProperty("SIZE");

        this.yVelocity = 0;
        this.animator = new Animator(Projectile.SPRITESHEET, 
            new Vector(0, type * Projectile.SPRITESHEET_ENTRY_HEIGHT), this.size, 1, 1);
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

    /** The height (in pixels) of the space allotted to each Projectile type on the spritesheet. */
    static get SPRITESHEET_ENTRY_HEIGHT() {
        return 13;
    }

    /** The Bomb Projectile type. */
    static get BOMB() {
        return 2;
    };

    /** The Wood Projectile type. */
    static get WOOD() {
        return 1;
    };

    /** The Stone Projectile type. */
    static get STONE() {
        return 0;
    };

    /** The Metal Projectile type. */
    static get METAL() {
        return 3;
    };

    /** The Laser Projectile type. */
    static get LASER() {
        return 5;
    };

    /** The property table for Projectile types. */
    static get PROPERTY_TABLE() {
        return {
            [Projectile.BOMB]: {
                ACTION: (targetEntity, projectile) => {

                    // check for collisions with blocks
                    GAME.addEntity(new ParticleEffect(projectile.pos, ParticleEffect.SMALL_EXPLOSION));
                    ASSET_MGR.playSFX(SFX.EXPLOSION_SMALL.path, SFX.EXPLOSION_SMALL.volume);
                    projectile.removeFromWorld = true;
                    if (targetEntity.takeDamage) {
                        targetEntity.takeDamage(10);
                    }
                },
                SPEED: 15,
                WEIGHT: 0.05,
                SIZE: new Vector(13, 13)
            },
            [Projectile.WOOD]: {
                ACTION: () => {
                    console.log("wood");
                    ASSET_MGR.playSFX(SFX.RICOCHET1.path, SFX.RICOCHET1.volume);
                    if (targetEntity.takeDamage) {
                        targetEntity.takeDamage(5);
                    }
                },
                SPEED: 15,
                WEIGHT: 0.001,
                SIZE: new Vector(4, 4)
            },
            [Projectile.STONE]: {
                ACTION: (targetEntity) => {
                    ASSET_MGR.playSFX(SFX.RICOCHET2.path, SFX.RICOCHET2.volume);
                    if (targetEntity.takeDamage) {
                        targetEntity.takeDamage(5);
                    }
                },
                SPEED: 14,
                WEIGHT: 0.005,
                SIZE: new Vector(4, 4)
            },
            [Projectile.METAL]: {
                ACTION: () => {
                    ASSET_MGR.playSFX(SFX.RICOCHET3.path, SFX.RICOCHET3.volume);
                    console.log("metal");
                    if (targetEntity.takeDamage) {
                        targetEntity.takeDamage(5);
                    }
                },
                SPEED: 12,
                WEIGHT: 0.07,
                SIZE: new Vector(4, 4)
            },
            [Projectile.LASER]: {
                ACTION: () => {
                    console.log("laser");
                    if (targetEntity.takeDamage) {
                        targetEntity.takeDamage(5);
                    }
                },
                SPEED: 20,
                WEIGHT: 0,
                SIZE: new Vector(5, 5)
            },
            [Projectile.ANTIGRAVITY]: {
                ACTION: () => {
                    console.log("anti-gravity");

                    // check what entity it collides with
                        // if enemy, damage it and destroy projectile
                        // if block, bounce off and create new projectile in proper direction
                },
                SPEED: 20,
                WEIGHT: 0,
                SIZE: new Vector(5, 5)
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
            GAME.entities.midground.forEach((entity) => {
                if (this != entity && entity.boundingBox && !(entity instanceof FoodDrop)) {
                    if (this.boundingBox.collide(entity.boundingBox)) {
                        this.action(entity, this);

                        

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