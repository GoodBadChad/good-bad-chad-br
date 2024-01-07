/** 
 * The Camera is going to be updated according to the wizard's position, doing its best to keep
 * the wizard in the center of the camera while respecting the boundaries of the map.
 * The Camera itself is not an entity, but it IS going to be updated after the rest of them.
 * @author Devin Peevy 
 */
class Camera {
    constructor () {
        /** The x coordinate of the top left corner of the visible playing field. */
        this.x = 0;
        /** The y coordinate of the top left corner of the visible playing field. */
        this.y = 0;
    };

    /**
     * This is going to update the x and y values according to the position of the GreenWizard.
     */
    update() {
        // (1) Put the wizard in the middle of the camera.
        const HALF_SCREEN = 512;
        this.x = CHAD.x - HALF_SCREEN;
        this.y = CHAD.y - HALF_SCREEN;

        // (2) IF you screwed up, correct it!
        const MAX_POS = 8026; // (MapSize = 9050) - (ScreenSize = 1024)
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > MAX_POS) {
            this.x = MAX_POS;
        }
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > MAX_POS) {
            this.y = MAX_POS;
        }
    };
};