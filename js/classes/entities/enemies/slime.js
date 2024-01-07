/** 
 * A Slime can appear in all dimensions except village.
 * He is able to face right or left, move, launch, and die.
 * @author Devin Peevy
 */
class Slime {
    // TODO: edit the Slime spritesheet so that idle is first, making the walking animation flow better.
    /**
     * @param {number} x The x position at which the Slime should start.
     * @param {number} y The y position at which the Slime should start.
     * @param {number} type The type of Slime that should be generated. Slime.SAP, .POLLUTED, .FROST, .MAGMA, or .EVIL.
     */
    constructor(x, y, type) {
        /** The x position of the Slime (in the game world). */
        this.x = x;
        /** The y position of the Slime (in the game world). */
        this.y = y;

        // Did we pass in a type? Is it valid?
        if (type && (type % 1 !== 0 || type < 0 || type > 4)) {
            throw new Error("Invalid Slime type: try Slime.SAP, .POLLUTED, .FROST, .MAGMA, or .EVIL.");
        }
        /** The type of Slime that this is. Slime.SAP, .POLLUTED, .FROST, .MAGMA, or .EVIL. Default SAP. */
        this.type = type ?? Slime.SAP; // If no type parameter input, assume SAP.

        /** An associative array of the animations for this Slime. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Slime looking? */
        this.facing = "left"; // "left", "right"
        /** What is the Slime doing? */
        this.action = "idle";
        /** Used to check for collisions with other applicable entities. */
        this.boundingBox = new BoundingBox();
        /** Used to check how to deal with collisions with other applicable entities. */
        this.lastBoundingBox = this.boundingBox;
        this.elapsedTime = 0;
        this.hops = 0;
    };

    // Types:
    /** 
     * A constant for the type field. 
     * @returns How many types of slimes are above Sap on the spritesheet. 
     */
    static get SAP() {
        return 0;
    }

    /** 
     * A constant for the type field. 
     * @returns How many types of slimes are above Polluted on the spritesheet.
     */
    static get POLLUTED() {
        return 1;
    }

    /** 
     * A constant for the type field. 
     * @returns How many types of slimes are above Frost on the spritesheet.
     */
    static get FROST() {
        return 2;
    };

    /** 
     * A constant for the type field. 
     * @returns How many types of slimes are above Magma on the spritesheet.
      */
    static get MAGMA() {
        return 3;
    };

    /** 
     * A constant for the type field.
     * @returns the offset (in types) of the Evil Slime sprites from the top.
     */
    static get EVIL() {
        return 4;
    };

    /** The height, in pixels, of the Slime ON THE SPRITESHEET. */
    static get HEIGHT() {
        return 21;
    };

    /** How much bigger should the Slime be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 3;
    };

    /** This will be the height of the Slime ON THE CANVAS. */
    static get SCALED_HEIGHT() {
        return Slime.SCALE * Slime.HEIGHT;
    };

    /** This will be the width of the Slime ON THE CANVAS. */
    static get SCALED_WIDTH() {
        return Slime.SCALE * Slime.WIDTH;
    };

    static get SPEED() {
        return Slime.SCALE * 30;
    }

    /** The filepath to the spritesheet of the Slime. */
    static get SPRITESHEET() {
        // TODO: make Slime death sprite.
        return "./sprites/slimes.png";
    };

    /** The width, in pixels, of the Slime ON THE SPRITESHEET. */
    static get WIDTH() {
        return 29;
    };
    
    /** Change what the Slime is doing and where it is. */
    update() {
        // WHAT SHOULD HIS CONDITIONS BE?

        // He's gonna (wait 0.5s, move) x2, turn, repeat.
        if (this.elapsedTime % 1.5 < 0.5) {
            this.action = "idle";
        } else {
            this.action = "moving";
        }
        // His animation takes 1 second. So: 
        this.hops = Math.floor(this.elapsedTime / 1.5);
        this.facing = (Math.floor(this.hops / 2) % 2 === 0) ? "right" : "left";
        this.elapsedTime += GAME.clockTick;

        // HOW SHOULD WE MOVE HIM BASED ON HIS CONDITIONS?
        const mult = (this.facing === "left") ? -1 : 1;
        if (this.action === "moving") {
            this.x += mult * Slime.SPEED * GAME.clockTick;
        }
    };

    /** Draw the Slime on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.x, this.y, Slime.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        // Idle Animations
        this.animations["right"]["idle"] = new Animator(
            Slime.SPRITESHEET,
            Slime.WIDTH, this.type * 2 * Slime.HEIGHT,
            Slime.WIDTH, Slime.HEIGHT,
            1, 1);
        this.animations["left"]["idle"] = new Animator(
            Slime.SPRITESHEET,
            Slime.WIDTH, this.type * 2 * Slime.HEIGHT + Slime.HEIGHT,
            Slime.WIDTH, Slime.HEIGHT,
            1, 1);
        
        // Moving animations
        this.animations["right"]["moving"] = new Animator(
            Slime.SPRITESHEET,
            0, this.type * 2 * Slime.HEIGHT,
            Slime.WIDTH, Slime.HEIGHT,
            4, 0.25);
        this.animations["left"]["moving"] = new Animator(
            Slime.SPRITESHEET,
            0, this.type * 2 * Slime.HEIGHT + Slime.HEIGHT,
            Slime.WIDTH, Slime.HEIGHT,
            4, 0.25);
        
    };
};