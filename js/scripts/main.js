// Declare constants shared by all other classes and scripts.
const GAME = new GameEngine();
const ASSET_MGR = new AssetManager();
const CANVAS = document.getElementById("game-world");
const CTX = CANVAS.getContext("2d");
const CAMERA = new Camera();
const CHAD = new Chad();

CTX.imageSmoothingEnabled = false;

// Queue asset downloads here:
ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
ASSET_MGR.queueDownload(Snake.SPRITESHEET);
ASSET_MGR.queueDownload(Slime.SPRITESHEET);

// Download assets and start the game.
ASSET_MGR.downloadAll(() => {
	// load the first level here.
	bunnySimulation();
	// Start the game
	GAME.start();
});
