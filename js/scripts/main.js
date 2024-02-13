/** @author Devin Peevy */

// (1) Declare constants shared by all other classes and scripts:

/** The GameEngine overseeing the update-render loop and containing all entities. */
const GAME = new GameEngine();
/** The AssetManager which contains all images and music. */
const ASSET_MGR = new AssetManager();
/** The html element on which we are drawing. */
const CANVAS = document.getElementById("game-world");
/** The tool we use to draw on CANVAS. */
const CTX = CANVAS.getContext("2d");
/** Tells the canvas what portion of the game world to draw. */
const CAMERA = new Camera();
/** Our Hero! Centered in Camera. */
const CHAD = new Chad(new Vector(0, 0));
/** The inventory of the player. */
const INVENTORY = new Inventory();
/** The player's HUD. */
const HUD = new Hud();
/** The player's crosshair. */
const CROSSHAIR = new Crosshair();

// (2) Minor details:

// Game looks bad if we try to smooth. Hard lines = good.
CTX.imageSmoothingEnabled = false;

/*
DEBUG MODE: draws a grid on the screen and labels every block which has x, y % 5 === 0.
*/
const debugButton = document.getElementById("debug");
debugButton.addEventListener("click", () => {
	if (debugButton.checked) {
		GAME.debug = true;
	} else {
		GAME.debug = false;
	}
});

/*
SPANISH MODE: So far, does nothing. Will put all dialog in the game into Spanish, hopefully.
*/
const spanishButton = document.getElementById("spanish");
spanishButton.addEventListener("click", () => {
	if (spanishButton.checked) {
		GAME.spanish = true;
	} else {
		GAME.spanish = false;
	}
});

/** 
 * If specials keys are pressed, prevent the default action of the event.
 */
document.addEventListener("keydown", (key) => {
	if (key.altKey || key.ctrlKey || key.metaKey) {
		key.preventDefault();
	}
});

// (3) Set the current ZONE to be the first one we encounter - village.main.

let ZONE = Zone.getZones().village.main;
let LAST_ZONE = null;
// Load all assets, add all entities, place CHAD...
ZONE.load();

// (4) Start the game! :)
GAME.start();
