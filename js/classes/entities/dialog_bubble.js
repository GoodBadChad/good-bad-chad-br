/**
 * The section of dialog that is displayed near the speaker.
 * - I'm thinking all dialog bubbles will ALWAYS be displayed ABOVE the speaker. Any thoughts on this?
 * @author Nathan Hinthorne
 */
class DialogBubble {

    /**
     * @param {string} text The text to be displayed in the dialog bubble.
     * @param {string} type The type of dialog bubble. DialogBubble.NORMAL, .THOUGHT, or .SHOUT.
     * @param {string} speaker The speaker object (should be an npc or enemy). We will use the both the speaker's name AND their x and y position to determine where to draw the bubble.
     */
    constructor(text, type, speaker) {
        if (type !== DialogBubbleType.NORMAL && type !== DialogBubbleType.THOUGHT && type !== DialogBubbleType.SHOUT) {
            throw new Error("Invalid DialogBubble type: try DialogBubble.NORMAL, .THOUGHT, or .SHOUT.");
        }
        if (false) { // TODO: check if speaker is not an npc or enemy
            throw new Error("Invalid DialogBubble speaker: speaker must be an npc or enemy.");
        }

        this.text = text;
        this.type = type;
        this.speaker = speaker;

        this.yStart = pickSprite();
        this.scale = findBubbleSize();
    };

    pickSprite() {
        // pick the sprite based on the type of dialog bubble
        switch (this.type) {
            case DialogBubbleType.NORMAL:
                return 0;
            case DialogBubbleType.THOUGHT:
                return 200;
            case DialogBubbleType.SHOUT:
                return 400;
        }
    }

    /** 
     * based off length of text, determine the size of the box.
     * - don't need this yet, as we only have one size
    */
    findBubbleSize() {
        // based off length of text, determine the size of the box
        if (this.text.length < 10) {
            // small box
            return 1;

        } else if (this.text.length < 20) {
            // medium box
            return 2;

        } else {
            // large box
            return 3;
        }
    }

    /**
     * Update the dialog bubble. Will need to stick to the speaker's position.
     */
    update() {
        this.x = this.speaker.x;
        this.y = this.speaker.y-50;
    }

    draw() {
        // draw the dialog bubble
        CTX.drawImage(ASSET_MGR.getAsset(DialogBubble.SPRITESHEET),
            X_START + DialogBubble.WIDTH, this.yStart,
            DialogBubble.WIDTH, DialogBubble.HEIGHT,
            this.x, this.y,
            DialogBubble.WIDTH * this.scale, DialogBubble.HEIGHT * this.scale);

        // draw the text
        CTX.font = FONT.VT323_NORMAL;
        CTX.fillStyle = "black";

        // draw the speaker's name
        CTX.fillText(this.speaker.name, this.x + 5, this.y + 5);

        // draw the text
        CTX.fillText(this.text, this.x + 5, this.y + 25);
    }

    /** The filepath to dialog spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/text-bubble.png";
    };

    static get WIDTH() {
        return 29;
    };

    static get HEIGHT() {
        return 49;
    };

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
