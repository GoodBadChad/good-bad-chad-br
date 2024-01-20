/**
 * A slingshot that Chad holds and uses to launch projectiles. It can support various types of ammo.
 * @author Nathan Hinthorne
 */
class Slingshot {
    constructor() {
        this.isHidden = true;

        this.x = CHAD.x + 10; // temp values
        this.y = CHAD.y - 10; // temp values

        this.isFiring = false;
        this.rotation = 0;

        /** The starting x position of the spritesheet */
        this.startX = 0;

        /** The starting y position of the spritesheet*/
        this.startY = 0;
    }

    findRotation() { 
        this.isHidden = false;
        this.startX = 0; // slingshot charging frame

        // position the image near Chad's hand
        this.y = CHAD.y + 15;
        if (CHAD.facing == "right") {
            this.x = CHAD.x + 80;
            this.startY = 0; // slingshot facing right frame
        } else if (CHAD.facing == "left") {
            this.x = CHAD.x - 80;
            // this.startY = 29; // slingshot facing left frame
        }

        // find the angle in radians from the x axis to the mouse
        let deltaX = GAME.mouseX - (this.x + CAMERA.x);
        let deltaY = GAME.mouseY - (this.y + CAMERA.y);
        let theta = Math.atan2(deltaY, deltaX);
        this.rotation = theta;

        //TODO: swap animation frames based on rotation

        console.log("rotation: " + " (" + this.rotation * 180 / Math.PI + " degrees)");
    }

    fireSlingshot() {
        ASSET_MGR.playAudio("./sfx/slingshot_launch.wav", false);
        this.isFiring = true;
        this.startX = 26; // slingshot firing frame

        INVENTORY.decreaseAmmo();
        let ammo = INVENTORY.getCurrentAmmo();

        // create a projectile and launch it in the direction of the mouse
        let start = { x: Math.round(this.x), y: Math.round(this.y) };
        let end = { x: Math.round(GAME.mouseX + CAMERA.x), y: Math.round(GAME.mouseY + CAMERA.y) };
        GAME.addEntity(new Projectile(Projectile.STONE, start.x, start.y, end.x, end.y));
        // console.log("slingshot fired from (" + start.x + ", " + start.y + ") to (" + end.x + ", " + end.y + ")");

        // trigger an async operation that will erase the slingshot after it fires
        setTimeout(() => {
            this.isFiring = false;
            this.isHidden = true;

        }, 1000);
    }


    update() {
        if (GAME.mouseDown) {
            this.findRotation();
            this.isHidden = false;
        } else if (GAME.mouseUp) {
            this.fireSlingshot();
        }
    }


    draw() {
        if (!this.isHidden) {
            CTX.drawImage(
                ASSET_MGR.getAsset(Slingshot.SPRITESHEET),
                this.startX, this.startY,
                Slingshot.WIDTH, Slingshot.HEIGHT,
                this.x - CAMERA.x,
                this.y - CAMERA.y,
                Slingshot.WIDTH * Slingshot.SCALE,
                Slingshot.HEIGHT * Slingshot.SCALE);
        }
    }

    static get SPRITESHEET() {
        return "./sprites/slingshot.png";
    }

    static get WIDTH() {
        return 26;
    }

    static get HEIGHT() {
        return 29;
    }

    static get SCALE() {
        return 2.5;
    }

};