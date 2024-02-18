
/**
 * @author ?? (modified) Caleb Krauter
 */
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
    // backgrounds
    SEA_FOAM_GREEN: "#a0d6b4",
    SKY_BLUE: "#5da6b3",
    SKY_DARK_GREY: "#235654",
    SKY_SNOW_GREY: "#91B3B2",
    SKY_GREY: "#73908F",
    SKY_HOT_BLUE_SKY: "#00EAFF",

    LIGHT_BLUE: "#add8e6",

    // misc
    WHITE: "#ffffff",
    BLACK: "#000000",
    RED: "#ff0000",
    GREEN: "#00ff00",
    BLUE: "#0000ff",
    YELLOW: "#ffff00",
    PURPLE: "#800080",
    ORANGE: "#ffa500",
    PINK: "#ffc0cb",
    BROWN: "#8b4513",
    LIGHT_BROWN: "#d2b48c",
    GRAY: "#808080",
    LIGHT_GRAY: "#d3d3d3",
};

/** This is going to be set for each zone. A rectangle drawn over the whole canvas, first thing. */
let BG_COLOR = null;

// Physics utlities

/**
 * Physics constants
 * 
 * --Units--
 * Velocity: pixels/second
 * Acceleration: pixels/second^2
 */
const PHYSICS = {

    GRAVITY_ACC: 1200,
    TERMINAL_VELOCITY: 700
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


    // Player
    JUMP1: { path: "./sfx/jump1.mp3", volume: 0.2 },
    JUMP2: { path: "./sfx/jump2.mp3", volume: 0.2 },
    SLINGSHOT_LAUNCH1: { path: "./sfx/launch1.mp3", volume: 0.5 },
    SLINGSHOT_LAUNCH2: { path: "./sfx/launch2.mp3", volume: 0.6 },
    SLINGSHOT_LAUNCH3: { path: "./sfx/launch3.mp3", volume: 0.5 },
    SLINGSHOT_LAUNCH4: { path: "./sfx/launch4.mp3", volume: 0.5 },
    SLINGSHOT_STRETCH: { path: "./sfx/slingshot_stretch.mp3", volume: 0.4 },
    SWORD_SWING1: { path: "./sfx/sword_swing1.mp3", volume: 0.2 },
    SWORD_SWING2: { path: "./sfx/sword_swing2.mp3", volume: 0.2 },
    SWORD_SWING3: { path: "./sfx/sword_swing3.mp3", volume: 0.2 },
    SWORD_SWING4: { path: "./sfx/sword_swing4.mp3", volume: 0.2 },
    SWORD_SWING5: { path: "./sfx/sword_swing5.mp3", volume: 0.2 },
    SWORD_SWING6: { path: "./sfx/sword_swing6.mp3", volume: 0.2 },
    SWORD_SWING7: { path: "./sfx/sword_swing7.mp3", volume: 0.2 },
    SWORD_SWING8: { path: "./sfx/sword_swing8.mp3", volume: 0.2 },
    SWORD_SWING9: { path: "./sfx/sword_swing9.mp3", volume: 0.2 },
    SWORD_SWING10: { path: "./sfx/sword_swing10.mp3", volume: 0.2 },
    SWORD_HIT: { path: "./sfx/sword_hit.mp3", volume: 0.4 },
    SWOOSH: { path: "./sfx/swoosh.mp3", volume: 0.4 },
    RICOCHET1: { path: "./sfx/ricochet1.mp3", volume: 0.4 },
    RICOCHET2: { path: "./sfx/ricochet2.mp3", volume: 0.4 },
    RICOCHET3: { path: "./sfx/ricochet3.mp3", volume: 0.4 },
    RICOCHET4: { path: "./sfx/ricochet4.mp3", volume: 0.4 },
    EXPLOSION_SMALL: { path: "./sfx/explosion_small.mp3", volume: 0.4 },
    ITEM_EQUIP: { path: "./sfx/item_equip.mp3", volume: 0.4 },
    ITEM_COLLECT1: { path: "./sfx/item_collect1.mp3", volume: 0.4 },
    ITEM_COLLECT2: { path: "./sfx/item_collect2.mp3", volume: 0.4 },
    ITEM_COLLECT3: { path: "./sfx/item_collect3.mp3", volume: 0.4 },
    FOOD_EAT1: { path: "./sfx/food_eat1.mp3", volume: 0.4 },
    FOOD_EAT2: { path: "./sfx/food_eat2.mp3", volume: 0.4 },
    FOOD_EAT3: { path: "./sfx/food_eat3.mp3", volume: 0.4 },
    FOOD_EAT4: { path: "./sfx/food_eat4.mp3", volume: 0.4 },


    // UI
    UI_HIGH_BEEP: { path: "./sfx/ui_high_beep.mp3", volume: 0.4 },
    UI_SCIFI: { path: "./sfx/ui_scifi.mp3", volume: 0.4 },
    UI_SNAP: { path: "./sfx/ui_snap.mp3", volume: 0.4 },
    UI_GAMEBOY_BEEP: { path: "./sfx/ui_gameboy_beep.mp3", volume: 0.4 },

    // Environment
    GAME_OVER: { path: "./sfx/game_over.wav", volume: 0.4 },
}

/**
 * The game's music. Any music that contains "_sample" at the end is a placeholder.
 */
