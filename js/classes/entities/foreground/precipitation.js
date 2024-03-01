const dirToImgIndex = {
    down: 0,
    left: 1,
    right: 2,
}
/**
 * Drops a single raindrop or snowflake is added creating precipitation.
 * 
 * @author Caleb Krauter
 */
class Precipitation {

    /**
     * 
     * @param {String} dir direction that the drop should be falling.
     * @param {Vector} pos initial position of the drop.
     * @param {String} type rain or snow.
     * @param {int} scale scale of the rain or snow will vary.
     */
    constructor(dir, pos, type, scale) {
        this.dir = dir;
        this.origin = pos;
        // Setting this.pos to (-5-, 0) makes rain/snow fall naturally when it starts falling
        // by putting it off the screen for the first drops before resetting to a natural position.
        this.pos = new Vector(-50, 0);
        this.type = type;
        this.velocity = new Vector(0, 0);
        this.scale = scale;
        this.imgIndex = 0;

        if (type === weatherType.RAIN) {
            this.imgIndex = dirToImgIndex[this.dir];
        } else if (type === weatherType.SNOW) {
            const variant = Math.ceil(Math.random() * 4);
            this.imgIndex = variant + 2;
        }

        this.animator = new Animator(Precipitation.SPRITESHEET, new Vector(0, this.imgIndex * Precipitation.SIZE.x), new Vector(Precipitation.SIZE.x, Precipitation.SIZE.y), 1, 1);
        this.isRaining = false;
        this.stopPrecipitiation = false;
    }

    /**
     * Image used for precipitation.
     */
    static get SPRITESHEET() {
        return "./sprites/snow_and_rain.png";
    }

    /**
     * Size used for the image drawn.
     */
    static get SIZE() {
        return new Vector(32, 32);
    }

    /**
     * Resets the rain or snow to the top of the screen.
     */
    reset() {
        // These values are somewhat arbitrary but are necessary to ensure that the precipitation covers the whole canvas.
        const precipitionBoundR = 3000;
        const precipitionBoundL = 1920;
        const originMin = 0;
        const originMax = 50;
        let variationY = Math.random() * (originMin + originMax);
        // Ensure that the rain/snow covers the screen when resetting its origin.
        let variationX = Math.random() * (precipitionBoundL + precipitionBoundR);
        // We use CHAD.pos.x - 1920 to ensure that the rain/snow follows Chad and that the rain/snow begins at the left of the screen as it covers it.
        if (this.dir == "right") {
            // The left and right bounds are used as values to ensure that the precipitation covers the whole canvas and a bit outside of it
            // to ensure there are no odd gaps when the precipiation falls at an angle.
            variationX = Math.random() * (precipitionBoundL + precipitionBoundR);
            this.pos = new Vector(variationX + CHAD.pos.x - precipitionBoundR, this.origin.y + variationY);
        } else if (this.dir == "left") {
            variationX = Math.random() * (precipitionBoundL + precipitionBoundR);
            this.pos = new Vector(variationX + CHAD.pos.x - precipitionBoundL, this.origin.y + variationY);
        } else {
            // precipitionBoundL is used twice here to cover the screen with precipitation.
            variationX = Math.random() * (precipitionBoundL * 2);
            this.pos = new Vector(variationX + CHAD.pos.x - precipitionBoundL, this.origin.y + variationY);
        }
        this.velocity = new Vector(0, 0);


    }

    /**
     * Each update the rain or snow will fall in some direction and reset.
     */
    update() {
        this.velocity.y = PHYSICS.GRAVITY_ACC * GAME.clockTick;
        // Change velocity depending on direction.
        if (this.dir == "left") {
            this.velocity.x = -(PHYSICS.GRAVITY_ACC * GAME.clockTick - 5);
        } else if (this.dir == "right") {
            this.velocity.x = (PHYSICS.GRAVITY_ACC * GAME.clockTick - 5);
        }

        // Sets y velocity to terminal velocity just like in projectile.js
        this.velocity.y = this.velocity.y > PHYSICS.TERMINAL_VELOCITY ? PHYSICS.TERMINAL_VELOCITY : this.velocity.y;

        this.velocity = new Vector(this.velocity.x, this.velocity.y);
        this.pos = Vector.add(this.pos, this.velocity);


        if (!this.stopRain) {
            // Reset rain when it goes to low. It will always be reset within the frame width.
            if (this.pos.y > (CHAD.pos.y + 800)) {
                this.reset();
            }
        }

    }

    /**
     * Draw the rain or snow on the screen.
     */
    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), this.scale);

    }
}
