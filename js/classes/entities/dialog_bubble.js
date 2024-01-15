/**
 * The section of dialog that is displayed near the speaker.
 * @author Nathan Hinthorne
 */
class DialogBubble {

    /**
     * @param {string} speaker The speaker object (should be an npc or enemy). We will use the both the speaker's name AND their x and y position to determine where to draw the bubble.
     * @param {string} text The text to be displayed in the dialog bubble.
     * @param {string} type The type of dialog bubble. DialogBubble.NORMAL, .THOUGHT, or .SHOUT.
     */
    constructor(speaker, text, type) {
        if (type !== DialogBubbleType.NORMAL && type !== DialogBubbleType.THOUGHT && type !== DialogBubbleType.SHOUT) {
            throw new Error("Invalid DialogBubble type: try DialogBubble.NORMAL, .THOUGHT, or .SHOUT.");
        }

        this.speaker = speaker;
        this.text = text;
        this.type = type;

        this.removedFromWorld = false;

        this.yStart = this.pickSprite();

        /** we only apply scale to the width */
        this.scale = this.findBubbleSize();

        this.x = CTX.canvas.width / 2 - DialogBubble.WIDTH * this.scale / 2; // center
        this.y = CTX.canvas.height - (DialogBubble.HEIGHT - 50) * this.scale;  // bottom
    };

    /**
     * @returns The y position of the sprite ON THE SPRITESHEET.
     */
    pickSprite() {
        // pick the sprite based on the type of dialog bubble
        switch (this.type) {
            case DialogBubbleType.NORMAL:
                return 0;
            case DialogBubbleType.THOUGHT:
                return 80;
            case DialogBubbleType.SHOUT:
                return 160;
            default:
                return 160;
        }
    }

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

    update() {
        // this.x = this.speaker.x;
        // this.y = this.speaker.y-10;

        // put the dialog bubble at the bottom center of the screen
        this.x = CTX.canvas.width / 2 - DialogBubble.WIDTH * this.scale / 2;
        this.y = CTX.canvas.height - (DialogBubble.HEIGHT - 50) * this.scale;
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
            CTX.fillText(lines[i], this.x + 10, this.y - 100 + (i * 20));
        }
    }

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


/**
 * The type of dialog bubble. NORMAL, THOUGHT, or SHOUT.
 * - currently only NORMAL is implemented.
 */
const DialogBubbleType = {
    NORMAL: 'normal',
    THOUGHT: 'thought',
    SHOUT: 'shout'
};
