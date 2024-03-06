
const loadInsideCave2 = () => {
    const queueAssets = () => {
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.lighting.LANTERN.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.lighting.DARK.SPRITESHEET);

        ASSET_MGR.queueDownload(Precipitation.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_1.SPRITESHEET);

        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_2.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_3.SPRITESHEET);

        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_4.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_5.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_6.SPRITESHEET);
        ASSET_MGR.queueDownload(Decoration.DECORATIONS.crystals.CRYSTALS_11.SPRITESHEET);


        // NPCs
        ASSET_MGR.queueDownload(Bird.SPRITESHEET);
        ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
        ASSET_MGR.queueDownload(Snake.SPRITESHEET);
        ASSET_MGR.queueDownload(DrillBot.SPRITESHEET);

    };

    const addEntities = () => {
        // GAME.addEntity(new Border(
        //     new Vector(ZONE.MIN_PT.x, 0),
        //     new Vector(1, ZONE.PIXEL_SIZE.y),
        //     Zone.getZones().cave.slope2
        // ));

        BG_COLOR = COLORS.DARK_CAVE_PURPLE;


        for (let i = -1; i < 10; i++) {
            for (let j = -1; j < 11; j++) {
                GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.DARK, Vector.blockToWorldSpace(new Vector(i * 10, j * 10))), 1);

            }
        }
        const yLanternOffset = -13;
        const xLanternOffset = 3;
        ;
        GAME.addEntity(new Block(new Vector(9 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(9 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(10 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(10 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(30 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(30 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(31 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(31 + xLanternOffset, 29 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(40 + xLanternOffset, 27 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(40 + xLanternOffset, 27 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(41 + xLanternOffset, 27 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(41 + xLanternOffset, 27 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(13 + xLanternOffset, 23 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(13 + xLanternOffset, 23 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Block(new Vector(14 + xLanternOffset, 23 + yLanternOffset), Block.CAVE_2));
        GAME.addEntity(new Block(new Vector(14 + xLanternOffset, 23 + yLanternOffset), Block.CAVE_2), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(9, 29))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(30, 29))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(13, 23))), 1);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(30, 29))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.lighting.LANTERN, Vector.blockToWorldSpace(new Vector(40, 27))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_2, Vector.blockToWorldSpace(new Vector(50, 50))));

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_1, Vector.blockToWorldSpace(new Vector(0, 50))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_4, Vector.blockToWorldSpace(new Vector(0, 29))), -1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_5, Vector.blockToWorldSpace(new Vector(2, 31))), 1);
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_6, Vector.blockToWorldSpace(new Vector(5, 33))), 0);

        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_7, Vector.blockToWorldSpace(new Vector(25, 48))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_8, Vector.blockToWorldSpace(new Vector(30, 48))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_9, Vector.blockToWorldSpace(new Vector(28, 48))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_10, Vector.blockToWorldSpace(new Vector(40, 48))));
        GAME.addEntity(new Decoration(Decoration.DECORATIONS.crystals.CRYSTALS_11, Vector.blockToWorldSpace(new Vector(20, 51))));

        TilemapInterpreter.setTilemap(cave_2_tilemap);
        if (LAST_ZONE === null) { // Coming from mountain.

            // Set spawn point on the right.
            const blockPos = new Vector(ZONE.MIN_BLOCK.x + 2, 25);
            CHAD.pos = Vector.blockToWorldSpace(blockPos);
        }
    };

    queueAssets();
    ASSET_MGR.downloadAll(addEntities);
};
