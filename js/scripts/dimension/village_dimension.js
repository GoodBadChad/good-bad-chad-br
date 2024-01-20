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
    };
    /** 
     * This is going to add all of the entities to the GAME so that they are ready to be drawn. 
     * @author Devin Peevy 
     */
    const loadEntities = () => {
        // for (let x = DIMENSION.MIN_BLOCK_X; x < DIMENSION.MAX_BLOCK_X; x++) {
        //     for (let y = DIMENSION.MIN_BLOCK_Y = 0; y < DIMENSION.MAX_BLOCK_; y++) {
        //         // GAME.addEntity(new Block(i, j, Block.DIRT));a

        //         switch (tileMap[i][j]) {
        //             case 4:
        //                 console.log(4);
        //                 GAME.addEntity(new Block(x - 25, y - 25, Block.LAVA_ROCK));
        //                 break;
        //             case 3:
        //                 GAME.addEntity(new Block(x - 25, y - 25, Block.SNOWY_ICE));
        //                 break;
        //             case 2:
        //                 GAME.addEntity(new Block(x - 25, y - 25, Block.SNOWY_DIRT));
        //                 break;
        //             case 1:
        //                 GAME.addEntity(new Block(x - 25, y - 25, Block.DIRT));
        //                 break;
        //             case 0:
        //                 break;
        //             default:
        //                 break;
        //         }

        //     }
        // }
        GAME.addEntity(new Portal(new Vector(5, DIMENSION.BLOCK_HEIGHT - 2), Dimension.PLAYGROUND));
        CHAD.x = 0;
        CHAD.y = 0;
    };

    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });
};