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
/** The inventory of the player. */
const INVENTORY = new Inventory();
/** DYNAMIC_SCRIPTS.dialog and .dimension are used to not load unnecessary data. */
const DYNAMIC_SCRIPTS = {"dialog": null, "dimension": null};

CTX.imageSmoothingEnabled = false;

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