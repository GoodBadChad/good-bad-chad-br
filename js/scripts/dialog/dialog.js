const loadVillageDialog = () => {
    // setup string constants
    const PAPA_CHAD_1 = GAME.lang === "english" ? "Time to go hunting son!" : "";
    const PAPA_CHAD_2 = GAME.lang === "english" ? "Press [key] to attack that snake with your sword." : "";
    const PAPA_CHAD_3 = GAME.lang === "english" ? "Well done. That MEAT!! will come in handy later on." : "";
    const PAPA_CHAD_4 = GAME.lang === "english" ? "See that bunny over there? Point and click to fire your slingshot at it." : "";

    const MAMA_CHAD_1 = GAME.lang === "english" ? "Hello dear, be safe out there." : "";
    const MAMA_CHAD_2 = GAME.lang === "english" ? "Be sure to bring me back some MEAT!!" : "";

    // setup dialog map
    const dialog = new Map();
    dialog.set("PAPA_CHAD", [PAPA_CHAD_1, PAPA_CHAD_2, PAPA_CHAD_3, PAPA_CHAD_4]);
    dialog.set("MAMA_CHAD", [MAMA_CHAD_1, MAMA_CHAD_2]);

};