/**
 * A DialogBubble is the class which will be stored in the DIALOG array.
 * If ever DIALOG is not empty at the beginning of an update loop, it will
 * produce DialogBubbles for every string until it is empty, and then the
 * update/render loop will proceed as normal.
 */
class DialogBubble {
    /**
     * @throws Error if entity does not have a HEAD() method.
     * @param {string} content The string which is to be written on the blocks.
     * @param {number} type The type of dialog block it is to be.
     * @param {object} entity The entity which is talking. Ignored, unless type === Dialog.OTHER.
     */
    constructor(content, type, entity) {
        // If we pass nothing in, we want a standard dialog.
        // Nobody is talking -- for example, instructions.
        this.content = content;
        this.type = type;
    };

    static get STANDARD() {
        return 2;  
    };

    static get CHAD() {
        return 1;
    };

    static get OTHER() {
        return 0;
    };
};