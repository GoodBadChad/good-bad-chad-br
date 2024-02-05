/**
 * A conversation is an entity, in that it exists in the entities array and updates,
 * but really it is a container/handler for the dialog bubbles in its array.
 * Conversations can be stored in entities, but when they are active, the game goes into Dialog mode.
 */
class Conversation {
    /**
     * @param {Array<DialogBubble>} array The array containing all possible dialog bubbles in this conversation.
     * @param {boolean} isNew Is it Chad's first time seeing this conversation? Default: true.
     */
    constructor(array, isNew = true) {
        this.array = array;
        this.curr = 0;
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