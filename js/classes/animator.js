/**
 * This class is for animating a spritesheet.
 * An Animator is responsible for only ONE of the sprites Animations (i.e. jumping up, walking right, etc.),
 * therefore many sprites will have several Animators.
 * @author Chris Marriott, Devin Peevy
 */
class Animator {

    /**
     * @param {string} spritesheet The path to the spritesheet that this specific Animator instance is going to be working with.
     * @param {number} xStart The starting x position (on the SPRITESHEET!) of the first sprite of the animation.
     * @param {number} yStart The starting y position (on the SPRITESHEET!) of the first sprite of the animation.
     * @param {number} width The width in pixels of the sprites in this animation.
     * @param {number} height The height in pixels of the sprites in this animation.
     * @param {number} frameCount The number of frames that are included in this animation.
     * @param {number} frameDuration The amount of time (in SECONDS!) between each change in frame.
     */
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        /** The path to the spritesheet that this specific Animator instance is going to be working with. */
        this.spritesheet = spritesheet;
        /** The starting x position (on the SPRITESHEET!) of the first sprite of the animation. */
        this.xStart = xStart;
        /** The starting y position (on the SPRITESHEET!) of the first sprite of the animation. */
        this.yStart = yStart;
        /** The width in pixels of the sprites in this animation. */
        this.width = width;
        /** The height in pixels of the sprites in this animation. */
        this.height = height;
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
     * @param {number} x The x position (of the CANVAS!) at which we'd like our sprite to be drawn.
     * @param {number} y The y position (of the CANVAS!) at which we'd like our sprite to be drawn.
     * @param {number} scale How much the image should be scaled when drawing. 1 pixel on the spritesheet = (scale x scale) pixels on the canvas.
     */
    drawFrame(x, y, scale) {
        this.elapsedTime += GAME.clockTick;
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();
        CTX.drawImage(ASSET_MGR.getAsset(this.spritesheet),
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * scale, this.height * scale);
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