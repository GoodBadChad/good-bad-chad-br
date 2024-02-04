/**
 * A slingshot that Chad holds and uses to launch projectiles. It can support various types of ammo.
 * @author Nathan Hinthorne
 */
class Slingshot {
    constructor() {
        this.isHidden = true;

        this.pos = Vector.add(CHAD.pos, new Vector(10, -10)); // temp value

        this.isFiring = false;
        this.rotation = 0;

        this.playedStretchSound = false;

        this.start = new Vector(0, 0);
    }

    aim() { 
        this.isHidden = false;

        // play the slingshot stretch sound
        if (!this.playedStretchSound) {
            ASSET_MGR.playAudio(SFX.SLINGSHOT_STRETCH.path, SFX.SLINGSHOT_STRETCH.volume);
            this.playedStretchSound = true;
        }

        // position the image near Chad's hand
        let x;
        let startY = this.start.y;
        if (CHAD.facing == "right") {
            x = CHAD.pos.x + 80;
            startY = 0; // slingshot facing right frame
        } else if (CHAD.facing == "left") {
            x = CHAD.pos.x - 80;
            // startY = 29; // slingshot facing left frame
        }
        this.pos = new Vector(x, CHAD.pos.y + 15);
        this.start = new Vector(0, startY);

        // find the angle in radians from the x axis to the mouse
        const delta = Vector.worldToCanvasSpace(Vector.subtract(GAME.mousePos, this.pos));
        let theta = Math.atan2(delta.y, delta.x);
        this.rotation = theta;

        //TODO: swap animation frames based on rotation

        // console.log("rotation: " + " (" + this.rotation * 180 / Math.PI + " degrees)");
    }

    fire() {
        ASSET_MGR.stopAudio(SFX.SLINGSHOT_STRETCH.path);
        
        // choose from 4 different firing sounds
        let rand = Math.floor(Math.random() * 4);
        switch (rand) {
            case 0:
                ASSET_MGR.playAudio(SFX.SLINGSHOT_LAUNCH1.path, SFX.SLINGSHOT_LAUNCH1.volume);
                break;
            case 1:
                ASSET_MGR.playAudio(SFX.SLINGSHOT_LAUNCH2.path, SFX.SLINGSHOT_LAUNCH2.volume);
                break;
            case 2:
                ASSET_MGR.playAudio(SFX.SLINGSHOT_LAUNCH3.path, SFX.SLINGSHOT_LAUNCH3.volume);
                break;
            case 3:
                ASSET_MGR.playAudio(SFX.SLINGSHOT_LAUNCH4.path, SFX.SLINGSHOT_LAUNCH4.volume);
                break;
        }

        this.isFiring = true;
        //this.startX = 26; // slingshot firing frame

        INVENTORY.decreaseAmmo();
        let ammo = INVENTORY.getCurrentAmmo();

        // create a projectile and launch it in the direction of the mouse
        GAME.addEntity(new Projectile(
            Projectile.STONE,
            Vector.round(this.pos),
            Vector.round(Vector.canvasToWorldSpace(GAME.mousePos))));
        // console.log("slingshot fired from (" + start.x + ", " + start.y + ") to (" + end.x + ", " + end.y + ")");

        // trigger an async operation that will erase the slingshot after it fires
        setTimeout(() => {
            this.isFiring = false;
            this.isHidden = true;

        }, 1000);

        // reset the slingshot stretch sound
        this.playedStretchSound = false;
    }


    update() {
        if (!HUD.pauseButton.isMouseOver()) {
            if (GAME.user.aiming) {
                this.aim();
            } else if (GAME.user.firing) {
                this.fire();
            }
        }
    }


    draw() {
        if (!this.isHidden) {
            CTX.drawImage(
                ASSET_MGR.getAsset(Slingshot.SPRITESHEET),
                this.start.x, this.start.y,
                Slingshot.SIZE.x, Slingshot.SIZE.y,
                this.pos.x - CAMERA.pos.x,
                this.pos.y - CAMERA.pos.y,
                Slingshot.SIZE.x * Slingshot.SCALE,
                Slingshot.SIZE.y * Slingshot.SCALE);
        }
    }

    static get SPRITESHEET() {
        return "./sprites/slingshot.png";
    }

    static get SIZE() {
        return new Vector(26, 29);
    }

    static get SCALE() {
        return 2.5;
    }

};