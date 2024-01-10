// Declare constants shared by all other classes and scripts.
const GAME = new GameEngine();
const ASSET_MGR = new AssetManager();
const CANVAS = document.getElementById("game-world");
const CTX = CANVAS.getContext("2d");
const CAMERA = new Camera();
const CHAD = new PapaChad(50, 50, true);
const DIMENSION = new Dimension(Dimension.PLAYGROUND);

CTX.imageSmoothingEnabled = false;

// Queue asset downloads here:
ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
ASSET_MGR.queueDownload(Snake.SPRITESHEET);
ASSET_MGR.queueDownload(Slime.SPRITESHEET);
ASSET_MGR.queueDownload(PapaChad.SPRITESHEET); // includes mama chad
ASSET_MGR.queueDownload(Block.SPRITESHEET);
ASSET_MGR.queueDownload(Bird.SPRITESHEET);

// Download assets and start the game.
ASSET_MGR.downloadAll(() => {
	// load the first level here.
	//bunnySimulation();
	birdSimulation();
	// Start the game
	GAME.start();
});
