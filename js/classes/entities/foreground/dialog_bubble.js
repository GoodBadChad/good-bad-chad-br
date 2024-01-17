/**
 * The section of dialog that is displayed near the speaker.
 * @author Nathan Hinthorne
 */
class DialogBubble {

    /**
     * @param {string} speaker The speaker object (should be an npc or enemy).
     * @param {string} text The text to be displayed in the dialog bubble.
     * @param {string} type The type of dialog bubble. DialogBubble.NORMAL, .THOUGHT, or .SHOUT.
     */
    constructor(speaker, text, type) {
        /** The speaker object (should be an npc or enemy). */
        this.speaker = speaker;

        /** The text to be displayed in the dialog bubble. */
        this.text = text;

        /** The type of dialog bubble. DialogBubble.NORMAL, .THOUGHT, or .SHOUT. */
        this.type = type;

        /** Whether or not this DialogBubble has been removed from the world. */
        this.removedFromWorld = false;

        /** The y position of the sprite ON THE SPRITESHEET. */
        this.yStart = this.pickSprite();

        /** scale of bubble, but only applied to the width */
        this.scale = this.findBubbleSize();

        /** The x position of the sprite ON THE SPRITESHEET. */
        this.x = CTX.canvas.width / 2 - DialogBubble.WIDTH * this.scale / 2; // center

        /** The y position of the sprite ON THE SPRITESHEET. */
        this.y = CTX.canvas.height - (DialogBubble.HEIGHT - 50) * this.scale; // bottom
    };

    /**
     * @returns The y position of the sprite ON THE SPRITESHEET.
     */
    pickSprite() {
        // pick the sprite based on the type of dialog bubble
        switch (this.type) {
            case DialogBubble.NORMAL:
                return 0;
            case DialogBubble.THOUGHT:
                return 80;
            case DialogBubble.SHOUT:
                return 160;
            default:
                return 160;
        }
    }

    /**
     * Removes this DialogBubble from the world.
     */
    remove() {
        this.removedFromWorld = true;
    }

    /** 
     * based off length of text, determine the size of the box.
     * - don't need this yet, as we only have one size
    */
    findBubbleSize() {
        // based off length of text, determine the size of the box
        if (this.text.length < 20) {
            // small box
            return 3;

        } else if (this.text.length < 40) {
            // medium box
            return 4;

        } else {
            // large box
            return 5;
        }
    }

    /**
     * Updates the x and y position of the dialog bubble.
     */
    update() {
        // this.x = this.speaker.x;
        // this.y = this.speaker.y-10;
    }

    draw() {
        // draw the dialog bubble
        CTX.drawImage(ASSET_MGR.getAsset(DialogBubble.SPRITESHEET),
            DialogBubble.X_START, this.yStart,
            DialogBubble.WIDTH, DialogBubble.HEIGHT,
            this.x, this.y - (DialogBubble.HEIGHT * 3) - 60,
            DialogBubble.WIDTH * this.scale, DialogBubble.HEIGHT*3);
        
        // draw the speaker's name in the center of the bubble
        CTX.font = FONT.VT323_HEADER;
        CTX.fillStyle = "black";
        CTX.fillText(this.speaker.name, this.x + (DialogBubble.WIDTH * this.scale/2) - 50, this.y - 140);
        
        // draw the text
        CTX.font = FONT.VT323_NORMAL;
        CTX.fillStyle = "black";

        // read in the text and draw it line by line
        let lines = this.text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            CTX.fillText(lines[i], this.x + 10, this.y - 110 + (i * 20));
        }
    }

    /** 
     * A constant for the type field. 
     */
    static get NORMAL() {
        return 1;
    }

    /** 
     * A constant for the type field. 
    */
    static get THOUGHT() {
        return 2;
    };

    /** 
     * A constant for the type field. 
    */
    static get SHOUT() {
        return 3;
    };

    /** The filepath to dialog spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/text-bubble.png";
    };

    /** The width, in pixels, of the sprite ON THE SPRITESHEET. */
    static get WIDTH() {
        return 100;
    };

    /** The height, in pixels, of the sprite ON THE SPRITESHEET. */
    static get HEIGHT() {
        return 40;
    };

    /** The x position of the sprite ON THE SPRITESHEET. */
    static get X_START() {
        return 0;
    }
};