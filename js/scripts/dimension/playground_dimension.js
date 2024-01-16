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
        ASSET_MGR.queueDownload(Projectile.SPRITESHEET);
        ASSET_MGR.queueDownload(DialogBubble.SPRITESHEET);
        ASSET_MGR.queueDownload(Crosshair.SPRITESHEET);
    };

    /** 
     * This is going to add all of the entities to the GAME so that they are ready to be drawn. 
     * @author Devin Peevy 
     */
    const loadEntities = () => {
        let left = true;
        for (let i = -22; i <= 25; i += 5) {
            if (left) {
                for (let j = -1; j >= -25; j--) {
                    GAME.addEntity(new Block(j, i, Block.DIRT));
                }
                left = false;
            } else {
                for (let j = 0; j <= 25; j++) {
                    GAME.addEntity(new Block(j, i, Block.DIRT));
                }
                left = true;
            }
        }
        // Surround the border of the dimension.
        for (let i = -25; i < 25; i++) {
            GAME.addEntity(new Block(i, -25, Block.LAVA_ROCK));
            GAME.addEntity(new Block(i, 24, Block.SNOWY_DIRT));
            GAME.addEntity(new Block(-25, i, Block.ICE));
            GAME.addEntity(new Block(24, i, Block.SNOWY_ICE));
        }
        GAME.addEntity(new Portal(10, -10, Dimension.LAVA));
        GAME.addEntity(new Projectile(Projectile.BOMB, -192, -1280, 200, -1280));
        GAME.addEntity(new DialogBubble(CHAD, "Hello, I am Papa Chad", DialogBubble.NORMAL));
        GAME.addEntity(new Crosshair());
        CHAD.x = -3 * Block.SCALED_SIZE;
        CHAD.y = -20 * Block.SCALED_SIZE;
    };

    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });
};