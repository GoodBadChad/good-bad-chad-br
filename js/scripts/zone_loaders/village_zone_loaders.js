const loadVillageCanyon = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageField = () => {
    const queueAssets = () => {};

    const addEntities = () => {
        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(-1, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));
        // Add a layer of blocks to the floor.
        for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
            GAME.addEntity(new Block(new Vector(x, ZONE.MAX_BLOCK.y), Block.GRASS));
        }

        if (LAST_ZONE.equals(Zone.getZones().village.mountain)) { // Coming from mountain.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 3, 20);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.main)) { // Coming from main.
            // spawn on left.
            const blockPos = new Vector(1, 20);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };

    // Set background color:
    BG_COLOR = "red";

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageInsideCave = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageMain = () => {
    const queueAssets = () => {};

    const addEntities = () => {
        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.field
        ));
        // Add a layer of blocks to the floor.
        for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
            GAME.addEntity(new Block(new Vector(x, ZONE.MAX_BLOCK.y), Block.DIRT));
        }

        // Place chad.

        if (LAST_ZONE === null) { // We've just started the game.
            // Spawn in middle.
            const blockPos = new Vector(50, 20);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);

        } else if (LAST_ZONE.equals(Zone.getZones().village.field)) { // Coming from field.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 3, 20);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.outsideCave)) { // Coming from outside cave.
            // spawn on left.
            const blockPos = new Vector(1, 20);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };

    // Set Background Color:
    BG_COLOR = COLORS.skyBlue;

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageMountain = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageOutsideCave = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};