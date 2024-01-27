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

        this.start = new Vector(0, 0);
    }

    findRotation() { 
        this.isHidden = false;

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
        // There is an undefined value here so I commented this out - CK
        // console.log(GAME.mouse);
        let theta = Math.atan2(delta.y, delta.x);
        this.rotation = theta;
        // There is an undefined value here so I commented this out - CK

        //TODO: swap animation frames based on rotation

        console.log("rotation: " + " (" + this.rotation * 180 / Math.PI + " degrees)");
    }

    fireSlingshot() {
        ASSET_MGR.playAudio("./sfx/slingshot_launch.wav", 0.2);
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
    }


    update() {
        if (GAME.user.aiming) {
            this.findRotation();
            this.isHidden = false;
        } else if (GAME.user.firing) {
            this.fireSlingshot();
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