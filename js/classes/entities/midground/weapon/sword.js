/**
 * A class that represents Chad's sword. Because the sword sprite is a part of 
 * Chad's attack animation, the Sword does not draw itself. Instead, this class
 * is responsible for (1) waiting for the user to initiate a Sword attack,  
 * (2) dealing damage, and (3) drawing its bounding box in debug mode.
 * 
 * @author Trae Claar
 * @author Nathan Hinthorne
 */
class Sword {
    /**
     * Constructor for a Sword which takes an initial type.
     */
    constructor() {
        this.hasHit = false;
        this.lastAttack = 0;
    };

    /** The size of the Sword in the game world before scaling. */
    static get SIZE() {
        return new Vector(40, Chad.BOUNDING_BOX_SIZE.y);
    };

    /** The spritesheet containing all the Sword types. */
    static get SPRITESHEET() {
        // TODO: determine if this property still belongs here. The HUD still uses
        // it, but it is no longer used within this class.
        return "./sprites/swords.png";
    };

    /** The amount of damage the Sword deals during an attack. */
    static get DAMAGE() {
        return 5;
    }

    /** The duration of an attack, in seconds. */
    static get DURATION() {
        return 2 / 5;
    }

    /** 
     * Whether or not an attack is ongoing. 
     * 
     * @returns {boolean} true if a Sword attack is underway, false otherwise
     */
    isSlicing() {
        return (Date.now() - this.lastAttack) / 1000 < Sword.DURATION;
    }

    /**
     * Finds the position of the Sword's bounding box based on Chad's current position, 
     * scale, and direction.
     * 
     * @returns {Vector} the current position of the Sword's bounding box
     */
    calculatePosition() {
        const chadBBOffset = CHAD.scaleBoundingBoxOffset().x;
        const offset = (CHAD.facing === "left") ? -this.calculateSize().x + chadBBOffset : chadBBOffset + CHAD.scaledSize.x;
        return Vector.add(CHAD.pos, new Vector(offset, CHAD.scaleBoundingBoxOffset().y));
    }

    /**
     * Calculates the current size of the Sword's bounding box based on Chad's current
     * scale factor.
     * 
     * @returns {Vector} the size of the Sword's bounding box
     */
    calculateSize() {
        return new Vector(Sword.SIZE.x * CHAD.scale.x, Sword.SIZE.y * CHAD.scale.y);
    }

    /** Update the Sword. */
    update() {
        if (CHAD.health <= 0) return;

        if (!this.isSlicing()) {
            // the Sword is not currently attacking

            if (GAME.user.jabbing) { 
                // a new attack is starting

                this.hasHit = false;
                this.lastAttack = Date.now();

                // reset Chad's attack animations
                CHAD.animations[CHAD.facing]["slicing"].elapsedTime = 0;
                CHAD.animations[CHAD.facing]["slicingStill"].elapsedTime = 0;
            }
        } else if (!this.hasHit) {
            // an attack is currently underway

            const bb = new BoundingBox(this.calculatePosition(), this.calculateSize());

            GAME.entities.midground.forEach((entity) => {
                if (this != entity && entity.boundingBox && entity.takeDamage) {
                    if (bb.collide(entity.boundingBox)) {
                        entity.takeDamage(Sword.DAMAGE * CHAD.damageMultiplier);
                        this.hasHit = true;
                        ASSET_MGR.playSFX(SFX.SWORD_HIT.path, SFX.SWORD_HIT.volume);
                    }
                }
            });
        }
    };

    /** Draw the Sword's bounding box when debug mode is on. */
    draw() {
        if (GAME.debug) {
            const basePos = Vector.worldToCanvasSpace(this.calculatePosition());
            CTX.strokeStyle = "purple";
            CTX.strokeRect(basePos.x, basePos.y, this.calculateSize().x, this.calculateSize().y)
        }
    };
};