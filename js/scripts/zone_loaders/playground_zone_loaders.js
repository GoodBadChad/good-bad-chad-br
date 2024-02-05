const loadPlaygroundCaleb = () => {

    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER.SPRITESHEET);
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
        ASSET_MGR.queueDownload(Block.SPRITESHEET);
        ASSET_MGR.queueDownload(Projectile.SPRITESHEET);
        ASSET_MGR.queueDownload(DialogBubble.SPRITESHEET);
        ASSET_MGR.queueDownload(Crosshair.SPRITESHEET);
        ASSET_MGR.queueDownload(Slingshot.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);

        // queue music
        ASSET_MGR.queueDownload(MUSIC.PEACEFUL_CHIPTUNE.path);

        // queue sound effects
    };

    const addEntities = () => {

        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(-1, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));
        for (let y = ZONE.MAX_BLOCK.y; y >= ZONE.MIN_BLOCK.y; y--) {
            for (let x = ZONE.MAX_BLOCK.x; x >= ZONE.MIN_BLOCK.x; x--) {
                // GAME.addEntity(new Block(i, j, Block.DIRT));a

                // const pos = new Vector(y, x);
                console.log("Starting block x " + x);
                console.log("Starting block y " + y);

                switch (playGroundTileMap[y][x]) {
                    case 4:
                        GAME.addEntity(new Block(new Vector(x, y), Block.LAVA_ROCK));
                        break;
                    case 3:
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_ICE));
                        break;
                    case 2:
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_DIRT));
                        break;
                    case 1:
                        GAME.addEntity(new Block(new Vector(x, y), Block.DIRT));
                        break;
                    default:
                        break;
                }
            }
        }

        // Draw Sun.
        GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE), Sun.VILLAGE));
};
        // Set background color:
        BG_COLOR = "red";

        queueAssets();
        ASSET_MGR.downloadAll(addEntities);
};

const loadPlaygroundDevin = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadPlaygroundEverybody = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadPlaygroundNathan = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
        ASSET_MGR.queueDownload(Block.SPRITESHEET);
        ASSET_MGR.queueDownload(Projectile.SPRITESHEET);
        ASSET_MGR.queueDownload(DialogBubble.SPRITESHEET);
        ASSET_MGR.queueDownload(Crosshair.SPRITESHEET);
        ASSET_MGR.queueDownload(Slingshot.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);

        // queue music
        ASSET_MGR.queueDownload(MUSIC.PEACEFUL_CHIPTUNE.path);
        ASSET_MGR.queueDownload(MUSIC.UPBEAT_CHIPTUNE_1.path);
        ASSET_MGR.queueDownload(MUSIC.UPBEAT_CHIPTUNE_2.path);
        ASSET_MGR.queueDownload(MUSIC.CHAD_PLAYFUL_ADVENTURE.path);
        ASSET_MGR.queueDownload(MUSIC.CHAD_VICTORIOUS_EMOTIONAL.path);
        ASSET_MGR.queueDownload(MUSIC.VILLAGE_TOWN_SQUARE.path);
        ASSET_MGR.queueDownload(MUSIC.FOREST_BOSS.path);
        ASSET_MGR.queueDownload(MUSIC.FACTORY_BOSS.path);
        ASSET_MGR.queueDownload(MUSIC.MOUNTAIN_MYSTERIOUS.path);
        ASSET_MGR.queueDownload(MUSIC.LAVA_NORMAL.path);
        ASSET_MGR.queueDownload(MUSIC.LAVA_UNDERGROUND.path);
        ASSET_MGR.queueDownload(MUSIC.LAVA_TENSE.path);

        // ASSET_MGR.queueDownload(MUSIC.TEST_FILE_10MB.path);
        
        // queue sound effects
    };

    const addEntities = () => {

        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(-1, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));
        for (let y = ZONE.MAX_BLOCK.y; y >= ZONE.MIN_BLOCK.y; y--) {
            for (let x = ZONE.MAX_BLOCK.x; x >= ZONE.MIN_BLOCK.x; x--) {
                // GAME.addEntity(new Block(i, j, Block.DIRT));a

                // const pos = new Vector(y, x);

                switch (playGroundTileMap[y][x]) {
                    case 4:
                        GAME.addEntity(new Block(new Vector(x, y), Block.LAVA_ROCK));
                        break;
                    case 3:
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_ICE));
                        break;
                    case 2:
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_DIRT));
                        break;
                    case 1:
                        GAME.addEntity(new Block(new Vector(x, y), Block.DIRT));
                        break;
                    default:
                        break;
                }
            }
        }

        // Draw Sun.
        GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE), Sun.VILLAGE));


        // Place chad above the blocks.
        const startBlock = new Vector(5, 5);
        CHAD.pos = Vector.blockToWorldSpace(startBlock);

        // NOTE: we can't activate music until the user has interacted with the canvas. (this issue is inherent to HTML5)
        //  If listening for a click is the only way to activate music, that's fine. 
        //  Our game's START button in the final version can be the trigger.
        let playMusic = () => {
            ASSET_MGR.playAudio(MUSIC.PEACEFUL_CHIPTUNE.path, MUSIC.PEACEFUL_CHIPTUNE.volume, true);
            // ASSET_MGR.playAudio(MUSIC.CHAD_PLAYFUL_ADVENTURE.path, MUSIC.CHAD_PLAYFUL_ADVENTURE.volume, true);
            
        
            // delete the event listener so that the music doesn't restart when the user clicks again
            document.body.removeEventListener('click', playMusic);
        };
        document.body.addEventListener('click', playMusic);

        CANVAS.addEventListener('dblclick', function(e) {
            e.preventDefault();
        });

        loadingAnimation.stop(); // stop the loading animation because asset manager has everything it needs
    };

    // Set background color:
    BG_COLOR = "skyblue";

    let loadingAnimation = new LoadingAnimation();
    loadingAnimation.start();

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadPlaygroundTrae = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);
    };

    const addEntities = () => {
        // Add a layer of blocks to the floor.
        for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
            GAME.addEntity(new Block(new Vector(x, ZONE.MAX_BLOCK.y), Block.DIRT));
        }
        GAME.addEntity(new Snake(Vector.blockToWorldSpace(new Vector(65, 20))));

        CHAD.pos = Vector.blockToWorldSpace(new Vector(50, 20));
    };

    BG_COLOR = "purple";

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};
