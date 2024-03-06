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
        ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);

    };

    const addEntities = () => {
        // Add a border to the right side of the map, leading to the village.
        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.main
        ));

        TilemapInterpreter.setTilemap(fieldTilemap);


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


    GAME.addEntity(new AmmoDrop(
        Vector.blockToWorldSpace(new Vector(74, aboveGroundLevel - 2)),
        AmmoDrop.BOMB,
        3,
        false
    ));

    GAME.addEntity(new AmmoDrop(
        Vector.blockToWorldSpace(new Vector(78.5, aboveGroundLevel + 2)),
        AmmoDrop.SUS_SNOWBALL,
        1,
        false
    ));


    GAME.addEntity(new AmmoDrop(
        Vector.blockToWorldSpace(new Vector(80, aboveGroundLevel + 2)),
        AmmoDrop.SNOWBALL,
        4,
        false
    ));


    GAME.addEntity(new FoodDrop(
        Vector.blockToWorldSpace(new Vector(73, aboveGroundLevel + 4.7)),
        FoodDrop.BURGER,
        false
    ));

    // Set background color:
    BG_COLOR = COLORS.SKY_BLUE;
    GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100), Sun.VILLAGE), -1);

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};



const loadVillageMain = () => {

    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_1.SPRITESHEET);

        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.CHAD_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.MAYOR_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Precipitation.SPRITESHEET);


        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_1.SPRITESHEET);
        // NPCs
        ASSET_MGR.queueDownload(BlackSmith.SPRITESHEET);
        ASSET_MGR.queueDownload(Mayor.SPRITESHEET);
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
        ASSET_MGR.queueDownload('./sprites/mama_chad_trapped.png');
        ASSET_MGR.queueDownload(Wizard.SPRITESHEET);
    };

    const addEntities = () => {
        // let groundLevel = 18;
        let aboveGroundLevel = 17;
        // let skyHeight = 14;
        let chadOnGround = 10;
        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.field
        ));

        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.hillDownFromMain
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
        const blockPosMama = new Vector(65, chadOnGround + 1);
        const blockPosWizard = new Vector(63, chadOnGround);
        const blockPosIdleMama = new Vector(37, chadOnGround);

        const idleMama = new MamaChad(Vector.blockToWorldSpace(blockPosIdleMama), false, new Conversation(getAllConversationArrays().village.mamaChad.goodMorning));
        idleMama.action = "idle";

        GAME.addEntity(new PapaChad(Vector.blockToWorldSpace(blockPosPapa), new Conversation(getAllConversationArrays().village.papaChad.huntingInvite)), 0);
        GAME.addEntity(new BlackSmith(Vector.blockToWorldSpace(blockPosBlackSmith), new Conversation(getAllConversationArrays().village.blacksmith.merchant)), 0);
        GAME.addEntity(new Mayor(Vector.blockToWorldSpace(blockPosMayor), new Conversation(getAllConversationArrays().village.mayor.hopefulGreeting)), 0);
        // TODO add these in after you get back from the field.
        // GAME.addEntity(new MamaChad(Vector.blockToWorldSpace(blockPosMama)));
        // GAME.addEntity(new Wizard(Vector.blockToWorldSpace(blockPosWizard)));
        GAME.addEntity(idleMama);

        let weather = "warm";
        let surfaceSnow = false;
        if (weather === "snow") {
            surfaceSnow = true
        }
        TilemapInterpreter.setTilemap(villageMainTileMap, surfaceSnow);
        WeatherSystem.setWeather(weather, 5, "day");

        if (LAST_ZONE === null) {
            // Spawn in middle.
            const blockPos = new Vector(70, chadOnGround);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
            // console.log(CHAD.pos);

        } else if (LAST_ZONE.equals(Zone.getZones().village.field)) {
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_PT.x, chadOnGround + 5);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.hillDownFromMain)) {
            const blockPos = new Vector(98, 16);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }




        // draw portal

        // const portal = new Portal(new Vector(6, 13.5), Portal.YELLOW);
        // GAME.addEntity(portal);
        // portal.fillWithEnemies([new DrillBot(Vector.blockToWorldSpace(new Vector(15, aboveGroundLevel - 5))), 
        //                         new Yeti(Vector.blockToWorldSpace(new Vector(15, aboveGroundLevel - 5))),
        //                         new Yeti(Vector.blockToWorldSpace(new Vector(15, aboveGroundLevel - 5))),]);




        // NOTE: we can't activate music until the user has interacted with the canvas. (this issue is inherent to HTML5)
        //  If listening for a click is the only way to activate music, that's fine. 
        //  Our game's START button in the final version can be the trigger.
        // let playMusic = () => {
        //     // ASSET_MGR.playMusic(MUSIC.HIGH_ENERGY.path, MUSIC.HIGH_ENERGY.volume);
        //     // ASSET_MGR.playMusic(MUSIC.VILLAGE_SIMPLE_LIFE.path, MUSIC.VILLAGE_SIMPLE_LIFE.volume);
        //     ASSET_MGR.playMusic(MUSIC.PEACEFUL_CHIPTUNE.path, MUSIC.PEACEFUL_CHIPTUNE.volume);


        //     // delete the event listener so that the music doesn't restart when the user presses a key
        //     document.body.removeEventListener('keydown', playMusic);
        // };
        // document.body.addEventListener('keydown', playMusic);

        ASSET_MGR.playMusic(MUSIC.PEACEFUL_CHIPTUNE.path, MUSIC.PEACEFUL_CHIPTUNE.volume);


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

