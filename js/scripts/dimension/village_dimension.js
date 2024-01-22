const loadVillageDimension = () => {
    // Load the dialog.
    loadPlaygroundDialog();
    /**
     * This is going to queue only the spritesheets which i need for my dimension.
     * @author Devin Peevy, Caleb Krauter
     */
    const queueDimensionalAssets = () => {
        ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
        ASSET_MGR.queueDownload(Block.SPRITESHEET);
        // ASSET_MGR.queueDownload(BSHouse.SPRITESHEET);
    };
    /** 
     * This is going to add all of the entities to the GAME so that they are ready to be drawn. 
     * @author Devin Peevy 
     */
    const loadEntities = () => {
        // Make left side cliff
        for (let x = 0; x < 25; x++) {
            GAME.addEntity(new Block(x, 30, Block.DIRT));
            for (let y = 10; y < 50; y++) {
                if (x < 15 || y < 20 || y > 30) {
                    GAME.addEntity(new Block(x, y, Block.DIRT, false));
                }
            }
        }
        // Make mainland base
        for (let x = 40; x < 250; x++) {
            for (let y = 30; y < 50; y++) {
                let needsBB = false;
                if (y === 30) {
                    needsBB = true;
                }
                GAME.addEntity(new Block(x, y, Block.DIRT, needsBB));
            }
        }
        // Add first layer of village hill
        let x = 100;
        let y = 29;
        for (x; x <= 150; x++) {
            GAME.addEntity(new Block(x, y, Block.DIRT))
        }
        // second layer:
        x = 102;
        y = 28;
        for (x; x <= 147; x++) {
            GAME.addEntity(new Block(x, y, Block.DIRT))
        }
        // third and final:
        x = 106;
        y = 27;
        for (x; x <= 145; x++) {
            GAME.addEntity(new Block(x, y, Block.GRASS));
        }


        // The mountain in which the ice portal is encased.
        x = 220;
        y = 20;
        for (i = 0; i < 30; i++) {
            //GAME.addEntity(new Block(x + i, Math.max(10, y - i) + 1, Block.DIRT));
            GAME.addEntity(new Block(x + i, Math.max(0, y - i), Block.DIRT));
        }

        // The ledge upon which ice portal sits.
        x = 239;
        y = 20;
        for (x; x < 250; x++) {
            for (y; y < 30; y++) {
                console.log(x, y);
                GAME.addEntity(new Block(x, y, Block.DIRT));
            }
        }
        const point = { x: Block.SCALED_SIZE * 50, y: Block.SCALED_SIZE * 25 }
        CHAD.x = point.x;
        CHAD.y = point.y;
    };

    // GAME.addEntity(new BSHouse(120, 18));

    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });


    // for (let x = DIMENSION.MIN_BLOCK_X; x < DIMENSION.MAX_BLOCK_X; x++) {
    //             for (let y = DIMENSION.MIN_BLOCK_Y = 0; y < DIMENSION.MAX_BLOCK_; y++) {
    //                 // GAME.addEntity(new Block(i, j, Block.DIRT));a

    //                 switch (tileMap[i][j]) {
    //                     case 4:
    //                         console.log(4);
    //                         GAME.addEntity(new Block(x - 25, y - 25, Block.LAVA_ROCK));
    //                         break;
    //                     case 3:
    //                         GAME.addEntity(new Block(x - 25, y - 25, Block.SNOWY_ICE));
    //                         break;
    //                     case 2:
    //                         GAME.addEntity(new Block(x - 25, y - 25, Block.SNOWY_DIRT));
    //                         break;
    //                     case 1:
    //                         GAME.addEntity(new Block(x - 25, y - 25, Block.DIRT));
    //                         break;
    //                     case 0:
    //                         break;
    //                     default:
    //                         break;
    //                 }

    //             }


    //     };
    // GAME.addEntity(new Portal(new Vector(5, DIMENSION.BLOCK_HEIGHT - 2), Dimension.PLAYGROUND));
    // CHAD.x = 0;
    // CHAD.y = 0;
    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });
};
