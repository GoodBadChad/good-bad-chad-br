const loadPlaygroundDimension = () => {
    // // for right now i want to see the whole map
    // CANVAS.width += DIMENSION.MAX_X;
    // CANVAS.height += DIMENSION.MAX_Y;
    // Let's lay down two layers of dirt blocks.
    for (let i = 24; i >= 23; i--) {
        for (let j = 0; j < DIMENSION.BLOCK_WIDTH; j++) {
            GAME.addEntity(new Block(j, i, Block.DIRT));
        }
    }
};