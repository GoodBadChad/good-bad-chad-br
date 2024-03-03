/** 
 * The Camera is going to be updated according to Chad's position, doing its best to keep
 * Chad in the center of the camera while respecting the boundaries of the map.
 * The Camera itself is not an entity, but it IS going to be updated after the rest of them.
 * @author Devin Peevy 
 */
class Camera {
    constructor() {
        this.pos = new Vector(0, 0);
    };

    /** The size of the Camera and the Canvas, in pixels. */
    static get SIZE() {
        return new Vector(1920, 1080);
    };

    /**
     * This is going to update the x and y values according to Chad's position.
     */
    update() {
        // We want the camera to not go off the screen, but focus on chad in the direct center where possible.

        /** Finds the median of three numbers. */
        const median = (x, y, z) => {
            if ((x >= y && x <= z) || (x <= y && x >= z)) {
                return x;
            }
            if ((y >= x && y <= z) || (y <= x && y >= z)) {
                return y;
            }
            return z;
        };

        // There are three goals of the camera:
        // (1) Center on Chad.
        const centeredOnChad = new Vector(
            CHAD.pos.x + (Chad.SIZE.x / 2) - (Camera.SIZE.x / 2),
            CHAD.pos.y + (Chad.SIZE.y / 2) - (Camera.SIZE.y / 2));

        // Note: Could also do:
        // const centeredOnChad = Vector.subtract(Vector.add(CHAD.pos, Vector.multiply(PapaChad.SIZE, 1 / 2)), Vector.multiply(Camera.SIZE, 1 / 2));
        // That seems a lot less clear though.

        // (2) Do not show any space outside the maximum boundaries (right, bottom) of the Zone.
        const maxPos = Vector.subtract(ZONE.MAX_PT, Camera.SIZE);

        // (3) Do not show any space outside the minimum boundaries (top, left) of the Zone.
        const minPos = ZONE.MIN_PT;

        // The camera's position does not have to MATCH any of these three points - however, its x must belong to one of these points,
        // and its y must also belong to one of these points. More specifically:
        const x = median(centeredOnChad.x, maxPos.x, minPos.x);
        const y = median(centeredOnChad.y, maxPos.y, minPos.y);

        this.pos = new Vector(x, y);
    };
};
