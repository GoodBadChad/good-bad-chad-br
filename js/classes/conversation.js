class Conversation {
    /**
     * 
     * @param {Array<DialogBubble>} array The array containing all possible 
     * @param {boolean} isNew Is it Chad's first time seeing this conversation? Default: true.
     */
    constructor(array, isNew = true) {
        this.array = array;
        this.curr = 0;
        this.new = isNew;
    };

    update() {
        // Is the user wanting to move on to the next dialog bubble?
        if (GAME.user.continuingConversation) {
            // The user has pressed space.

            const currentBubble = this.array[this.curr];

            if (currentBubble.currentLine >= currentBubble.targetLines.length) {
                // currentBubble has finished its typing.
                // player wants to move onto next bubble.

                currentBubble.removeFromWorld = true;

                if (currentBubble.isEnd || this.curr + 1 >= this.array.length) {
                    // They are on the last bubble! Exit conversation.
                    this.exitConversation();
                } else {
                    // We are moving onto a new DialogBubble.
                    if (currentBubble.choices) {
                        // TODO: dynamic conversations!
                    } else {
                        // Move onto the next bubble.
                        this.curr++;
                        GAME.addEntity(this.array[this.curr]);
                    }
                }
            } else {
                // currentBubble has not finished its typing.
                // player wants to see currentBubble complete now.
                this.array[this.curr].finishTyping();
            }
        }
        GAME.user.continuingConversation = false;
    };

    draw() {

    };

    initiateConversation() {
        // Make sure this is ready to be shown.
        this.removeFromWorld = false;
        this.curr = 0;
        this.array.forEach((bubble) => {
            bubble.refresh();
        });
        // Add it to the game.
        GAME.addEntity(this);
        // Set up the game for dialog listeners.
        GAME.mode = GameEngine.DIALOG_MODE;
        GAME.configureEventListeners();
        // Add the first dialog bubble.
        GAME.addEntity(this.array[this.curr]);
    };

    exitConversation() {
        // Have this remove itself from entities
        this.removeFromWorld = true;
        // It can no longer be new if we just finished it
        this.new = false;
        // Put regular listeners back into the game.
        GAME.mode = GameEngine.GAMEPLAY_MODE;
        GAME.configureEventListeners();
    };
};