/**
 * A DialogBubble is a unit of an entity's conversation array. It contains a portion of 
 * text, which is being said by a specified speaker (or not, as in the case of gameplay instruction).
 * It <will be> displayed at the bottom of the screen, and show the Speaker's head animation above it.
 * 
 * THIS CLASS IS NOT COMPLETE!
 * 
 * @author Nathan Hinthorne, Devin Peevy
 */
class DialogBubble {
    /**
     * Constructs a Dialog Bubble 
     * @param {Animator} speaker The person saying the dialog. Should be a constant from DialogBubble.SPEAKERS.If nobody, use null.
     * @param {string} text 
     * @param {Array<Choice>} choices 
     * @param {boolean} endOfConversation 
     */
    constructor(speaker, text, endOfConversation = false, choices = null) {
        /** The animator to be displayed above the dialog bubble. */
        this.speaker = speaker;
        this.targetLines = DialogBubble.splitText(text);
        this.visibleLines = [];
        for (let i = 0; i < this.targetLines.length; i++) {
            this.visibleLines.push("");
        }
        this.currentLine = 0;
        this.isEnd = endOfConversation;
        this.choices = choices;
        // Note to devs: Choice objects are coming soon. Kinda my last priority as far as dialog comes.
        switch (this.speaker) {
            case DialogBubble.SPEAKERS.CHAD:
                this.type = DialogBubble.LEFT_BUBBLE;
                break;
            case null:
                this.type = DialogBubble.INSTRUCTION;
                break;
            default:
                this.type = DialogBubble.RIGHT_BUBBLE;
        };
    };

    update() {
        // It only ever updates when you haven't added every line.
        if (this.currentLine < this.targetLines.length) {
            // You're gonna keep adding to the same line.
            if (this.visibleLines[this.currentLine].length < this.targetLines[this.currentLine].length) {
                const newChar = this.targetLines[this.currentLine].charAt(this.visibleLines[this.currentLine].length);
                this.visibleLines[this.currentLine] = this.visibleLines[this.currentLine] + newChar;
            } else {
                this.currentLine++;
            }
        }
    };

