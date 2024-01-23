// Declare constants shared by all other classes and scripts.
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
const CHAD = new PapaChad(new Vector(0, 0));
/** The inventory of the player. */
const INVENTORY = new Inventory();

// Minor details
CTX.imageSmoothingEnabled = false;
const debugButton = document.getElementById("debug");
debugButton.addEventListener("click", () => {
	if (debugButton.checked) {
		GAME.debug = true;
	} else {
		GAME.debug = false;
	}
});
const spanishButton = document.getElementById("spanish");
spanishButton.addEventListener("click", () => {
	if (spanishButton.checked) {
		GAME.spanish = true;
	} else {
		GAME.spanish = false;
	}
});

// /*
//  * THE FOLLOWING CONSTRUCTOR DOES A LOT MORE THAN MEETS THE EYE!
//  * It is actually going to set up GAME and ASSET_MGR for us!
//  */
// let DIMENSION = new Dimension(Dimension.PLAYGROUND);

// Set the current ZONE to be the first one we encounter - village.main.
let ZONE = Zone.getZones().village.main;
// Load all assets, add all entities, place CHAD...
ZONE.load();

// Now we're ready!
GAME.start();