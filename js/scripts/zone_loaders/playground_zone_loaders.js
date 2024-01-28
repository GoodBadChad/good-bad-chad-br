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

    };

    const addEntities = () => {

    };

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