/**
 * This class creates bounding boxes, which are used to check for collisions within the gameplay.
 * The collisions will include blocking movement (like running into a wall), taking damage (either the player or an enemy), etc.
 */
class BoundingBox {
    /**
     * @param {number} x The x coordinate of the top left of the bounding box.
     * @param {number} y The y coordinate of the top left of the bounding box.
     * @param {number} width The width of the bounding box.
     * @param {number} height The height of the bounding box.
     */
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
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
     * This method checks for the collision between two bounding boxes.
     * @param {BoundingBox} other The bounding box which we are comparing to check for a collision.
     * @returns true if the two bounding boxes intersect; else false.
     */
    collide(other) {
        return (this.top < other.bottom) && (this.left < other.right) && (this.bottom > other.top) && (this.right > other.left);
    };
};