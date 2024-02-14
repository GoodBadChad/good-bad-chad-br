/**
 * A class that represents Chad's sword.
 * 
 * @author Trae Claar
 * @author Nathan Hinthorne
 */
class Sword {
    /**
     * Constructor for a Sword which takes an initial type.
     * 
     * @param {number} type the type of the Sword (please use Sword.TYPE_1, .TYPE_2, etc.)
     * @throws {Error} Will throw an error if type is not a Sword member type.
     */
    constructor(type) {
        Sword.checkType(type);

        this.pos = CHAD.pos;
        this.isAttacking = false;
        this.hasHit = false;
        this.speed = 0;
        this.offsetX = 0;
        this.offsetDirX = 0;

        this.setType(type);

        this.loadAnimations();
    };

    /** The size of the Sword on the spritesheet. */
    static get SIZE() {
        return new Vector(40, 40);
    };

    /** The scale factor applied to the Sword when drawing. */
    static get SCALE() {
        return 3;
    };

    /** The size of the Sword after the scale factor is applied. */
    static get SCALED_SIZE() {
        return Vector.multiply(Sword.SIZE, Sword.SCALE);
    };

    /** The maximum distance the Sword can be from Chad while jabbing before it begins retracting. */
    static get MAX_OFFSET() {
        return 30;
    }

    /** The offset from Chad's y-position applied to the Sword's y-position. */
    static get Y_OFFSET() {
        return 10;
    }

    /** The spritesheet containing all the Sword types. */
    static get SPRITESHEET() {
        return "./sprites/swords.png";
    };

    /** How fast the Sword moves while jabbing. */
    static get JAB_SPEED() {
        return 300;
    };

    /** How fast the Sword moves while retracting. */
    static get RETRACT_SPEED() {
        return 150;
    };

    /** Sword type 1 (rename later). */
    static get TYPE_1() {
        return 0;
    }

    /** Sword type 2 (rename later). */
    static get TYPE_2() {
        return 1;
    }

    /** Sword type 3 (rename later). */
    static get TYPE_3() {
        return 2;
    }

    /** Sword type 4 (rename later). */
    static get TYPE_4() {
        return 3;
    }

    /** Sword type 5 (rename later). */
    static get TYPE_5() {
        return 4;
    }

    /** The property table for Sword types. */
    static get PROPERTY_TABLE() {
        return {
            [Sword.TYPE_1]: {
                DAMAGE: 5
            },
            [Sword.TYPE_2]: {
                DAMAGE: 10
            },
            [Sword.TYPE_3]: {
                DAMAGE: 20
            },
            [Sword.TYPE_4]: {
                DAMAGE: 40
            },
            [Sword.TYPE_5]: {
                DAMAGE: 80
            }
        };
    };

    /**
     * Helper method that checks the validity of the provided Sword type.
     * 
     * @param {number} type the type value to check
     * @throws {Error} Will throw an error if type is invalid.
     */
    static checkType(type) {
        if (typeof type !== "number" || type % 1 !== 0 || type < 0 || type > 4) {
            throw new Error("Invalid Sword type: please use a Sword member type (e.g. Sword.TYPE_1).");
        }
    }

    /**
     * Helper method. Gets the value of a property for the current Sword type.
     * 
     * @param {string} propertyName the name of the property
     * @returns the value associated with propertyName for the Sword type
     */
    getProperty(propertyName) {
        return Sword.PROPERTY_TABLE[this.type][propertyName];
    };

    /**
     * Set the sword to another type.
     * 
     * @param {number} type the type of sword we're switching to
     */
    setType(type) {
        this.type = type;
        this.loadAnimations();
    }

    /** Update the Sword. */
    update() {
        if (GAME.user.jabbing && !this.isAttacking) {
            this.isAttacking = true;
            this.offsetDirX = 1;
            this.speed = Sword.JAB_SPEED;
            this.hasHit = false;
            //TODO: play jab sfx
        } else if (this.offsetX >= Sword.MAX_OFFSET) {
            this.offsetDirX *= -1;
            this.speed = Sword.RETRACT_SPEED;
        } else if (this.offsetX <= 0) {
            this.isAttacking = false;
        }

        const padding = (CHAD.facing === "left") ? -Sword.SCALED_SIZE.x : Chad.SCALED_SIZE.x;
        const basePos = Vector.add(CHAD.pos, new Vector(padding, Sword.Y_OFFSET));

        if (this.isAttacking) {
            this.offsetX = Math.min(this.offsetX + this.offsetDirX * this.speed * GAME.clockTick, Sword.MAX_OFFSET);

            // attack only once per animation cycle
            if (!this.hasHit) {
                const bb = new BoundingBox(basePos, new Vector(Sword.SCALED_SIZE.x, Chad.SCALED_SIZE.y));
                GAME.entities.midground.forEach((entity) => {
                    if (this != entity && entity.boundingBox && entity.takeDamage) {
                        if (bb.collide(entity.boundingBox)) {
                            entity.takeDamage(this.getProperty("DAMAGE"));
                            this.hasHit = true;
                        }
                    }
                });
            }
        }

        const chadDirX = (CHAD.facing === "left") ? -1 : 1;
        this.pos = Vector.add(basePos, new Vector(this.offsetX * chadDirX, 0));
    };

    /** Draw the Sword. */
    draw() {
        //    if (this.isAttacking) {
        //         this.animations[CHAD.facing].drawFrame(Vector.worldToCanvasSpace(this.pos), Sword.SCALE);
        //    }
    };

    /** Load the Sword's animations. */
    loadAnimations() {
        this.animations = [];
        this.animations["left"] = new Animator(Sword.SPRITESHEET,
            new Vector(0, this.type * Sword.SIZE.y), Sword.SIZE, 1, 1);
        this.animations["right"] = new Animator(Sword.SPRITESHEET,
            new Vector(Sword.SIZE.x, this.type * Sword.SIZE.y), Sword.SIZE, 1, 1);
    }
};