const loadRiver = () => {
    const queueAssets = () => {

        // TODO don't forget to add in your water sprites.
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.CHAD_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.MAYOR_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Precipitation.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_3.SPRITESHEET);

        // NPCs
        ASSET_MGR.queueDownload(Bird.SPRITESHEET);

    };

    const addEntities = () => {
        // Add a border to the right side of the map
        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.woods
        ));
        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().mountain.slope1
        ));

        TilemapInterpreter.setTilemap(riverStartTilemap);
        // Also, add a flower to the top of every block!




        // Draw Sun.

        // Spawn Chad.
        // For testing, drops chad on right side.
        // if (LAST_ZONE === null) { // Coming from main.
        //     // spawn on left.
        //     const blockPos = new Vector(ZONE.MAX_BLOCK.x - 2, 21);
        //     CHAD.pos = Vector.blockToWorldSpace(blockPos);
        // }
        if (LAST_ZONE.equals(Zone.getZones().village.woods)) { // Coming from mountain.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_BLOCK.x, 21);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().mountain.slope1)) { // Coming from main.
            // spawn on left.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 2, 21);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };

    // Set background color:
    BG_COLOR = COLORS.SKY_BLUE;
    GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100), Sun.VILLAGE), -1);

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadRiverEnd = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_1.SPRITESHEET);

        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.CHAD_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.MAYOR_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.lighting.LANTERN.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.lighting.DARK.SPRITESHEET);

        ASSET_MGR.queueDownload(Precipitation.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_1.SPRITESHEET);
        // NPCs
        ASSET_MGR.queueDownload(Bird.SPRITESHEET);
        ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);
    };

    const addEntities = () => {
        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.woods
        ));

        BG_COLOR = COLORS.DARK_CAVE_PURPLE;


        for (let i = -1; i < 10; i++) {
            for (let j = -1; j < 11; j++) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.DARK, Vector.blockToWorldSpace(new Vector(i * 10, j * 10))), 1);

            }
        }
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(1, 14))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(13, 23))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(9, 30))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(30, 29))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(40, 27))), 1);



        TilemapInterpreter.setTilemap(caveTilemap);
        if (LAST_ZONE.equals(Zone.getZones().village.woods)) { // Coming from woods.
            // if (LAST_ZONE == null) { // Coming from mountain.

            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_BLOCK.x, 5);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};