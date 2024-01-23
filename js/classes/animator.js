/**
 * This class is for animating a spritesheet.
 * An Animator is responsible for only ONE of the sprites Animations (i.e. jumping up, walking right, etc.),
 * therefore many sprites will have several Animators.
 * @author Chris Marriott, Devin Peevy
 */
class Animator {

    /**
     * @param {string} spritesheet The path to the spritesheet that this specific Animator instance is going to be working with.
     * @param {Vector} start The starting position (on the SPRITESHEET!) of the first sprite of the animation.
     * @param {Vector} size The size in pixels of the sprites in this animation.
     * @param {number} frameCount The number of frames that are included in this animation.
     * @param {number} frameDuration The amount of time (in SECONDS!) between each change in frame.
     */
    constructor(spritesheet, start, size, frameCount, frameDuration) {
        /** The path to the spritesheet that this specific Animator instance is going to be working with. */
        this.spritesheet = spritesheet;
        /** The starting position (on the SPRITESHEET!) of the first sprite of the animation. */
        this.start = start;
        /** The size in pixels of the sprites in this animation. */
        this.size = size;
        /** The number of frames that are included in this animation. */
        this.frameCount = frameCount;
        /** The amount of time (in SECONDS!) between each change in frame. */
        this.frameDuration = frameDuration;
        /** The amount of time which has elapsed since animation started. */
        this.elapsedTime = 0;
        /** The total amount of time that it takes to finish a single runthrough of an animation (no repeats!). */
        this.totalTime = frameCount * frameDuration;
    };

    /**
     * This method is going to draw the appropriate frame on the Canvas (to which ctx belongs to).
     * @param {Vector} x The position (of the CANVAS!) at which we'd like our sprite to be drawn.
     * @param {number} scale How much the image should be scaled when drawing. 1 pixel on the spritesheet = (scale x scale) pixels on the canvas.
     */
    drawFrame(pos, scale) {
        this.elapsedTime += GAME.clockTick;
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();
        CTX.drawImage(ASSET_MGR.getAsset(this.spritesheet),
            this.start.x + this.size.x * frame, this.start.y,
            this.size.x, this.size.y,
            pos.x, pos.y,
            this.size.x * scale, this.size.y * scale);
    };

    /**
     * @returns the current frame that this animation is on.
     */
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    /**
     * @returns True if this animation has been completed; else false.
     */
    isDone() {
        return this.elapsedTime >= this.totalTime;
    };
};