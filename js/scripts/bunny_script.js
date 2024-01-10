const bunnySimulation = () => {
    GAME.addEntity(new Bunny(512, 512));
    GAME.addEntity(new Snake(512, 200));
    GAME.addEntity(new Slime(100, 100)); // SAP by default.
    GAME.addEntity(new Slime(200, 200, Slime.POLLUTED));
    GAME.addEntity(new Slime(300, 300, Slime.FROST));
    GAME.addEntity(new Slime(400, 400, Slime.MAGMA));
    GAME.addEntity(new Slime(500, 500, Slime.EVIL));
    GAME.addEntity(new PapaChad(0, 0, false));
    GAME.addEntity(new PapaChad(0, PapaChad.SCALED_HEIGHT, true));
};