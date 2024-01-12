const birdSimulation = () => {
    for (i = 0; i < 300; i++) {
        setTimeout(() => GAME.addEntity(new Bird(960, 540)), 10000 * Math.random());
    }
};