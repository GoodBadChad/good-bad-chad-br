const loadRiverStart = () => {
    const queueAssets = () => {
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
            new Vector(ZONE.MAX_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.main
        ));

        TilemapInterpreter.setTilemap(riverStartTilemap);


        for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
            if (x % 3 == 0) {

                for (let i = 0; i < 5; i += 0.5) {
                    i += .5;
                    GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(x + i, 20))), 0);
                    i += .4;
                    GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_4, Vector.blockToWorldSpace(new Vector(x + i, 20))), 0);
                    i += .35;

                    GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_3, Vector.blockToWorldSpace(new Vector(x + i, 20))), 0);
                }
            }

            GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector(x, 20))), 1);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_3, Vector.blockToWorldSpace(new Vector(x + 10, 20))), -1);



            // Also, add a flower to the top of every block!
        }
        GAME.addEntity(new Snake(Vector.blockToWorldSpace(new Vector(50, aboveGroundLevel))));
        GAME.addEntity(new Snake(Vector.blockToWorldSpace(new Vector(55, aboveGroundLevel))));
        GAME.addEntity(new Snake(Vector.blockToWorldSpace(new Vector(53, aboveGroundLevel))));
        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(60, aboveGroundLevel))));
        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(65, aboveGroundLevel))));
        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(70, aboveGroundLevel))));


        // Draw Sun.

        // Spawn Chad.
        if (LAST_ZONE.equals(Zone.getZones().village.mountain)) { // Coming from mountain.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 3, aboveGroundLevel);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.main)) { // Coming from main.
            // spawn on left.
            const blockPos = new Vector(95, aboveGroundLevel + 5);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };
    let makeClouds = true;
    let aboveGroundLevel = 10
    if (makeClouds) {
        let cloudNum = 10;
        let randomOrigin = (Math.random() * (0 + 100)) - 0;
        randomOrigin = randomOrigin % 10;


        for (let i = 0; i < cloudNum; i++) {
            let yVariation = Math.random() * (10 - 12) + 10;
            let xVariation = Math.random() * (8 - 12) + 10;
            if (i % 2 == 0) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD, Vector.blockToWorldSpace(new Vector(randomOrigin + xVariation * i, aboveGroundLevel - yVariation))), 0);
            } else if (i % 3 == 0) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.clouds.CLOUD_LANKY, Vector.blockToWorldSpace(new Vector(randomOrigin + xVariation * i, aboveGroundLevel - yVariation))), 0);
            } else {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.clouds.CLOUD_BUSHY, Vector.blockToWorldSpace(new Vector(randomOrigin + xVariation * i, aboveGroundLevel - yVariation))), 0);
            }
        }


    }
    STORY.huntingInvite = true;
    if (STORY.huntingInvite) {
        GAME.addEntity(new PapaChad(
            new Vector(ZONE.MAX_PT.x - 2 * PapaChad.SCALED_SIZE.x, ZONE.MAX_PT.y - 30 * Block.SCALED_SIZE),
            new Conversation(getAllConversationArrays().village.papaChad.huntingInstruction)
        ));
    }
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