const loadHillDownFromMain = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_1.SPRITESHEET);

        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.CHAD_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.MAYOR_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Precipitation.SPRITESHEET);


        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Bird.SPRITESHEET);
        ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);
        // NPCs
        ASSET_MGR.queueDownload(BlackSmith.SPRITESHEET);
        ASSET_MGR.queueDownload(Mayor.SPRITESHEET);
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
    };

    const addEntities = () => {
        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.main
        ));

        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.woods
        ));
        TilemapInterpreter.setTilemap(hillDownFromMainTilemap);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(-3.5, 30))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(-1.5, 30))), -1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(1, 30))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(7, 32))), -1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(10, 34))), -1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_2, Vector.blockToWorldSpace(new Vector(20, 45))), -1);


        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(72, 45))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_4, Vector.blockToWorldSpace(new Vector(70, 45))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_2, Vector.blockToWorldSpace(new Vector(65, 45))), -1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_4, Vector.blockToWorldSpace(new Vector(58, 45))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_4, Vector.blockToWorldSpace(new Vector(50, 45))), 1);

        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(70, 42))));
        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(40, 42))));
        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(41, 42))));

        // TODO add in birds.
        // for (let i = 0; i < 10000; i++) {
        //     GAME.addEntity(new Bird(ZONE.MIN_PT.x, i, ZONE.MAX_PT.x, ZONE.MAX_PT.y))

        // // }
        // GAME.addEntity(new FoodDrop(FoodDrop.CHICKEN, Vector.blockToWorldSpace(new Vector(8, 8))), -1);

        // GAME.addEntity(new FoodDrop(FoodDrop.ENERGY_DRINK, Vector.blockToWorldSpace(new Vector(49, 25))));
        // GAME.addEntity(new FoodDrop(FoodDrop.STEAK, Vector.blockToWorldSpace(new Vector(39, 37))));
        // GAME.addEntity(new FoodDrop(FoodDrop.CHICKEN, Vector.blockToWorldSpace(new Vector(61.6, 18.7))), -1);
        GAME.addEntity(new FoodDrop(
            Vector.blockToWorldSpace(new Vector(8, 8), -1),
            FoodDrop.CHICKEN,
            false
        ));

        GAME.addEntity(new FoodDrop(
            Vector.blockToWorldSpace(new Vector(49, 25)),
            FoodDrop.ENERGY_DRINK,
            false
        ));

        GAME.addEntity(new FoodDrop(
            Vector.blockToWorldSpace(new Vector(39, 37)),
            FoodDrop.STEAK,
            false
        ));
        GAME.addEntity(new FoodDrop(
            Vector.blockToWorldSpace(new Vector(61.6, 18.7), -1),
            FoodDrop.CHICKEN,
            false
        ));

        // TODO add ammo here instead.
        GAME.addEntity(new FoodDrop(
            Vector.blockToWorldSpace(new Vector(51, 7.5), -1),
            FoodDrop.BURGER,
            false
        ));

        for (let i = 0; i < 3; i++) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(67 + 5 * (1 / 2) * i, 45))), -1);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_3, Vector.blockToWorldSpace(new Vector(71 + 2 * (1 / 2) * i, 45))), 1);

        }
        let cloudTypeLanky = Decoration.DECORATIONS.clouds.CLOUD_LANKY;
        let cloudTypeBushy = Decoration.DECORATIONS.clouds.CLOUD_BUSHY;
        let weatherType = "rain";
        if (weatherType === "rain") {
            cloudTypeLanky = Decoration.DECORATIONS.clouds.CLOUD_LANKY_DARK;
            cloudTypeBushy = Decoration.DECORATIONS.clouds.CLOUD_BUSHY_DARK;

        }
        GAME.addEntity(new Decoration(cloudTypeLanky, Vector.blockToWorldSpace(new Vector(8, 12))), 1);
        for (let i = 0; i < 3; i++) {
            GAME.addEntity(new Block(new Vector(8 + i, 10), Block.HIDDEN_BLOCK_CLOUD));

        }
        GAME.addEntity(new Decoration(cloudTypeLanky, Vector.blockToWorldSpace(new Vector(60, 25))), 1);
        for (let i = 0; i < 3; i++) {
            GAME.addEntity(new Block(new Vector(60 + i, 23), Block.HIDDEN_BLOCK_CLOUD));

        }
        GAME.addEntity(new Decoration(cloudTypeLanky, Vector.blockToWorldSpace(new Vector(65, 20))), 1);
        for (let i = 0; i < 3; i++) {
            GAME.addEntity(new Block(new Vector(65 + i, 18), Block.HIDDEN_BLOCK_CLOUD));

        }
        GAME.addEntity(new Decoration(cloudTypeLanky, Vector.blockToWorldSpace(new Vector(55, 15))), 1);
        for (let i = 0; i < 3; i++) {
            GAME.addEntity(new Block(new Vector(55 + i, 13), Block.HIDDEN_BLOCK_CLOUD));

        }
        GAME.addEntity(new Decoration(cloudTypeBushy, Vector.blockToWorldSpace(new Vector(50, 10))), 1);
        for (let i = 0; i < 3; i++) {
            GAME.addEntity(new Block(new Vector(50 + i, 8), Block.HIDDEN_BLOCK_CLOUD));

        }



        if (LAST_ZONE.equals(Zone.getZones().village.main)) {
            // if (LAST_ZONE === null) { // Coming from main.
            // Set spawn point on the right.
            const blockPos = new Vector(1, 26);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.main)) { // Coming from main.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_PT.x, 26);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.woods)) { // Coming from main.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 2, 41);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
        WeatherSystem.setWeather("rain", 3, "day");

    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};

