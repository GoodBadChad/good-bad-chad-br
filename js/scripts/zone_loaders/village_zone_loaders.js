const loadVillageCanyon = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageField = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3.SPRITESHEET);
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
        ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);

    };

    const addEntities = () => {
        // Add a border to the right side of the map, leading to the village.
        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));

        new tilemapInterpreter(fieldTilemap);


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

const loadVillageInsideCave = () => {
    const queueAssets = () => {

    };

    const addEntities = () => {

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadVillageMain = () => {

    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3.SPRITESHEET);
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
        ASSET_MGR.queueDownload(BlackSmith.SPRITESHEET);
        ASSET_MGR.queueDownload(Mayor.SPRITESHEET);
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
    };

    const addEntities = () => {
        // let groundLevel = 18;
        let aboveGroundLevel = 17;
        // let skyHeight = 14;
        let chadOnGround = 10;
        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.field
        ));

        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.outsideCave
        ));
        // Add a layer of blocks to the floor.
        // for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
        //     GAME.addEntity(new Block(new Vector(x, ZONE.MAX_BLOCK.y), Block.DIRT));
        // }
        // TODO - make this its own class for interpreting the tile map so to clean up code.
        // const gamePos = Vector.blockToWorldSpace(new Vector(5, 15));
        // GAME.addEntity(new House(gamePos, 1));
        // Decorations
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE, Vector.blockToWorldSpace(new Vector(13, aboveGroundLevel))));

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_3, Vector.blockToWorldSpace(new Vector(8, aboveGroundLevel))), -1);
        for (let i = 0; i < 18; i++) {
            if (i % 2 == 0) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.POTATO, Vector.blockToWorldSpace(new Vector(27 + i * 1 / 5, aboveGroundLevel))), - 1);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.POTATO, Vector.blockToWorldSpace(new Vector(27 + i * 1 / 5, aboveGroundLevel))), - 1);
            } else {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.CARROT, Vector.blockToWorldSpace(new Vector(27 + i * 1 / 5, aboveGroundLevel))), - 1);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.CARROT, Vector.blockToWorldSpace(new Vector(27 + i * 1 / 5, aboveGroundLevel))), - 1);

            }
        }

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_1, Vector.blockToWorldSpace(new Vector(20, aboveGroundLevel))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.CHAD_HOUSE, Vector.blockToWorldSpace(new Vector(30, aboveGroundLevel))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_3, Vector.blockToWorldSpace(new Vector(39, aboveGroundLevel))), -1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.MAYOR_HOUSE, Vector.blockToWorldSpace(new Vector(48, aboveGroundLevel))));
        for (let i = 0; i < 5; i++) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_3, Vector.blockToWorldSpace(new Vector(49 + i * 1 / 4, aboveGroundLevel))), 0);

            if (i % 2 == 0) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_3, Vector.blockToWorldSpace(new Vector(55 + i * 1 / 2, aboveGroundLevel))), 0);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_3, Vector.blockToWorldSpace(new Vector(51 + i * 1 / 2, aboveGroundLevel))), 0);

            } else {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(55 + i * 1 / 2, aboveGroundLevel))), 0);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(51 + i * 1 / 2, aboveGroundLevel))), 0);
            }
        }

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_3, Vector.blockToWorldSpace(new Vector(55, aboveGroundLevel))), -1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.CHAD_HOUSE, Vector.blockToWorldSpace(new Vector(70, aboveGroundLevel))));

        for (let i = 0; i < 4; i++) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(75 + (1 / 2) * i, aboveGroundLevel))), 0);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(71.5 + (1 / 2) * i, aboveGroundLevel))), 0);

        }

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_3, Vector.blockToWorldSpace(new Vector(76, aboveGroundLevel))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_3, Vector.blockToWorldSpace(new Vector(79, aboveGroundLevel))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(82, aboveGroundLevel))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_2, Vector.blockToWorldSpace(new Vector(84, aboveGroundLevel))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(87, aboveGroundLevel))));

        // NPCs
        const blockPosPapa = new Vector(33, chadOnGround);
        const blockPosBlackSmith = new Vector(17, chadOnGround);
        const blockPosMayor = new Vector(50, chadOnGround);


        GAME.addEntity(new PapaChad(Vector.blockToWorldSpace(blockPosPapa), new Conversation(getAllConversationArrays().village.papaChad.huntingInvite)), 0);
        GAME.addEntity(new BlackSmith(Vector.blockToWorldSpace(blockPosBlackSmith), new Conversation(getAllConversationArrays().playground.papaChad.testNoChoices)), 0);
        GAME.addEntity(new Mayor(Vector.blockToWorldSpace(blockPosMayor), new Conversation(getAllConversationArrays().playground.papaChad.testNoChoices)), 0);


        let weather = "snow";
        let surfaceSnow = false;
        if (weather === "snow") {
            surfaceSnow = true
        }
        new tilemapInterpreter(villageMainTileMap, surfaceSnow);
        new WeatherSystem("snow", 5, "night");

        if (LAST_ZONE === null) { // We've just started the game.
            // Spawn in middle.
            const blockPos = new Vector(90, chadOnGround);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
            // console.log(CHAD.pos);

        } else if (LAST_ZONE.equals(Zone.getZones().village.field)) { // Coming from field.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_PT.x, chadOnGround + 5);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.outsideCave)) { // Coming from outside cave.
            // spawn on left.
            const blockPos = new Vector(98, 15);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }

        GAME.addEntity(new FoodDrop(FoodDrop.BACON, Vector.blockToWorldSpace(new Vector(20, aboveGroundLevel - 2))));
        GAME.addEntity(new Yeti(Vector.blockToWorldSpace(new Vector(20, aboveGroundLevel - 5))));

        // NOTE: we can't activate music until the user has interacted with the canvas. (this issue is inherent to HTML5)
        //  If listening for a click is the only way to activate music, that's fine. 
        //  Our game's START button in the final version can be the trigger.
        // let playMusic = () => {
        //     ASSET_MGR.playMusic(MUSIC.PEACEFUL_CHIPTUNE.path, MUSIC.PEACEFUL_CHIPTUNE.volume);

        //     // delete the event listener so that the music doesn't restart when the user presses a key
        //     document.body.removeEventListener('keydown', playMusic);
        // };
        // document.body.addEventListener('keydown', playMusic);

        LoadingAnimation.stop();
    };


    LoadingAnimation.start();
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
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3.SPRITESHEET);
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
        ASSET_MGR.queueDownload(BlackSmith.SPRITESHEET);
        ASSET_MGR.queueDownload(Mayor.SPRITESHEET);
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
    };

    const addEntities = () => {
        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));
        new tilemapInterpreter(outsideCaveTilemap, true);

        if (LAST_ZONE.equals(Zone.getZones().village.main)) { // Coming from main.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_PT.x, 15);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};