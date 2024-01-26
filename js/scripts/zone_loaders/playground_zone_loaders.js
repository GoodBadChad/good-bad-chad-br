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
        ASSET_MGR.queueDownload("./music/starting_off_2_sample.wav");

        // queue sound effects
        ASSET_MGR.queueDownload("./sfx/temp_jump.wav");
        ASSET_MGR.queueDownload("./sfx/slingshot_launch.wav");
    };

    const addEntities = () => {

        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(-1, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));
        for (let x = ZONE.MIN_BLOCK.x; x < ZONE.MAX_BLOCK.x; x++) {
            for (let y = ZONE.MIN_BLOCK.y; y < ZONE.MAX_BLOCK.y; y++) {
                // GAME.addEntity(new Block(i, j, Block.DIRT));a

                // const pos = new Vector(y, x);
                console.log("Starting block x " + x);
                console.log("Starting block y " + y);

                switch (playGroundTileMap[x][y]) {
                    case 4:
                        console.log(4);
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

        // Add 10 layers of blocks to the bottom
        // for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
        //     for (let y = ZONE.MAX_BLOCK.y; y >= ZONE.MAX_BLOCK.y - 10; y--) {
        //         const type = y === ZONE.MAX_BLOCK.y - 10 ? Block.GRASS : Block.DIRT;
        //         GAME.addEntity(new Block(new Vector(x, y), type));
        //     }
        //     // Also, add a flower to the top of every block!
        //     GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER, Vector.blockToWorldSpace(new Vector(x, ZONE.MAX_BLOCK.y - 10))));
        // }

        // Draw Sun.
        GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE), Sun.VILLAGE));

        // Spawn Chad.
        // if (LAST_ZONE.equals(Zone.getZones().village.mountain)) { // Coming from mountain.
        //     // Set spawn point on the right.
        //     const blockPos = new Vector(ZONE.MAX_BLOCK.x - 3, 12);
        //     CHAD.pos = Vector.blockToWorldSpace(blockPos);
        // } else if (LAST_ZONE.equals(Zone.getZones().village.main)) { // Coming from main.
        //     // spawn on left.
        //     const blockPos = new Vector(1, 12);
        //     CHAD.pos = Vector.blockToWorldSpace(blockPos);
        // }
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

    };

    const addEntities = () => {

    };

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