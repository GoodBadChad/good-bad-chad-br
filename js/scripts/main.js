// Declare constants shared by all other classes and scripts.
const GAME = new GameEngine();
const ASSET_MGR = new AssetManager();
const CANVAS = document.getElementById("game-world");
const CTX = CANVAS.getContext("2d");
const CAMERA = new Camera();
const CHAD = new Chad();

// Queue asset downloads here:

// Download assets and start the game.
ASSET_MGR.downloadAll(() => {
	// load the first level here.
	gameEngine.start();
});
