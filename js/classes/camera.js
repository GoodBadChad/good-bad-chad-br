/** 
 * The Camera is going to be updated according to the wizard's position, doing its best to keep
 * the wizard in the center of the camera while respecting the boundaries of the map.
 * The Camera itself is not an entity, but it IS going to be updated after the rest of them.
 * @author Devin Peevy 
 */
class Camera {
    constructor () {
        this.pos = new Vector(0, 0);
    };

    /** @returns {Vector} The size of the Camera and the Canvas, in pixels. */
    static get SIZE() {
        return new Vector(1920, 1080);
    };

    /**
     * This is going to update the x and y values according to Chad's position.
     */
    update() {
        // We want the camera to not go off the screen, but focus on chad in the direct center where possible.
        // Therefore:
        const median = (x, y, z) => {
            // TODO: not important but there's definitely a better way to do this.
            if ((x >= y && x <= z) || (x <= y && x >= z)) {
                return x;
            }
            if ((y >= x && y <= z) || (y <= x && y >= z)) {
                return y;
            }
            return z;
        };
        // This is where the Camera is if it can be perfectly centered on CHAD.
        const centeredOnChad = new Vector(
            CHAD.pos.x + (PapaChad.SIZE.x / 2) - (Camera.SIZE.x / 2),
            CHAD.pos.y + (PapaChad.SIZE.y / 2) - (Camera.SIZE.y / 2));

        // This is where the Camera is if it is at the lower right corner of the Zone.
        const maxPos = new Vector(ZONE.MAX_PT.x - Camera.SIZE.x, ZONE.MAX_PT.y - Camera.SIZE.y);

        // This is where the Camera is if it is at the upper right corner of the Zone.
        const minPos = new Vector(ZONE.MIN_PT.x, ZONE.MIN_PT.y);

        const x = median(centeredOnChad.x, maxPos.x, minPos.x);
        const y = median(centeredOnChad.y, maxPos.y, minPos.y);

        this.pos = new Vector(x, y);
    };
};