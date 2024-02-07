/**
 * General-purpose class for displaying entites that do not move and which cannot be collided with.
 * 
 * @author Trae Claar
 */
class Decoration {

    /**
     * Constructor for a Decoration. The Decoration is positioned with respect to the BOTTOM (not top) left 
     * corner.
     * 
     * @param {Object} type A Decoration Object template from Decoration.DECORATIONS.
     * @param {Vector} bottomLeftPos the position of the bottom left corner of the Decoration (in world space)
     * @throws {Error} if type is not a valid Decoration type
     */
    constructor(type, bottomLeftPos) {
        this.type = type;
        this.pos = new Vector(bottomLeftPos.x, bottomLeftPos.y - this.type.SIZE.y * this.type.SCALE);
        this.animator = new Animator(this.type.SPRITESHEET, this.type.SPRITESHEET_START_POS, 
            this.type.SIZE, this.type.FRAME_COUNT, this.type.FRAME_DURATION);
    };

    /** A map containing decoration types (keys) and tables of their properties (values). */
    static get DECORATIONS() {
        return {
            flowers: {
                MED_RED_FLOWER: {
                    SPRITESHEET: "./sprites/flowers.png",
                    SPRITESHEET_START_POS: new Vector(0, 0),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(16, 32),
                    SCALE: 3
                },
                TALL_PURPLE_FLOWER: {
                    SPRITESHEET: "./sprites/flowers.png",
                    SPRITESHEET_START_POS: new Vector(0, 32),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(16, 32),
                    SCALE: 3
                },
                PRIDE_FLOWER: {
                    SPRITESHEET: "./sprites/flowers.png",
                    SPRITESHEET_START_POS: new Vector(0, 64),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(16, 32),
                    SCALE: 3
                },
                CARROT: {
                    SPRITESHEET: "./sprites/flowers.png",
                    SPRITESHEET_START_POS: new Vector(0, 96),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(16, 32),
                    SCALE: 3
                },
                POTATO: {
                    SPRITESHEET: "./sprites/flowers.png",
                    SPRITESHEET_START_POS: new Vector(0, 128),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(16, 32),
                    SCALE: 3
                }
            },
            houses: {
                BLACKSMITH_HOUSE: {
                    SPRITESHEET: "./sprites/blacksmith_house.png",
                    SPRITESHEET_START_POS: new Vector(0, 0),
                    FRAME_COUNT: 4,
                    FRAME_DURATION: 1/4,
                    SIZE: new Vector(192, 192),
                    SCALE: 3.5
                },
                CHAD_HOUSE: {
                    SPRITESHEET: "./sprites/chad_house.png",
                    SPRITESHEET_START_POS: new Vector(0, 0),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(192, 192),
                    SCALE: 3.5
                },
                MAYOR_HOUSE: {
                    SPRITESHEET: "./sprites/mayor_house.png",
                    SPRITESHEET_START_POS: new Vector(0, 0),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(192, 192),
                    SCALE: 3.5
                }
            },
            trees: {
                OAK_1: {
                    SPRITESHEET: "./sprites/tree.png",
                    SPRITESHEET_START_POS: new Vector(0, 0),
                    FRAME_COUNT: 1,
                    FRAME_DURATION: 1,
                    SIZE: new Vector(64, 64),
                    SCALE: 8
                }
            }
        };
    };

    /**
     * Checks if the passed type is a valid Decoration and throws an error otherwise. Not intended
     * for use outside of the Decoration class.
     * 
     * @param {string} type the type to check
     * @throws {Error} if type is not a valid Decoration type.
     */
    static checkType(type) {
        if (!Decoration.PROPERTY_TABLE[type]) {
            throw new Error(type + " is not a valid Decoration type. Please use a key from" 
                + " Decoration.PROPERTY_TABLE.");
        }
    };

    /**
     * Returns the path to the spritesheet file for the given Decoration. Convenient for loading its 
     * spritesheet.
     * 
     * @param {string} type the type of Decoration to get the spritesheet path for (must be a key to 
     *      Decoration.PROPERTY_TABLE)
     * @returns {string} the file path to the spritesheet
     * @throws {Error} if type is not a valid Decoration type.
     */
    static getSpritesheet(type) {
        Decoration.checkType(type);
        return Decoration.PROPERTY_TABLE[type].SPRITESHEET;
    };

    /**
     * Decoration update method. Does nothing.
     */
    update() {

    };

    /**
     * Draw the Decoration on the canvas.
     */
    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), this.type.SCALE);
    };
};