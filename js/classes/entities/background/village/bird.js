/**
 * Class which represents a Bird background entity that flies continuously
 * across the screen.
 * 
 * @author Trae Claar
 */
class Bird {
    /**
     * Constructor for a Bird.
     * 
     * @param {number} maxX the maximum x position (in pixels) a bird can achieve before resetting
     * @param {number} maxY the maximum y position (in pixels) a bird can achieve before resetting
     */
    constructor(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.animator = new Animator(Bird.SPRITESHEET, 0, 0, Bird.WIDTH, Bird.HEIGHT, 8, 1/16);

        this.reset();
    }

    /** A Bird's spritesheet. */
    static get SPRITESHEET() {
        return "./sprites/bird.png";
    }

    /** The width (in pixels) of a Bird on its spritesheet. */
    static get WIDTH() {
        return 32;
    }

    /** The height (in pixels) of a Bird on its spritesheet. */
    static get HEIGHT() {
        return 16;
    }

    /** The speed (in pixels/frame) of a Bird. */
    static get SPEED() {
        return 1.5;
    }

    /** The scale factor applied to the Bird's spritesheet when drawing. */
    static get SCALE() {
        return 1;
    }

    /** Update the Bird. */
    update() {
        this.x += this.dirX * Bird.SPEED;
        this.y += this.dirY * Bird.SPEED;
       
        if (this.x <= -this.actualWidth() || this.x >= this.maxX) {
            this.reset();
        }
    }

    /** Draw the Bird. */
    draw() {
        this.animator.drawFrame(this.x, this.y, Bird.SCALE);
    }

    /** 
     * Helper function for getting a random valid y-position for the Bird.
     * 
     * @return {number} a random value between 0 and the Bird's maximum y-position 
     */
    randomY() {
        return Math.random() * this.maxY;
    }

    /** 
     * Calculates the width (in pixels) of the Bird based on the scale. 
     * 
     * @return {number} the actual width of the Bird when drawn
     */
    actualWidth() {
        return Bird.WIDTH * Bird.SCALE;
    }

    /**
     * Resets the Bird. That is, returns it to the left or right edge of its bounds
     * and selects a new direction.
     */
    reset() {
        let targetX = this.maxX;
        let targetY = this.randomY();
        if (Math.random() < 0.5) {
            // start at the left edge
            this.x = -this.actualWidth();
            this.y = this.randomY();
        } else {
            // start at the right edge
            this.x = this.maxX;
            this.y = this.randomY();
            targetX = -this.actualWidth();
        }
        
        // calculate the bird's direction based on the origin and target position
        let deltaX = targetX - this.x;
        let deltaY = targetY - this.y;
        let magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        this.dirX = deltaX / magnitude;
        this.dirY = deltaY / magnitude;
    }
}