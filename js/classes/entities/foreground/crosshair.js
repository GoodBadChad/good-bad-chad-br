
class Crosshair {
    constructor() {
        this.x = GAME.mouseX;
        this.y = GAME.mouseY;
        this.isHidden = false;
    }

    update() {
        this.x = GAME.mouseX;
        this.y = GAME.mouseY;
    }

    draw() {
        // if (!this.isHidden) {
        //     CTX.drawImage(
        //         ASSET_MGR.getAsset(Crosshair.SPRITESHEET),
        //         this.x - Crosshair.WIDTH / 2,
        //         this.y - Crosshair.HEIGHT / 2,
        //         Crosshair.WIDTH,
        //         Crosshair.HEIGHT
        //     );
        // }
    }

    get SPRITESHEET() {
        return "./sprites/crosshair.png";
    }

    get WIDTH() {
        return 270;
    }

    get HEIGHT() {
        return 270;
    }
}