/**
 * A border is an INVISIBLE ENTITY which allows Chad to enter a new zone. 
 * It should NEVER be placed within the boundaries of a zone, but rather just outside.
 * It should be impossible to miss.
 */
class Border {
    /**
     * @param {Vector} pos 
     * @param {Vector} size 
     * @param {Zone} target 
     * @param {boolean} locked are we allowed to travel this way?
     */
    constructor(pos, size, target, locked = false) {
        this.pos = pos;
        this.size = size;
        this.target = target;
        this.boundingBox = new BoundingBox(this.pos, this.size);
        this.locked = locked;
    };

    /**
     * Borders don't change, so this doesn't do anything.
     */
    update() {
        // "Prepare for border. Because border... border never changes." -Ulysses S. Grant or sumn
    };

    /**
     * Borders don't exist within the visible space, so draw does nothing.
     */
    draw() {
        // We don't draw these - they don't even exist within the visible world.
    };
}