const loadWoods = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY_DARK.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.grass.GRASS_1.SPRITESHEET);

        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.CHAD_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.MAYOR_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Precipitation.SPRITESHEET);


        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_1.SPRITESHEET);

        ASSET_MGR.queueDownload(Bird.SPRITESHEET);
        ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);
        ASSET_MGR.queueDownload(Slime.SPRITESHEET);

        // NPCs
        ASSET_MGR.queueDownload(BlackSmith.SPRITESHEET);
        ASSET_MGR.queueDownload(Mayor.SPRITESHEET);
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
    };

    const addEntities = () => {

        GAME.addEntity(new Border(
            new Vector(ZONE.MIN_PT.x, 0),
            new Vector(1, ZONE.PIXEL_SIZE.y),
            Zone.getZones().village.hillDownFromMain
        ));
        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().river.river1
        ));
        TilemapInterpreter.setTilemap(woodsTilemap);
        let treeDistOffset = 0;
        let zLayer = 0;
        for (let i = 0; i < 150; i++) {
            // if (i % 5 == 0) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_4, Vector.blockToWorldSpace(new Vector(i * (i - treeDistOffset), 20))), zLayer);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_5, Vector.blockToWorldSpace(new Vector(i * (i - treeDistOffset - 15), 20))), zLayer);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_0, Vector.blockToWorldSpace(new Vector((i + 3.5) * (i - treeDistOffset), 20))), 1);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_1, Vector.blockToWorldSpace(new Vector((i + 7.5) * (i - treeDistOffset), 20))), 1);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER_2, Vector.blockToWorldSpace(new Vector((i + 12) * (i - treeDistOffset), 20))), zLayer);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector((i + 12) * (i - treeDistOffset), 20))), zLayer);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector((i + 5) * (i - treeDistOffset), 20))), zLayer);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector((i + 2) * (i - treeDistOffset), 20))), zLayer);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector((i + 17) * (i - treeDistOffset), 20))), zLayer);
        }

        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(10, 18))));
        GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(20, 18))));

        let distanceOffset = 1;
        for (let i = 0; i < 25; i++) {
            if (i % 5 == 0) {
                distanceOffset *= 5;
                GAME.addEntity(new Bunny(Vector.blockToWorldSpace(new Vector(i + distanceOffset, 18))));

            }
            GAME.addEntity(new Snake(Vector.blockToWorldSpace(new Vector(i + distanceOffset + 50, 18))));

            GAME.addEntity(new Slime(Vector.blockToWorldSpace(new Vector((i + distanceOffset + 25), 18))));
        }

        for (let i = 0; i < 100; i++) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(i * 10, 20))), -1);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_3, Vector.blockToWorldSpace(new Vector(i * 8, 20))), -1);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.CARROT, Vector.blockToWorldSpace(new Vector(i * 9, 20))), 0);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.POTATO, Vector.blockToWorldSpace(new Vector(i * 11, 20))), 0);


        }
        WeatherSystem.setWeather("rain", 5, "night", 22);

        if (LAST_ZONE.equals(Zone.getZones().village.hillDownFromMain)) { // Coming from main.
            // Set spawn point on the right.
            // if (LAST_ZONE === null) { // Coming from main.

            const blockPos = new Vector(1, 16);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().river.river1)) { // Coming from main.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 2, 15);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }


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