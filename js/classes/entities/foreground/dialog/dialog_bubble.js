/**
 * A DialogBubble is a unit of a conversation array. It contains a portion of 
 * text, which is being said by a specified speaker (or not, as in the case of gameplay instruction).
 * It will be displayed at the bottom of the screen, and show the Speaker's head animation beside it.
 * 
 * @author Devin Peevy
 */
class DialogBubble {
    /**
     * @param {Animator} speaker The person saying the dialog. Should be a constant from DialogBubble.SPEAKERS. If nobody, use null.
     * @param {string} text The text to be shown on this dialog bubble. If it would exceed 6 lines, throws an error.
     * @param {boolean} endOfConversation Is this the last dialog bubble in the conversation? Default: false.
     * @param {function} callback Should anything happen after this bubble is eliminated? Default: undefined.
     */
    constructor(speaker, text, endOfConversation = false, callback) {
        /** The animator to be displayed beside the dialog bubble. */
        this.speaker = speaker;

        /** These are the lines that represent all the text on a COMPLETELY TYPED dialog bubble. */
        this.targetLines = DialogBubble.splitText(text);
        /** These are the lines of text that will actually be drawn on the dialog bubble on the current frame. */
        this.visibleLines = [];
        for (let i = 0; i < this.targetLines.length; i++) {
            this.visibleLines.push("");
        }
        /** This represents the line of text that is currently being typed. If it is equal to targetLines.length, typing is complete. */
        this.currentLine = 0;

        /** Is this dialog bubble the end of the current conversation? */
        this.isEnd = endOfConversation;
        this.callback = callback;
        /** The type of bubble drawn. */
        this.type;
        switch (this.speaker.spritesheet) {
            case DialogBubble.SPEAKERS.CHAD.spritesheet:
                this.type = DialogBubble.LEFT_BUBBLE;
                break;
            case Sun.SPRITESHEET:
                this.type = DialogBubble.INSTRUCTION;
                break;
            default:
                this.type = DialogBubble.RIGHT_BUBBLE;
        };
    };

    /**
     * Update is going to add a single character of text to the bubble until all of them have been added, then nothing.
     */
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

    /**
     * This method is going to draw the dialog bubble, the speaker, and the text (in this.visibleLines).
     */
    draw() {
        // three steps:

        // (1) Draw the DialogBubble sprite.
        const dbPos = new Vector(
            (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2,
            Camera.SIZE.y - DialogBubble.SCALED_SIZE.y
        );
        CTX.drawImage(
            ASSET_MGR.getAsset(DialogBubble.SPRITESHEET),
            0, DialogBubble.SIZE.y * this.type,
            DialogBubble.SIZE.x, DialogBubble.SIZE.y,
            dbPos.x, dbPos.y,
            DialogBubble.SCALED_SIZE.x, DialogBubble.SCALED_SIZE.y
        );

        // (2) Draw the speaker.
        const scale = 6;
        const chadHeadX = (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2 - (scale * this.speaker.size.x * 1.5);
        const otherHeadX = Camera.SIZE.x - ((Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2) + (scale * this.speaker.size.x * 0.5);
        const speakerStart = this.speaker.spritesheet === DialogBubble.SPEAKERS.CHAD.spritesheet ?
            new Vector(chadHeadX, Camera.SIZE.y - DialogBubble.SCALED_SIZE.y) :
            new Vector(otherHeadX, Camera.SIZE.y - DialogBubble.SCALED_SIZE.y);

        this.speaker.drawFrame(speakerStart, scale);

        // (3) Draw the text.
        let textStart = new Vector(
            (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2 + (0.1 * DialogBubble.SCALED_SIZE.x),
            Camera.SIZE.y - DialogBubble.SCALED_SIZE.y + (0.1 * DialogBubble.SCALED_SIZE.x) - (5 * DialogBubble.SCALE) + 17
        );
        // The jump in pixels after each line!
        const textJump = new Vector(0, 40); // NOTE: this is based off a text size of 34!
        CTX.fillStyle = "black";
        CTX.font = FONT.VT323_NORMAL;
        this.visibleLines.forEach((line) => {
            CTX.fillText(line, textStart.x, textStart.y);
            textStart = Vector.add(textStart, textJump);
        });
    };

    /**
     * As a dialog bubble may be added/removed several times from the GameEngine, this resets its fields as if it were reconstructed,
     * making it draw properly and not remove itself from the world immediately.
     */
    refresh() {
        this.visibleLines = [];
        for (let i = 0; i < this.targetLines.length; i++) {
            this.visibleLines.push("");
        }
        this.currentLine = 0;
        this.removeFromWorld = false;
    };

    /**
     * This is called when the user continues the conversation while text is still being typed.
     * It does not progress the conversation, but does finish the typing.
     */
    finishTyping() {
        for (let i = 0; i < this.targetLines.length; i++) {
            this.visibleLines[i] = this.targetLines[i];
        }
        this.currentLine = this.targetLines.length;
    }

    /**
     * This is going to split the text into multiple lines (up to 6!) which will fit on the dialog bubble.
     * @param {string} text The entirety of the text which you want to split
     * @returns An array of strings guaranteed to fit on one line on the text bubble.
     * @throws An error if text is too long to fit on a single bubble (6 lines!).
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
            BLACKSMITH: new Animator('./sprites/blacksmith.png',
                new Vector(16, 22),
                new Vector(13, 21),
                1, 1),
            CHAD: new Animator("./sprites/speaker_chad.png",
                new Vector(0, 0),
                new Vector(24, 17),
                1, 1),
            MAYOR: new Animator('./sprites/mayor.png',
                new Vector(7, 12),
                new Vector(16, 18),
                1, 1),
            MAMA_CHAD: new Animator(PapaChad.SPRITESHEET,
                new Vector(PapaChad.SIZE.x, PapaChad.SIZE.y * 2),
                new Vector(PapaChad.SIZE.x, 17),
                1, 1),
            NONE: new Animator(Sun.SPRITESHEET,
                new Vector(0, 0),
                new Vector(0, 0),
                1, 1),
            PAPA_CHAD: new Animator(PapaChad.SPRITESHEET,
                new Vector(0, 0),
                new Vector(PapaChad.SIZE.x, 17),
                1, 1),
            Miner: new Animator(Miner.SPRITESHEET,
                new Vector(0, 0),
                new Vector(30, 24),
                1, 1),
            WIZARD: new Animator("./sprites/wizard.png",
                new Vector(11, 0),
                new Vector(26, 43),
                1, 1)
        };
    };
};