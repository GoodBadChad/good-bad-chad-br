/**
 * This class creates bounding boxes, which are used to check for collisions within the gameplay.
 * The collisions will include blocking movement (like running into a wall), taking damage (either the player or an enemy), etc.
 * @author Chris Marriott, Devin Peevy
 */
class BoundingBox {
    /**
     * @param {number} x The x coordinate of the top left of the bounding box.
     * @param {number} y The y coordinate of the top left of the bounding box.
     * @param {number} width The width of the bounding box.
     * @param {number} height The height of the bounding box.
     */
    constructor(x, y, width, height) {
        /** The width of the box. */
        this.width = width;
        /** The height of the box. */
        this.height = height;
        /** The x coordinate of the left boundary of the box. */
        this.left = x;
        /** The x coordinate of the  right boundary of the box. */
        this.right = x + width;
        /** The y coordinate of the top boundary of the box. */
        this.top = y;
        /** The y coordinate of the bottom boundary of the box. */
        this.bottom = y + height;
    };

    /**
     * This method returns a code corresponding to the type of collision that it is.
     * @returns an object containing the sides which are being collided with; false if no collision.
     * @param {BoundingBox} other the bounding box which you are checking for collision with this.
     */
    collide(other) {
        // Are we colliding at all?
        if (!((this.top < other.bottom) && (this.left < other.right) && (this.bottom > other.top) && (this.right > other.left))) {
            return false;
        }

        // Which sides are we interfering with?
        let t, l, b, r = false;
        // top?
        if (
            this.bottom > other.top 
            && this.top < other.top 
            && (this.right > other.left || this.left < other.right)
        ) {
            t = true;
        }
        // bottom?
        if (
            this.top < other.bottom 
            && this.bottom > other.bottom 
            && (this.right > other.left || this.left < other.right)
        ) {
            b = true;
        }
        // left?
        if (
            this.right > other.left 
            && this.left < other.left 
            && (this.bottom > other.top || this.top < other.bottom)
        ) {
            l = true;
        }
        // right?
        if (
            this.left < other.right 
            && this.right > other.right 
            && (this.bottom > other.top || this.top < other.bottom)
        ) {
            r = true;
        }

        return { left: l, right: r, top: t, bottom: b };
    };
};