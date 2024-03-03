/**
 * Class for a death screen that has a message and a respawn button.
 * 
 * @author Trae Claar
 */
class DeathScreen {
    /**
     * DeathScreen constructor.
     */
    constructor() {
        this.message = DeathScreen.MESSAGES[Math.floor(Math.random() * DeathScreen.MESSAGES.length)];
        this.respawnButtonPos = new Vector(0, 0);
    }

    /** The font size of the DeathScreen message. */
    static get MESSAGE_FONT_SIZE() {
        return 128;
    }

    /** An array of messages from which the DeathScreen message will be randomly selected. */
    static get MESSAGES() {
        return [
            "FATALITY",
            "YOU DIED",
            "game over",
            "wasted",
            "wow you suck",
            "press F to pay respects",
            "you were killed by a Grunt"
        ];
    }

    /** The size, in pixels, of the respawn button. */
    static get RESPAWN_BUTTON_SIZE() {
        return new Vector(200, 50);
    }

    /** The text to be displayed on the respawn button. */
    static get RESPAWN_BUTTON_TEXT() {
        return "Respawn";
    }

    /** The font size of the respawn button's text. */
    static get BUTTON_FONT_SIZE() {
        return 48;
    }

    /** The width, in pixels, of the respawn button's border. */
    static get BUTTON_BORDER_WIDTH() {
        return 2
    }

    /** The padding between the respawn button's border and its text. */
    static get BUTTON_PADDING() {
        return 5;
    }

    /** Update the DeathScreen. Listens for a respawn button click. */
    update() {
        const mouseOverRespawnButton = GAME.mousePos.x > this.respawnButtonPos.x
            && GAME.mousePos.y > this.respawnButtonPos.y
            && GAME.mousePos.x < this.respawnButtonPos.x + DeathScreen.RESPAWN_BUTTON_SIZE.x
            && GAME.mousePos.y < this.respawnButtonPos.y + DeathScreen.RESPAWN_BUTTON_SIZE.y;
        if (GAME.user.firing && mouseOverRespawnButton) {
            // if the respawn button has been clicked, respawn Chad at the village
            CHAD.health = Chad.MAX_HEALTH;
            LAST_ZONE = null;
            ZONE = Zone.getZones().village.main;
            ZONE.load();
            this.removeFromWorld = true;
        }
    }

    draw() {
        // draw the death screen background
        CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
        CTX.fillRect(0, 0, Camera.SIZE.x, Camera.SIZE.y);

        // draw the death screen message
        CTX.fillStyle = "FireBrick";
        CTX.font = DeathScreen.MESSAGE_FONT_SIZE + "px vt323";
        const messageSize = CTX.measureText(this.message);
        const messagePos = new Vector((Camera.SIZE.x - messageSize.width) / 2,
            (Camera.SIZE.y - messageSize.emHeightAscent) / 2);
        CTX.fillText(this.message, messagePos.x, messagePos.y);

        // calculate position and size of the respawn button
        const buttonSize = DeathScreen.RESPAWN_BUTTON_SIZE;
        this.respawnButtonPos = new Vector((Camera.SIZE.x - buttonSize.x) / 2,
            messagePos.y + messageSize.emHeightAscent);

        // draw a translucent background for the respawn button
        CTX.fillStyle = "rgba(32, 32, 32, 0.5)";
        CTX.fillRect(this.respawnButtonPos.x, this.respawnButtonPos.y, buttonSize.x, buttonSize.y);
        // draw a border around the respawn button
        CTX.lineWidth = PauseButton.BORDER_WIDTH;
        CTX.strokeStyle = "white";
        CTX.strokeRect(this.respawnButtonPos.x, this.respawnButtonPos.y, buttonSize.x, buttonSize.y);

        // draw the respawn button text
        CTX.fillStyle = "white";
        CTX.font = DeathScreen.BUTTON_FONT_SIZE + "px vt323";
        const buttonTextSize = CTX.measureText(DeathScreen.RESPAWN_BUTTON_TEXT);
        CTX.fillText(
            DeathScreen.RESPAWN_BUTTON_TEXT,
            this.respawnButtonPos.x + (buttonSize.x - buttonTextSize.width) / 2,
            this.respawnButtonPos.y + buttonSize.y - (buttonSize.y - buttonTextSize.emHeightAscent
                + buttonTextSize.emHeightDescent) / 2
        );
    }
}