    draw() {
        // three steps:
        const dbPos = new Vector(
            (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2,
            Camera.SIZE.y - DialogBubble.SCALED_SIZE.y
        );

        // (1) Draw the DialogBubble sprite.
        CTX.drawImage(
            ASSET_MGR.getAsset(DialogBubble.SPRITESHEET),
            0, DialogBubble.SIZE.y * this.type,
            DialogBubble.SIZE.x, DialogBubble.SIZE.y,
            dbPos.x, dbPos.y,
            DialogBubble.SCALED_SIZE.x, DialogBubble.SCALED_SIZE.y);
            
        // (2) Draw the speaker.
        const scale = 6;
        const speakerStart = this.speaker === DialogBubble.SPEAKERS.CHAD ?
            new Vector(
                Camera.SIZE.x - ((Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2) + (this.speaker.size.x * 0.5),
                Camera.SIZE.y - DialogBubble.SCALED_SIZE.y
            ) : new Vector(
                Camera.SIZE.x - ((Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2) + (this.speaker.size.x * 0.5),
                Camera.SIZE.y - DialogBubble.SCALED_SIZE.y
            );
        this.speaker.drawFrame(speakerStart, scale);

        // (3) Draw the text.
        let textStart = new Vector(
            (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2 + (0.1 * DialogBubble.SCALED_SIZE.x),
            Camera.SIZE.y - DialogBubble.SCALED_SIZE.y + (0.1 * DialogBubble.SCALED_SIZE.x) - (5 * DialogBubble.SCALE) + 17
        );
        const textJump = new Vector(0, 40); // NOTE: this is based off a text size of 34!
        CTX.fillStyle = "black";
        CTX.font = FONT.VT323_NORMAL;
        this.visibleLines.forEach((line) => {
            CTX.fillText(line, textStart.x, textStart.y);
            textStart = Vector.add(textStart, textJump);
        });
    };

    refresh() {
        this.visibleLines = [];
        for (let i = 0; i < this.targetLines.length; i++) {
            this.visibleLines.push("");
        }
        this.currentLine = 0;
        this.removeFromWorld = false;
    };

    finishTyping() {
        for (let i = 0; i < this.targetLines.length; i++) {
            this.visibleLines[i] = this.targetLines[i];
        }
        this.currentLine = this.targetLines.length;
    }

    /**
     * This is going to split the text into multiple lines which will fit on the dialog bubble.
     * @param {string} text The entirety of the text which you want to split
     * @returns An array of strings guaranteed to fit on one line on the text bubble.
     * @throws An error if text is too long to fit on a single bubble.
     */
    static splitText(text) {
        CTX.fillStyle = "black";
        CTX.font = FONT.VT323_NORMAL;

        const words = text.split(' ');
        let wordIndex = 0;
        const lines = [];
        let currLine = "";

        const maxLineWidth = DialogBubble.SCALED_SIZE.x * 0.8;

        // While there are still words to account for:
        while (wordIndex < words.length) {
            let space = "";
            // While this line can still fit more words.
            while (CTX.measureText(currLine + space + words[wordIndex]).width <= maxLineWidth) {
                currLine = currLine + space + words[wordIndex];
                space = " ";
                wordIndex++;
                if (wordIndex === words.length) break;
            }
            // Now, the next word cannot fit on this line.
            // Append currLine to lines.
            lines.push(currLine);
            currLine = "";
        }
        if (lines.length > 6) throw new Error("Cannot fit the following string into a single dialog bubble: " + text);
        return lines;
    }

    // STATIC GETTERS:

    /** The size of this entity on the spritesheet. */
    static get SIZE() {
        return new Vector(110, 40);
    };

    /** How much bigger should the dialog bubble be on the screen than it is on the spritesheet? */
    static get SCALE() {
        return Camera.SIZE.x / DialogBubble.SIZE.x / 2;
    };

    /** The size that this entity should be drawn on the canvas. */
    static get SCALED_SIZE() {
        return Vector.multiply(DialogBubble.SIZE, DialogBubble.SCALE);
    };

    /** This is the path to the spritesheet containing the dialog bubbles. */
    static get SPRITESHEET() {
        return "./sprites/dialog_bubble.png";
    };

    /** A number representing type. Used for people other than Chad talking. */
    static get RIGHT_BUBBLE() {
        return 0;
    };

    /** A number representing type. Used for when Chad is talking. */
    static get LEFT_BUBBLE() {
        return 1;
    };

    /** A number representing type. Used when nobody is talking but still communicating with player. */
    static get INSTRUCTION() {
        return 2;
    };

    /** 
     * A JSON object with all of the characters who talk. It stores Animators of their heads.
     * The speaker field of any DialogBubble should be a constant from this getter.
     */
    static get SPEAKERS() {
        return {
            CHAD:       new Animator(Chad.SPRITESHEET,
                            new Vector(0, 0),
                            new Vector(PapaChad.SIZE.x, 17),
                            1, 1),
            PAPA_CHAD:  new Animator(PapaChad.SPRITESHEET,
                            new Vector(0, 0),
                            new Vector(PapaChad.SIZE.x, 17),
                            1, 1)
        };
    };
};

/**
 * A Choice is how a conversation is made dynamic.
 * A Choice is NOT a dialog bubble - it does not display what Chad SAYS, just indicates which decision he makes.
 * The nextIndex should point toward the DialogBubble representing Chad's true response.
 */
class Choice {
    /**
     * 
     * @param {string} text A short description of the choice one is making.
     * @param {number} nextIndex The conversation index that should be displayed next.
     */
    constructor(text, nextIndex) {
        this.text = text;
        this.nextIndex = nextIndex;
    };
};
