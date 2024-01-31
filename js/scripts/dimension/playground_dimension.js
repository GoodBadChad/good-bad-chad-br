
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
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);

        // queue music
        ASSET_MGR.queueDownload("./music/starting_off_2_sample.wav");

        // queue sound effects
        ASSET_MGR.queueDownload("./sfx/temp_jump.wav");
        ASSET_MGR.queueDownload("./sfx/slingshot_launch.wav");
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

                const pos = new Vector(j - 25, i - 25);
                switch (tileMap[i][j]) {
                    case 4:
                        console.log(4);
                        GAME.addEntity(new Block(pos, Block.LAVA_ROCK));
                        break;
                    case 3:
                        GAME.addEntity(new Block(pos, Block.SNOWY_ICE));
                        break;
                    case 2:
                        GAME.addEntity(new Block(pos, Block.SNOWY_DIRT));
                        break;
                    case 1:
                        GAME.addEntity(new Block(pos, Block.DIRT));
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

        // NOTE: we can't activate music until the user has interacted with the canvas. (this issue is inherent to HTML5)
        //  If listening for a click is the only way to activate music, that's fine. 
        //  Our game's START button in the final version can be the trigger.
        let playMusic = () => {
            ASSET_MGR.playAudio("./music/starting_off_2_sample.wav", 0.1, true);
        
            // delete the event listener so that the music doesn't restart when the user clicks again
            document.body.removeEventListener('click', playMusic);
        };
        
        document.body.addEventListener('click', playMusic);

        // NOTE: we can't activate music until the user has interacted with the canvas. (this issue is inherent to HTML5)
        //  If listening for a click is the only way to activate music, that's fine. 
        //  Our game's START button in the final version can be the trigger.
        playMusic = () => {
            ASSET_MGR.playAudio("./music/starting_off_2_sample.wav", 0.1, true);
        
            // delete the event listener so that the music doesn't restart when the user clicks again
            document.body.removeEventListener('click', playMusic);
        };
        
        document.body.addEventListener('click', playMusic);
      
        GAME.addEntity(new DialogBubble(CHAD, "Hey pal! My name's Papa Chad", DialogBubble.NORMAL));
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