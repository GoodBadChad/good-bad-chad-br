/** Creates an alias for requestAnimationFrame for backwards compatibility. */
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        /**
         * Compatibility for requesting animation frames in older browsers
         * @param {Function} callback Function
         * @param {DOM} element DOM ELEMENT
         */
        ((callback, element) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();

// Physics utlities

/**
 * Physics constants
 * 
 * --Units--
 * Position: pixels
 * Velocity: pixels/second
 * Acceleration: pixels/second^2
 */
const PHYSICS = {
    GRAVITY_ACC : 900,
    TERMINAL_VELOCITY : 200 // currently only being applied to projectiles
};

const FONT = { // NOTE: the "vt323" part below is not what's assigning the vt323 font. It's the CSS file. I kept entity here for reference.
    VT323_NORMAL: "20px vt323",
    VT323_HEADER: "24px vt323"
};

/**
 * Check if the provided entity is colliding with any blocks and correct its position if so.
 * 
 * @param {Entity} entity the entity for which to check block collision
 * @returns {Object} an object indicating which side(s) of a block the entity collided with
 */
const checkBlockCollisions = (entity) => {
    const collisions = {};
    // Have we collided with anything?
    GAME.entities.forEach((otherEntity) => {
        // Does otherEntity even have a BB?
        if (otherEntity != entity && otherEntity.boundingBox) {
            
            // Are they even colliding?
            if (entity.boundingBox.collide(otherEntity.boundingBox)) {
                if (otherEntity instanceof Block) {

                    // Is there overlap with the block on the x or y-axes?
                    const isOverlapX = entity.lastBoundingBox.left < otherEntity.boundingBox.right
                        && entity.lastBoundingBox.right > otherEntity.boundingBox.left;
                    const isOverlapY = entity.lastBoundingBox.bottom > otherEntity.boundingBox.top
                        && entity.lastBoundingBox.top < otherEntity.boundingBox.bottom;

                    if (isOverlapX
                        && entity.lastBoundingBox.bottom <= otherEntity.boundingBox.top
                        && entity.boundingBox.bottom > otherEntity.boundingBox.top) {
                        // We are colliding with the top.
                        
                        collisions.top = true;

                        // NOTE: entity.constructor returns an instance's class. There may be a better way to do this.
                        entity.pos = new Vector(entity.pos.x, otherEntity.boundingBox.top - entity.constructor.SCALED_SIZE.y);
                        entity.yVelocity = 0;
                    } else if (isOverlapY
                        && entity.lastBoundingBox.right <= otherEntity.boundingBox.left
                        && entity.boundingBox.right > otherEntity.boundingBox.left) {
                        // We are colliding with the left side.

                        collisions.left = true;

                        entity.pos = new Vector(otherEntity.boundingBox.left - entity.constructor.SCALED_SIZE.x, entity.pos.y);
                    } else if (isOverlapY
                        && entity.lastBoundingBox.left >= otherEntity.boundingBox.right
                        && entity.boundingBox.left < otherEntity.boundingBox.right) {
                        // We are colliding with the right side.

                        collisions.right = true;

                        entity.pos = new Vector(otherEntity.boundingBox.right, entity.pos.y);
                    } else if (isOverlapX
                        && entity.lastBoundingBox.top >= otherEntity.boundingBox.bottom
                        && entity.boundingBox.top < otherEntity.boundingBox.bottom) {
                        // We are colliding with the bottom.

                        collisions.bottom = true;

                        entity.pos = new Vector(entity.pos.x, otherEntity.boundingBox.bottom);
                    }
                }
            }
            // There's no collision - don't do anything!
        }
        // There's no bounding box, so who gives a shrek?
    });

    // Now that your position is actually figured out, draw your correct bounding box.
    entity.boundingBox = new BoundingBox(entity.pos, entity.constructor.SCALED_SIZE);

    return collisions;
}