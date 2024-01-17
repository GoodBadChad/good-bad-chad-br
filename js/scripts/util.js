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


const FONT = { // NOTE: the "vt323" part below is not what's assigning the vt323 font. It's the CSS file. I kept this here for reference.
    VT323_NORMAL: "20px vt323",
    VT323_HEADER: "24px vt323"
};

/**
 * @param {BoundingBox} collider The bounding box doing the colliding.
 * @param {BoundingBox} collidee The bounding box that is being collided with.
 * @returns a "Collision" object which contains the corners and vertices of COLLIDEE which are being invaded by COLLIDER.
 */
const getCollisionType = (collider, collidee) => {
    const vertices = [];
    if (this.x)

    return {corners: corners, vertices: vertices};
};