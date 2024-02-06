/**
 * An OverheadIcon is a symbol which floats above an entity, indicating some sort of message to the player.
 * 
 * DETERMINED MEANINGS:
 * 
 * TRIANGLE:    dialog. [GREEN = quest, WHITE = new, unseen].
 * 
 * EXCLAMATION: someone sees you! [colors TBD].
 * 
 * QUESTION:    [TBD].
 */
class OverheadIcon {
    
    /**
     * A constructor for an overhead icon.
     * @param {Entity} target This is the Entity above which the Icon will be drawn.
     * @param {number} targetWidth This is the width of the target, so that it can be placed correctly.
     * @param {number} type OverheadIcon.TRIANGLE, .QUESTION or .EXCLAMATION - determines the shape of the icon.
     * @param {number} color OverheadIcon.WHITE, .GREEN, .YELLOW, or .RED - determines the color of the icon.
     */
    constructor(target, targetWidth, type, color) {
        // Wrong type? error.
        if (type % 1 !== 0 || color < 0 || color > 2) {
            throw new Error("Invalid type passed into OverheadIcon constructor. Try OverheadIcon.TRIANGLE, .QUESTION, or .EXCLAMATION.");
        }
        // Wrong color? error.
        if (color % 1 !== 0 || color < 0 || color > 3) {
            throw new Error("Invalid color passed into OverheadIcon constructor. Try OverheadIcon.WHITE, .GREEN, .YELLOW, or .RED");
        }

        /** The entity above which this OverheadIcon should be drawn. */
        this.target = target;
        /** The width of the target entity, in pixels. */
        this.targetWidth = targetWidth; // It's unfortunate that we need this, but since size is static we do.
        /** The number representing the type constant of this OverheadIcon. */
        this.type = type;
        /** The number representing the color constant of this OverheadIcon. */
        this.color = color;

        const aboveAndCenter = new Vector(
            (this.targetWidth / 2) - (OverheadIcon.SIZE.x / 2),
            -(OverheadIcon.SCALED_SIZE.y * 1.5)
        );
        /** The position of this OverheadIcon in the game world. */
        this.pos = Vector.add(this.target.pos, aboveAndCenter);

        this.animator = new Animator(OverheadIcon.SPRITESHEET,
            new Vector(this.color * OverheadIcon.SIZE.x, this.type * OverheadIcon.SIZE.y),
            OverheadIcon.SIZE,
            1, 1);
    };

    update() {
        // Add this vector to target's pos to get its pos.
        const aboveAndCenter = new Vector(
            (this.targetWidth / 2) - (OverheadIcon.SIZE.x / 2),
            -(OverheadIcon.SCALED_SIZE.y * 1.5)
        );
        this.pos = Vector.add(this.target.pos, aboveAndCenter);
    };

    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), OverheadIcon.SCALE);
    };

    static get SPRITESHEET() {
        return "./sprites/overhead_icon.png";
    }

    static get SIZE() {
        return new Vector(10, 15);
    };

    static get SCALE() {
        return 2;
    };

    static get SCALED_SIZE() {
        return Vector.multiply(OverheadIcon.SIZE, OverheadIcon.SCALE);
    };

    /*
        NOTE:
        The static getters below represent the TYPE and COLOR of the OverheadIcon.
        The numbers which they return are actually representative of the target 
        image's location on the spritesheet!
    */

   /** A constant for use in the constructor to declare type. */
    static get EXCLAMATION() {
        return 0;
    };

    /** A constant for use in the constructor to declare type. */
    static get TRIANGLE() {
        return 1;
    };

    /** A constant for use in the constructor to declare type. */
    static get QUESTION() {
        return 2;
    }

    /** A constant for use in the constructor to declare color. */
    static get WHITE() {
        return 0;
    };

    /** A constant for use in the constructor to declare color. */
    static get GREEN() {
        return 1;
    };

    /** A constant for use in the constructor to declare color. */
    static get YELLOW() {
        return 2;
    };

    /** A constant for use in the constructor to declare color. */
    static get RED() {
        return 3;
    };
}