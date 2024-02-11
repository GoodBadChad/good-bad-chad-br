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
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER.SPRITESHEET);
    };

    const addEntities = () => {
        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(-1, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.main
        ));


        // Add 10 layers of blocks to the bottom
        for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
            for (let y = ZONE.MAX_BLOCK.y; y >= ZONE.MAX_BLOCK.y - 10; y--) {
                const type = y === ZONE.MAX_BLOCK.y - 10 ? Block.GRASS : Block.DIRT;
                GAME.addEntity(new Block(new Vector(x, y), type));
            }
            // Also, add a flower to the top of every block!
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER, Vector.blockToWorldSpace(new Vector(x, ZONE.MAX_BLOCK.y - 10))));
        }

        // Draw Sun.

        // Spawn Chad.
        if (LAST_ZONE.equals(Zone.getZones().village.mountain)) { // Coming from mountain.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 3, 12);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.main)) { // Coming from main.
            // spawn on left.
            const blockPos = new Vector(1, 12);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };

    // Set background color:
    BG_COLOR = 'red';

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
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.CHAD_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.MAYOR_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.OAK_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.MED_RED_FLOWER.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.PRIDE_FLOWER.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.CARROT.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.flowers.POTATO.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_1.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.trees.SPRUCE_3.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_BUSHY.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.clouds.CLOUD_LANKY.SPRITESHEET);
        // ASSET_MGR.queueDownload(Rain.SPRITESHEET);
        ASSET_MGR.queueDownload(Rain.SPRITESHEET_DOWN);
        ASSET_MGR.queueDownload(Rain.SPRITESHEET_LEFT);
        ASSET_MGR.queueDownload(Rain.SPRITESHEET_RIGHT);


        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
    };

    const addEntities = () => {
        let groundLevel = 18;
        let aboveGroundLevel = 22;
        let skyHeight = 14;
        let chadOnGround = 19;
        // Add a border to the right side of the map, leading to the field.
        GAME.addEntity(new Border(
            new Vector(ZONE.MAX_PT.x, 0), // start at the far right side of the Zone, and at the top
            new Vector(1, ZONE.PIXEL_SIZE.y), // only one pixel wide, but as tall as the entire Zone.
            Zone.getZones().village.field
        ));
        // Add a layer of blocks to the floor.
        // for (let x = ZONE.MIN_BLOCK.x; x <= ZONE.MAX_BLOCK.x; x++) {
        //     GAME.addEntity(new Block(new Vector(x, ZONE.MAX_BLOCK.y), Block.DIRT));
        // }
        for (let y = ZONE.MAX_BLOCK.y; y >= ZONE.MIN_BLOCK.y; y--) {
            for (let x = ZONE.MAX_BLOCK.x; x >= ZONE.MIN_BLOCK.x; x--) {
                // GAME.addEntity(new Block(i, j, Block.DIRT));a

                // const pos = new Vector(y, x);
                // console.log('Starting block x ' + x);
                // console.log('Starting block y ' + y);

                switch (villageMainTileMap[y][x]) {

                    case 'j':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_SPRUCE_STAIRS_RIGHT));
                        break;
                    case 'i':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_SPRUCE_STAIRS_LEFT));
                        break;
                    case 'h':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_OAK_STAIRS_RIGHT), 0);
                        break;
                    case 'g':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_OAK_STAIRS_LEFT), -1);
                        break;
                    case 'f':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE_VOLCANIC));
                        break;
                    case 'e':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE_DARK));
                        break;
                    case 'd':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE));
                        break;
                    case 'c':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_REDWOOD_LIGHT));
                        break;
                    case 'b':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_REDWOOD));
                        break;
                    case 'a':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LOG_SPRUCE_VIRTICAL));
                        break;
                    case '9':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LOG_SPRUCE_HORIZONTAL));
                        break;
                    case '8':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_SPRUCE));
                        break;
                    case '7':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_OAK));
                        break;
                    case '6':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BARS));
                        break;
                    case '5':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LAVA_ROCK));
                        break;
                    case '4':
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_ICE));
                        break;
                    case '3':
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_DIRT));
                        break;
                    case '2':
                        GAME.addEntity(new Block(new Vector(x, y), Block.GRASS));
                        break;
                    case '1':
                        GAME.addEntity(new Block(new Vector(x, y), Block.DIRT), -1);
                        break;

                    default:
                        break;
                }
            }

        }

        // const gamePos = Vector.blockToWorldSpace(new Vector(5, 15));
        // GAME.addEntity(new House(gamePos, 1));
        // Decorations
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.BLACKSMITH_HOUSE, Vector.blockToWorldSpace(new Vector(13, aboveGroundLevel))));

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_3, Vector.blockToWorldSpace(new Vector(8, aboveGroundLevel))), -1);
        for (let i = 0; i < 18; i++) {
            if (i % 2 == 0) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.POTATO, Vector.blockToWorldSpace(new Vector(10.5 + i * 1 / 5, aboveGroundLevel))), - 1);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.POTATO, Vector.blockToWorldSpace(new Vector(10.5 + i * 1 / 5, aboveGroundLevel))), - 1);
            } else {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.CARROT, Vector.blockToWorldSpace(new Vector(10.5 + i * 1 / 5, aboveGroundLevel))), - 1);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.CARROT, Vector.blockToWorldSpace(new Vector(10.5 + i * 1 / 5, aboveGroundLevel))), - 1);

            }
        }

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_1, Vector.blockToWorldSpace(new Vector(20, aboveGroundLevel))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.CHAD_HOUSE, Vector.blockToWorldSpace(new Vector(30, aboveGroundLevel))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_3, Vector.blockToWorldSpace(new Vector(39, aboveGroundLevel))), -1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.MAYOR_HOUSE, Vector.blockToWorldSpace(new Vector(48, aboveGroundLevel))));
        for (let i = 0; i < 5; i++) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.PRIDE_FLOWER, Vector.blockToWorldSpace(new Vector(49 + i * 1 / 4, aboveGroundLevel))), 0);

            if (i % 2 == 0) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER, Vector.blockToWorldSpace(new Vector(55 + i * 1 / 2, aboveGroundLevel))), 0);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.MED_RED_FLOWER, Vector.blockToWorldSpace(new Vector(51 + i * 1 / 2, aboveGroundLevel))), 0);

            } else {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER, Vector.blockToWorldSpace(new Vector(55 + i * 1 / 2, aboveGroundLevel))), 0);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER, Vector.blockToWorldSpace(new Vector(51 + i * 1 / 2, aboveGroundLevel))), 0);
            }
        }

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.OAK_3, Vector.blockToWorldSpace(new Vector(55, aboveGroundLevel))), -1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.houses.CHAD_HOUSE, Vector.blockToWorldSpace(new Vector(70, aboveGroundLevel))));

        for (let i = 0; i < 4; i++) {
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER, Vector.blockToWorldSpace(new Vector(75 + (1 / 2) * i, aboveGroundLevel))), 0);
            GAME.addEntity(new Decoration(Decoration.DECORATIONS.flowers.TALL_PURPLE_FLOWER, Vector.blockToWorldSpace(new Vector(71.5 + (1 / 2) * i, aboveGroundLevel))), 0);

        }

        // Add rain 3/5 chance that rain will go down and not left or right.
        let dir = ["left", "down", "right", "down", "down"];
        let rainStrength = [2, 5, 10, 20, 25, 30];
        let dirIndex = Math.floor(Math.random() * dir.length);
        let strengthIndex = Math.floor(Math.random() * rainStrength.length);
        // chance of rain TODO make it rain only if there are clouds.
        let makeRain = false;
        makeRain = Math.random() < .4 ? true : false;
        let hot = Math.random() < .9 ? true : false;
        let makeClouds = Math.random() < .7 ? true : false;

        if (!makeRain && !makeClouds) {
            if (hot) {
                BG_COLOR = COLORS.SKY_HOT_BLUE_SKY;
                GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100), Sun.LAVA), 0);

            }
        } else {
            BG_COLOR = COLORS.SKY_BLUE;
            GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100), Sun.VILLAGE), 0);
        }

        if (makeClouds) {
            if (makeRain) {
                BG_COLOR = COLORS.SKY_GREY;
                console.log(dirIndex);
                for (let j = 0; j < rainStrength[strengthIndex]; j++) {
                    for (let i = 0; i < 20; i++) {
                        // 960 - CHAD.pos.x, CHAD.pos.y - 1080
                        GAME.addEntity(new Rain(dir[dirIndex], Vector.blockToWorldSpace(new Vector(i, i - 10))), 1);
                        GAME.addEntity(new Rain(dir[dirIndex], Vector.blockToWorldSpace(new Vector(i, i - 10))), 1);
                        GAME.addEntity(new Rain(dir[dirIndex], Vector.blockToWorldSpace(new Vector(i, i - 10))), 1);
                        GAME.addEntity(new Rain(dir[dirIndex], Vector.blockToWorldSpace(new Vector(i, i - 10))), 1);
                    }
                }
                // console.log(strengthIndex);
            }
            let cloudNum = (Math.random() * (8 + 20)) - 3;
            let randomOrigin = (Math.random() * (0 + 100)) - 0;
            randomOrigin = randomOrigin % cloudNum;
            for (let i = 0; i < cloudNum; i++) {
                let chooseForGround = Math.random();
                chooseForGround = chooseForGround < 0.5 ? -1 : 0;
                let yVariation = Math.random() * (10 - 12) + 10;
                let xVariation = Math.random() * (8 - 12) + 8;
                // console.log(chooseForGround);
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.clouds.CLOUD_BUSHY, Vector.blockToWorldSpace(new Vector(randomOrigin + xVariation * i, aboveGroundLevel - yVariation))), chooseForGround);
            }
            cloudNum = (Math.random() * (3 + 10)) - 3;

            for (let i = 0; i < cloudNum; i++) {
                let chooseForGround = Math.random();
                chooseForGround = chooseForGround < 0.5 ? -1 : 0;
                let yVariation = Math.random() * (10 - 12) + 10;
                let xVariation = Math.random() * (8 - 12) + 8;
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.clouds.CLOUD_LANKY, Vector.blockToWorldSpace(new Vector(randomOrigin + 5 + xVariation * i, aboveGroundLevel - yVariation))), chooseForGround);
            }
            cloudNum = (Math.random() * (3 + 10)) - 3;

            for (let i = 0; i < cloudNum; i++) {
                let chooseForGround = Math.random();
                chooseForGround = chooseForGround < 0.5 ? -1 : 0;
                let yVariation = Math.random() * (10 - 12) + 10;
                let xVariation = Math.random() * (8 - 12) + 8;
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD, Vector.blockToWorldSpace(new Vector(randomOrigin + 10 + xVariation * i, aboveGroundLevel - yVariation))), chooseForGround);
            }
        }

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_3, Vector.blockToWorldSpace(new Vector(76, aboveGroundLevel))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_3, Vector.blockToWorldSpace(new Vector(79, aboveGroundLevel))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(82, aboveGroundLevel))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_2, Vector.blockToWorldSpace(new Vector(84, aboveGroundLevel))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.trees.SPRUCE_1, Vector.blockToWorldSpace(new Vector(87, aboveGroundLevel))));

        // NPCs
        GAME.addEntity(new PapaChad(new Vector(500, 1050), false), 0);






        // Place chad.
        if (LAST_ZONE === null) { // We've just started the game.
            // Spawn in middle.
            const blockPos = new Vector(80, chadOnGround);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
            // console.log(CHAD.pos);

        } else if (LAST_ZONE.equals(Zone.getZones().village.field)) { // Coming from field.
            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MAX_BLOCK.x - 3, aboveGroundLevel);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        } else if (LAST_ZONE.equals(Zone.getZones().village.outsideCave)) { // Coming from outside cave.
            // spawn on left.
            const blockPos = new Vector(1, 20);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };
    // Set Background Color:

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