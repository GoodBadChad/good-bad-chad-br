/**
 * This function is for drawing a single image on the canvas.
 * @param {string} spritesheet The spritesheet containing the image to be drawn.
 * @param {number} x The x position (of the CANVAS!) at which we'd like our sprite to be drawn.
 * @param {number} y The y position (of the CANVAS!) at which we'd like our sprite to be drawn.
 * @param {number} scale How much the image should be scaled when drawing. 1 pixel on the spritesheet = (scale x scale) pixels on the canvas.
 * @param {number} xStart The starting x position (on the SPRITESHEET!) of the first sprite of the animation.
 * @param {number} yStart The starting y position (on the SPRITESHEET!) of the first sprite of the animation.
 * @param {number} width The width of the sprite on the SPRITESHEET.
 * @param {number} height The height of the sprite on the SPRITESHEET.
 * 
 * @author Nathan Hinthorne
 */
function drawImage(spritesheet, x, y, scale, xStart, yStart, width, height) {
    CTX.drawImage(ASSET_MGR.getAsset(spritesheet),
    xStart + width, yStart,
    width, height,
    x, y,
    width * scale, height * scale);
};