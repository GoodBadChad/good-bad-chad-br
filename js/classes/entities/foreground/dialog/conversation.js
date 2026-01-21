/**
 * A conversation is an entity, in that it exists in the entities array and updates,
 * but really it is a container/handler for the dialog bubbles in its array.
 * Conversations can be stored in entities, but when they are active, the game goes into Dialog mode.
 */
class Conversation {
    /**
     * @param {Array<DialogBubble|Choice>} array The array containing all possible dialog bubbles in this conversation.
     * @param {boolean} isNew Is it Chad's first time seeing this conversation? Default: true.
     */
    constructor(array, isNew = true) {
        this.array = array;
        this.currentIndex = 0;
        this.new = isNew;
    };

    /**
     * As the conversation is an entity, it must have an update loop. The update really just
     * listens for user input, and will change the dialog bubble shown accordingly.
     */
    update() {
        // Is the user wanting to move on to the next dialog bubble?
        if (GAME.user.continuingConversation) {
            // The user has pressed space.

            const currentBubble = this.array[this.currentIndex];

            if (currentBubble instanceof DialogBubble) {
                // currentBubble is a static dialog bubble. All we need to do is move forward.
                // As DialogBubbles are displayed with the typewriter effect, it also listens for
                // an early keypress to finish typing.

                if (currentBubble.currentLine >= currentBubble.targetLines.length) {
                    // currentBubble has finished its typing.
                    // player wants to move onto next bubble.

                    currentBubble.removeFromWorld = true;
                    if (currentBubble.callback) {
                        currentBubble.callback();
                    }

                    if (currentBubble.isEnd || this.currentIndex + 1 >= this.array.length) {
                        // They are on the last bubble! Exit conversation.
                        this.exitConversation();
                    } else {
                        // Move onto the next bubble.
                        this.currentIndex++;
                        GAME.addEntity(this.array[this.currentIndex], 1);
                    }
                } else {
                    // currentBubble has not finished its typing.
                    // player wants to see currentBubble complete now.
                    this.array[this.currentIndex].finishTyping();
                }
            } else {
                //currentBubble is a DecisionBubble. No typewriter effect.
                currentBubble.removeFromWorld = true;
                if (typeof currentBubble.choices[currentBubble.selected].next === 'number') {
                    this.currentIndex = currentBubble.choices[currentBubble.selected].next;
                } else {
                    // next is a function!
                    this.currentIndex = currentBubble.choices[currentBubble.selected].next();
                }
                GAME.addEntity(this.array[this.currentIndex], 1);
            }
        }
        // Make sure we don't accidentally count the button press twice.
        GAME.user.continuingConversation = false;
    };

    /** A conversation is an entity and therefore needs a draw method; it is not a physical entity though so it does nothing. */
    draw() {

    };

    /** 
     * This is what's going to be called when Chad interacts with a conversation-carrying entity.
     * Ensures that it's ready, adds itself to entities, as well as its first dialog bubble.
     * Sets the listeners to dialog mode.
     */
    initiateConversation() {
        // Make sure this is ready to be shown.
        this.removeFromWorld = false;
        this.currentIndex = 0;
        this.array.forEach((bubble) => {
            bubble.refresh();
        });

        // Add it to the game.
        GAME.addEntity(this);

        // Set up the game for dialog listeners.
        GAME.mode = GameEngine.DIALOG_MODE;
        GAME.configureEventListeners();

        // Add the first dialog bubble.
        GAME.addEntity(this.array[this.currentIndex], 1);
    };

    /**
     * Called by update once the conversation has been finished.
     * Removes it, deletes its 'new' status (affects whether an OverheadIcon is drawn), sets listeners to gameplay mode.
     */
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