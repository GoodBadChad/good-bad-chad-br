const loadPlaygroundCaleb = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

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
        ASSET_MGR.queueDownload(MUSIC.STARTING_OFF.path);
        ASSET_MGR.queueDownload(MUSIC.PEACEFUL_CHIPTUNE.path);

        // queue sound effects
        ASSET_MGR.queueDownload(SFX.JUMP1.path);
        ASSET_MGR.queueDownload(SFX.JUMP2.path);
        ASSET_MGR.queueDownload(SFX.SLINGSHOT_LAUNCH1.path);
        ASSET_MGR.queueDownload(SFX.SLINGSHOT_LAUNCH2.path);
        ASSET_MGR.queueDownload(SFX.SLINGSHOT_LAUNCH3.path);
        ASSET_MGR.queueDownload(SFX.SLINGSHOT_LAUNCH4.path);
        ASSET_MGR.queueDownload(SFX.SLINGSHOT_STRETCH.path);

    };

    const addEntities = () => {
        // Add a layer of blocks to the floor.
        for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
            GAME.addEntity(new Block(new Vector(x, ZONE.MAX_BLOCK.y), Block.DIRT));
        }

        // Place chad above the blocks.
        const blockPos = new Vector(5, 20);
        CHAD.pos = Vector.blockToWorldSpace(blockPos);


        // NOTE: we can't activate music until the user has interacted with the canvas. (this issue is inherent to HTML5)
        //  If listening for a click is the only way to activate music, that's fine. 
        //  Our game's START button in the final version can be the trigger.
        let playMusic = () => {
            ASSET_MGR.playAudio(MUSIC.PEACEFUL_CHIPTUNE.path, MUSIC.PEACEFUL_CHIPTUNE.volume, true);
        
            // delete the event listener so that the music doesn't restart when the user clicks again
            document.body.removeEventListener('click', playMusic);
        };
        
        document.body.addEventListener('click', playMusic);

        // GAME.addEntity(new DialogBubble(CHAD, "Hey pal! My name's Papa Chad", DialogBubble.NORMAL));
        GAME.addEntity(new Crosshair());
        GAME.addEntity(new Slingshot());
        CANVAS.addEventListener('dblclick', function(e) {
            e.preventDefault();
        });
    };

    // Set background color:
    BG_COLOR = "skyblue";

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadPlaygroundTrae = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};