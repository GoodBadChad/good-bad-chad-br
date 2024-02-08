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

/* This fixes the bug where the window scrolls down when you press space. */
window.onkeydown = (e) => {
    return e.code !== "Space";
};

/** An object containing all the relevant colors we are using in this project. */
const COLORS = {
    SEA_FOAM_GREEN: "#a0d6b4",
    SKY_BLUE: "#5da6b3"
};

/** This is going to be set for each zone. A rectangle drawn over the whole canvas, first thing. */
let BG_COLOR = null;

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

/** Declares constants for CTX.font. */
const FONT = {
    VT323_HEADER: "50px vt323",
    VT323_NORMAL: "34px vt323"
};

/**
 * The game's sound effects.
 */
const SFX = {
    JUMP1: {path: "./sfx/jump1.mp3", volume: 0.2},
    JUMP2: {path: "./sfx/jump2.mp3", volume: 0.2},
    SLINGSHOT_LAUNCH1: {path: "./sfx/launch1.mp3", volume: 0.5},
    SLINGSHOT_LAUNCH2: {path: "./sfx/launch2.mp3", volume: 0.6},
    SLINGSHOT_LAUNCH3: {path: "./sfx/launch3.mp3", volume: 0.5},
    SLINGSHOT_LAUNCH4: {path: "./sfx/launch4.mp3", volume: 0.5},
    SLINGSHOT_STRETCH: {path: "./sfx/slingshot_stretch.mp3", volume: 0.4},
    SWORD_SWING1: {path: "./sfx/sword_swing1.mp3", volume: 0.2},
    SWORD_SWING2: {path: "./sfx/sword_swing2.mp3", volume: 0.2},
    SWORD_SWING3: {path: "./sfx/sword_swing3.mp3", volume: 0.2},
    SWORD_SWING4: {path: "./sfx/sword_swing4.mp3", volume: 0.2},
    SWORD_SWING5: {path: "./sfx/sword_swing5.mp3", volume: 0.2},
    SWORD_SWING6: {path: "./sfx/sword_swing6.mp3", volume: 0.2},
    SWORD_SWING7: {path: "./sfx/sword_swing7.mp3", volume: 0.2},
    SWORD_SWING8: {path: "./sfx/sword_swing8.mp3", volume: 0.2},
    SWORD_HIT: {path: "./sfx/sword_hit.mp3", volume: 0.4}
}

/**
 * The game's music. Any music that contains "_sample" at the end is a placeholder.
 */
const MUSIC = {
    // Misc.
    PEACEFUL_CHIPTUNE: {path: "./music/peaceful_chiptune.mp3", volume: 0.1}, // testing music
    HIGH_ENERGY: {path: "./music/high_energy_sample.wav", volume: 0.1},
    VICTORY: {path: "./music/victory_sample.wav", volume: 0.1},
    UPBEAT_CHIPTUNE_1: {path: "./music/upbeat_chiptune_1_sample.wav", volume: 0.1},
    UPBEAT_CHIPTUNE_2: {path: "./music/upbeat_chiptune_2_sample.wav", volume: 0.1},

    // Chad's themes
    CHAD_PLAYFUL_ADVENTURE: {path: "./music/chad_playful_adventure.mp3", volume: 0.1},
    CHAD_VICTORIOUS_EMOTIONAL: {path: "./music/chad_victorious_emotional.mp3", volume: 0.2},

    // Village themes
    VILLAGE_TOWN_SQUARE: {path: "./music/village_town_square_sample.wav", volume: 0.1},
    // VILLAGE_CAVE: {path: "./music/village_cave.mp3", volume: 0.1},

    // Forest themes
    FOREST_BOSS: {path: "./music/forest_boss.mp3", volume: 0.1},
    // FOREST_NORMAL: {path: "./music/forest_normal.mp3", volume: 0.1},

    // Factory themes
    FACTORY_BOSS: {path: "./music/factory_boss_sample.wav", volume: 0.1},
    // FACTORY_NORMAL: {path: "./music/factory_normal.mp3", volume: 0.1},
    
    // Mountain themes
    MOUNTAIN_MYSTERIOUS: {path: "./music/mountain_mysterious.mp3", volume: 0.1},
    // MOUNTAIN_NORMAL: {path: "./music/mountain_normal.mp3", volume: 0.1}, // will be more peaceful, might contain an irish harp and flutes, and ice tinkling sfx
    
    // Lava themes (all finished!)
    LAVA_NORMAL: {path: "./music/lava_normal.mp3", volume: 0.1},
    LAVA_UNDERGROUND: {path: "./music/lava_underground.mp3", volume: 0.1},
    LAVA_TENSE: {path: "./music/lava_tense.mp3", volume: 0.1}, // might be timed task OR boss music
}

/**
 * Check if the provided entity is colliding with any blocks and correct its position if so.
 * 
 * @param {Entity} entity the entity for which to check block collision
 * @returns {Object} an object indicating which side(s) of a block the entity collided with
 */
const checkBlockCollisions = (entity) => {
    const collisions = {};
    // Have we collided with anything?
    GAME.entities.midground.forEach((otherEntity) => {
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
};

// The following is necessary because we must change the listeners for different modes (right now, gameplay and dialog).
/** Contains all functions called as event handlers. */
const EVENT_HANDLERS = {
    gameplayMouseDown: (mouse) => {
        // check if mouse button is left click
        if (mouse.button === 2) {
            GAME.user.jabbing = true;
        } else if (mouse.button === 0) {
            GAME.user.aiming = true;
        }
    },
    gameplayMouseUp: (mouse) => {
        // check if mouse button is left click
        if (mouse.button === 2) {
            GAME.user.jabbing = false;
        } else if (mouse.button === 0) {
            GAME.user.aiming = false;
            GAME.user.firing = true;
        }
    },
    gameplayMouseMove: (mouse) => {
        const rect = CANVAS.getBoundingClientRect();
        const scaleX = CANVAS.width / rect.width;
        const scaleY = CANVAS.height / rect.height;
        GAME.mousePos = new Vector((mouse.clientX - rect.left) * scaleX, (mouse.clientY - rect.top) * scaleY);
    },
    gameplayKeyDown: (key) => {
        switch (key.code) {
            case "KeyA":
                GAME.user.movingLeft = true;
                break;
            case "KeyD":
                GAME.user.movingRight = true;
                break;
            case "KeyS":
                GAME.user.movingDown = true;
                break;
            case "KeyW":
                GAME.user.movingUp = true;
                GAME.user.interacting = true;
                break;
            case "Space":
                GAME.user.jumping = true;
                break;
            case "ShiftLeft":
                GAME.user.sprinting = true;
                break;
            case "KeyX":
                GAME.user.dashing = true;
                break;
            case "KeyQ":
                GAME.user.jabbing = true;
                break;
        }
    },
    gameplayKeyUp: (key) => {
        switch (key.code) {
            case "KeyA":
                GAME.user.movingLeft = false;
                break;
            case "KeyD":
                GAME.user.movingRight = false;
                break;
            case "KeyS":
                GAME.user.movingDown = false;
                break;
            case "KeyW":
                GAME.user.movingUp = false;
                GAME.user.interacting = false;
                break;
            case "Space":
                GAME.user.jumping = false;
                break;
            case "ShiftLeft":
                GAME.user.sprinting = false;
                break;
            case "KeyX":
                GAME.user.dashing = false;
                break;
            case "KeyQ":
                GAME.user.jabbing = false;
                break;
        }
    },
    dialogKeyPress: (key) => {
        if (key.code === "KeyW") {
            GAME.user.continuingConversation = true;
        }
    }
};