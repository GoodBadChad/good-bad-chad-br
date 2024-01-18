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
const CHAD = new PapaChad(0, 0, true);

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

/*
 * THE FOLLOWING CONSTRUCTOR DOES A LOT MORE THAN MEETS THE EYE!
 * It is actually going to set up GAME and ASSET_MGR for us!
 */
let DIMENSION = new Dimension(Dimension.PLAYGROUND);

// So...
GAME.start();

// TODO: change this to load whatever we want AT THE VERY BEGINNING OF THE GAME

/*
If we go through with my implementation, this stuff isn't necessary.
// Queue asset downloads here:

ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
ASSET_MGR.queueDownload(Snake.SPRITESHEET);
ASSET_MGR.queueDownload(Slime.SPRITESHEET);
ASSET_MGR.queueDownload(PapaChad.SPRITESHEET); // includes mama chad
ASSET_MGR.queueDownload(Block.SPRITESHEET);
ASSET_MGR.queueDownload(Bird.SPRITESHEET);

// Download assets and start the game.
ASSET_MGR.downloadAll(() => {
	// Load the dimension here.
	// Start the game
	GAME.start();
});
*/