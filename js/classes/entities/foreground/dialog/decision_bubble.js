class DecisionBubble {
  
  constructor(questioner, prompt, choices) {
    /** The name of the person asking Chad the question. */
    this.questioner = questioner;
    /** A brief (one line max!) reminder to the player about the decision they're about to make. */
    this.prompt = prompt;
    /** Up to four BRIEF indicators of the options Chad has. */
    this.choices = choices;
    /** The index of the selected (highlighted) option. */
    this.selected = 0;
  };

  update() {
    if (GAME.user.choiceUp) {
      // User is pushing up to make a choice at an earlier index.
      this.selected--;

      if (this.selected < 0) {
        // Did we move back from the first option? Choose the last then!
        this.selected = this.choices.length - 1;
      }

    }

    if (GAME.user.choiceDown) {
      // User is pushing down to make a choice at a later index.
      this.selected++;
      if (this.selected >= this.choices.length) {
        // Did we move forward from the last option? Back to the beginning!
        this.selected = 0;
      }
    }
  };

  draw() {
    // (1)  Draw the dialog bubble.
    const dbPos = new Vector( // position of decision bubble on canvas.
            (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2,
            Camera.SIZE.y - DialogBubble.SCALED_SIZE.y
        );

    CTX.drawImage(
        ASSET_MGR.getAsset(DialogBubble.SPRITESHEET),
        0, DialogBubble.SIZE.y,
        DialogBubble.SIZE.x, DialogBubble.SIZE.y,
        dbPos.x, dbPos.y,
        DialogBubble.SCALED_SIZE.x, DialogBubble.SCALED_SIZE.y
    );

    // (2)  Draw Chad.
    const scale = 6;
    const chadHeadX = (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2 - (scale * DialogBubble.SPEAKERS.CHAD.size.x * 1.5);
    const chadStart = new Vector(chadHeadX, Camera.SIZE.y - DialogBubble.SCALED_SIZE.y);
    DialogBubble.SPEAKERS.CHAD.drawFrame(chadStart, scale);

    // (3)  Draw the prompt
    const labeledPrompt = this.questioner + ": " + this.prompt;
    const promptStart = new Vector(
        (Camera.SIZE.x - DialogBubble.SCALED_SIZE.x) / 2 + (0.1 * DialogBubble.SCALED_SIZE.x),
        Camera.SIZE.y - DialogBubble.SCALED_SIZE.y + (0.1 * DialogBubble.SCALED_SIZE.x) - (5 * DialogBubble.SCALE) + 17
    );
    CTX.fillStyle = "darkgrey";
    CTX.font = FONT.VT323_NORMAL;

    const maxLineWidth = DialogBubble.SCALED_SIZE.x * 0.8;
    if (CTX.measureText(labeledPrompt) > maxLineWidth) {
        console.log(this);
        throw new Error("The above DecisionBubble has a labeledPrompt which is too long. Please shorten it.");
    } else {
        CTX.fillText(labeledPrompt, promptStart.x, promptStart.y);
    }

    // (4)  Because you don't want to cover the text, let's draw the highlight first.
    const textJump = new Vector(0, 40);
    let optionStart = Vector.add(promptStart, Vector.multiply(textJump, 2));
    const highlightStart = Vector.subtract(optionStart, Vector.multiply(textJump, 0.8));
    CTX.fillStyle = "darkgrey";
    CTX.fillRect(highlightStart.x, highlightStart.y + (textJump.y * this.selected), maxLineWidth, textJump.y);

    // (5)  Now we draw all of the options.
    CTX.fillStyle = "black";
    for (let i = 0; i < this.choices.length; i++) {
        if (CTX.measureText(this.choices[i].text) > maxLineWidth) {
            console.log(this);
            throw new Error("In the above DecisionBubble, choices[" + i + "].text is too long. Please shorten it.");
        } else {
            CTX.fillText(this.choices[i].text, optionStart.x, optionStart.y);
            optionStart = Vector.add(optionStart, textJump);
        }
    }
  };

  refresh() {
    this.selected = 0;
    this.removeFromWorld = false;
  }
};

class Choice {

  constructor(text, next) {
    this.text = text;
    this.next = next;
  }
}