const MUSIC = {
    // Misc.
    PEACEFUL_CHIPTUNE: { path: "./music/peaceful_chiptune.mp3", volume: 0.1 }, // testing music
    HIGH_ENERGY: { path: "./music/high_energy_sample.wav", volume: 0.1 },
    VICTORY: { path: "./music/victory_sample.wav", volume: 0.1 },
    UPBEAT_CHIPTUNE_1: { path: "./music/upbeat_chiptune_1_sample.wav", volume: 0.1 },
    UPBEAT_CHIPTUNE_2: { path: "./music/upbeat_chiptune_2_sample.wav", volume: 0.1 },

    // Chad's themes
    CHAD_PLAYFUL_ADVENTURE: { path: "./music/chad_playful_adventure.mp3", volume: 0.1 },
    CHAD_VICTORIOUS_EMOTIONAL: { path: "./music/chad_victorious_emotional.mp3", volume: 0.2 },

    // Village themes
    VILLAGE_TOWN_SQUARE: { path: "./music/village_town_square_sample.wav", volume: 0.1 },
    // VILLAGE_CAVE: {path: "./music/village_cave.mp3", volume: 0.1},

    // Forest themes
    FOREST_BOSS: { path: "./music/forest_boss.mp3", volume: 0.1 },
    // FOREST_NORMAL: {path: "./music/forest_normal.mp3", volume: 0.1},

    // Factory themes
    FACTORY_BOSS: { path: "./music/factory_boss_sample.wav", volume: 0.1 },
    // FACTORY_NORMAL: {path: "./music/factory_normal.mp3", volume: 0.1},

    // Mountain themes
    MOUNTAIN_MYSTERIOUS: { path: "./music/mountain_mysterious.mp3", volume: 0.1 },
    // MOUNTAIN_NORMAL: {path: "./music/mountain_normal.mp3", volume: 0.1}, // will be more peaceful, might contain an irish harp and flutes, and ice tinkling sfx

    // Lava themes (all finished!)
    LAVA_NORMAL: { path: "./music/lava_normal.mp3", volume: 0.1 },
    LAVA_UNDERGROUND: { path: "./music/lava_underground.mp3", volume: 0.1 },
    LAVA_TENSE: { path: "./music/lava_tense.mp3", volume: 0.1 }, // might be timed task OR boss music
}

/**
 * Check if the provided entity is colliding with any blocks and correct its position if so.
 * 
 * @param {Entity} entity the entity for which to check block collision
 * @returns {Object} an object indicating which side(s) of a block the entity collided with
 */
const checkBlockCollisions = (entity, entitySize) => {
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
                        entity.pos = new Vector(entity.pos.x, otherEntity.boundingBox.top - entitySize.y);
                        entity.yVelocity = 0;
                    } else if (isOverlapY
                        && entity.lastBoundingBox.right <= otherEntity.boundingBox.left
                        && entity.boundingBox.right > otherEntity.boundingBox.left) {
                        // We are colliding with the left side.

                        collisions.left = true;

                        entity.pos = new Vector(otherEntity.boundingBox.left - entitySize.x, entity.pos.y);
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
    entity.boundingBox = new BoundingBox(entity.pos, entitySize);

    return collisions;
};

// The following is necessary because we must change the listeners for different modes (right now, gameplay and dialog).
/** Contains all functions called as event handlers. */
const EVENT_HANDLERS = {
    gameplayMouseDown: (mouse) => {
        // check if mouse button is left click
        if (mouse.button === 2) {
            GAME.user.jabbing = true;
            // GAME.user.aiming = false; uncomment this if you don't want to be able to aim while jabbing
        } else if (mouse.button === 0) {
            GAME.user.aiming = true;
            // GAME.user.jabbing = false; uncomment this if you don't want to be able to jab while aiming
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
                GAME.user.running = true;
                break;
            case "KeyX":
            case "AltLeft":
                GAME.user.dashing = true;
                break;
            case "KeyQ":
                GAME.user.jabbing = true;
                break;
            case "KeyR":
                GAME.user.cycleFood = true; // this should disable automatically after food is cycled
                break;
            case "KeyF":
                GAME.user.eatFood = true; // this should disable automatically after food is eaten
                break;
        }
    },
    doubleTap: (key) => {
        //TODO: implement double tap (stuff below is hacky and contains bugs)

        switch (key.code) {
            case "KeyD":
                if (GAME.lastKeyTime.keyD < GameEngine.DOUBLE_TAP_THRESHOLD) {
                    GAME.user.dashing = true;
                }
                console.log("time since last D: " + Math.round(GAME.lastKeyTime.keyD) + "s");
                GAME.lastKeyTime.keyD = 0;
                setTimeout(() => {
                    GAME.user.dashing = false;
                }, 1000);
                break;

            case "KeyA":
                if (GAME.lastKeyTime.keyA < GameEngine.DOUBLE_TAP_THRESHOLD) {
                    GAME.user.dashing = true;
                }
                console.log("time since last A: " + Math.round(GAME.lastKeyTime.keyA) + "s");
                GAME.lastKeyTime.keyA = 0;
                // set GAME.user.dashing back to false after a certain amount of time
                setTimeout(() => {
                    GAME.user.dashing = false;
                }, 1000);
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
                GAME.user.running = false;
                break;
            case "KeyX":
            case "AltLeft":
                GAME.user.dashing = false;
                break;
            case "KeyQ":
                GAME.user.jabbing = false;
                break;
        }
    },
    dialogKeyPress: (e) => {
        switch (e.code) {
            case "KeyS":
                GAME.user.choiceDown = true;
                break;
            case "KeyW":
                GAME.user.choiceUp = true;
                break;
        }
    },
    // KeyPress does not wanna work for spacebar. Oh well.
    dialogKeyDown: (e) => {
        switch (e.code) {
            case "Space":
                GAME.user.continuingConversation = true;
        }
    },
    dialogKeyUp: (e) => {
        switch (e.code) {
            case "Space":
                GAME.user.continuingConversation = false;
        }
    },
};