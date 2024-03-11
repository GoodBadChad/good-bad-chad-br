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
        ASSET_MGR.queueDownload(LiquidBlock.SPRITESHEET);

        // NPCs
        ASSET_MGR.queueDownload(Bird.SPRITESHEET);

        ASSET_MGR.queueDownload(MUSIC.PEACEFUL_CHIPTUNE.path);
    };

    const addEntities = () => {
        // Add a border to the right side of the map
        // GAME.addEntity(new Border(
        //     new Vector(ZONE.MIN_PT.x, 0),
        //     new Vector(1, ZONE.PIXEL_SIZE.y),
        //     Zone.getZones().village.woods
        // ));
        // GAME.addEntity(new Border(
        //     Vector.blockToWorldSpace(new Vector(65, 0)),
        //     new Vector(1, ZONE.PIXEL_SIZE.y),
        //     Zone.getZones().mountain.slope1
        // ));

        // spread water in a line
        for (let i = 4; i < 54; i++) {
            // const worldPos = Vector.blockToWorldSpace(new Vector(i, 3));
            GAME.addEntity(new LiquidBlock(new Vector(i, 28), LiquidBlock.WATER));
        }

        for (let i = 67; i < 100; i++) {
            // const worldPos = Vector.blockToWorldSpace(new Vector(i, 3));
            GAME.addEntity(new LiquidBlock(new Vector(i, 28), LiquidBlock.WATER));
        }

        TilemapInterpreter.setTilemap(riverStartTilemap);

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

    // spawn a water balloon ammo drop
    GAME.addEntity(new AmmoDrop(
        Vector.blockToWorldSpace(new Vector(5, 27)),
        AmmoDrop.WATER_BALLOON,
        10,
        false
    ));

    // spawn a water balloon ammo drop
    GAME.addEntity(new AmmoDrop(
        Vector.blockToWorldSpace(new Vector(32, 27)),
        AmmoDrop.WATER_BALLOON,
        20,
        false
    ));

    setTimeout(() => {
        ASSET_MGR.playMusic(MUSIC.PEACEFUL_CHIPTUNE.path, MUSIC.PEACEFUL_CHIPTUNE.volume);
    }, 500);
    

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