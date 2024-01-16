const loadLavaDimension = () => {
    // Load the dialog.
    loadPlaygroundDialog();
    /**
     * This is going to queue only the spritesheets which i need for my dimension.
     * @author Devin Peevy
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
        for (let i = 0; i < DIMENSION.BLOCK_WIDTH; i++) {
            GAME.addEntity(new Block(i, DIMENSION.BLOCK_HEIGHT - 1, Block.LAVA_ROCK))
        }
        GAME.addEntity(new Portal(5, DIMENSION.BLOCK_HEIGHT - 2, Dimension.PLAYGROUND));
        CHAD.x = 0;
        CHAD.y = 0;
    };

    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });
};