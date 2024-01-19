
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
 * @author Devin Peevy, Caleb Krauter
*/
const loadPlaygroundDimension = () => {

    let tileMap = playGroundTileMap();
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
        ASSET_MGR.queueDownload(Slingshot.SPRITESHEET);
    };

    /** 
     * This is going to add all of the entities to the GAME so that they are ready to be drawn. 
     * @author Devin Peevy, Caleb Krauter
     */
    const loadEntities = () => {
        // Surround the border of the dimension.
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                // GAME.addEntity(new Block(i, j, Block.DIRT));a

                switch (tileMap[i][j]) {
                    case 4:
                        console.log(4);
                        GAME.addEntity(new Block(j - 25, i - 25, Block.LAVA_ROCK));
                        break;
                    case 3:
                        GAME.addEntity(new Block(j - 25, i - 25, Block.SNOWY_ICE));
                        break;
                    case 2:
                        GAME.addEntity(new Block(j - 25, i - 25, Block.SNOWY_DIRT));
                        break;
                    case 1:
                        GAME.addEntity(new Block(j - 25, i - 25, Block.DIRT));
                        break;
                    case 0:
                        break;
                    default:
                        break;
                }

            }
        }

        tileMap[30][30] = 4;
        GAME.addEntity(new Portal(10, -10, Dimension.LAVA));
        GAME.addEntity(new Portal(10, -15, Dimension.VILLAGE));

        // GAME.addEntity(new Projectile(Projectile.BOMB, -192, -1280, 200, -1280));
        GAME.addEntity(new DialogBubble(CHAD, "Greetings! I am the one and only Papa Chad", DialogBubble.NORMAL));
        GAME.addEntity(new Crosshair());
        GAME.addEntity(new Slingshot());

        CHAD.x = -3 * Block.SCALED_SIZE;
        CHAD.y = -20 * Block.SCALED_SIZE;
    };

    queueDimensionalAssets();
    ASSET_MGR.downloadAll(() => {
        loadEntities();
    });
};