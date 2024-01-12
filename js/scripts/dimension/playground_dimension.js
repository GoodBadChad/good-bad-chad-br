/** 
 * The purpose of this script is to load the Playground Dimension.
 * The Playground dimension is used for developers to test things out.
 * A couple ground rules:
 *  - label the methods you write in it with your @ author tag.
 *  - feel free to add/modify your own methods, as well as comment out/move those of others.
 *  - please DO NOT delete the methods of others without permission.
 *  - please DO delete your own methods that are no longer relevant.
 */

/**
 * Loads the playground dimension.
 * @author Devin Peevy
 */
const loadPlaygroundDimension = () => {
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
        // Add all entities to game.
        //GAME.addEntity(new Block(-1, -1, Block.DIRT));
        for (i = -15; i < -10; i++) {
            GAME.addEntity(new Block(i, 0, Block.DIRT));
        }
        for (i = 10; i < 15; i++) {
            GAME.addEntity(new Block(i, 0, Block.DIRT));
        }
        for (i = -10; i < -5; i++) {
            GAME.addEntity(new Block(i, 5, Block.DIRT));
        }
        for (i = 5; i < 10; i++) {
            GAME.addEntity(new Block(i, 5, Block.DIRT));
        }
        for (i = -15; i < 15; i++) {
            GAME.addEntity(new Block(i, 10, Block.DIRT));
        }
        // Place Chad so my camera is good.
        CHAD.x = 0;
        CHAD.y = 10 * Block.SCALED_SIZE;
    };

    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });
};