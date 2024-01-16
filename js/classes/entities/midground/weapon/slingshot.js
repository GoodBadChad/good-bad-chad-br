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

    findRotation(mouseX, mouseY) {
        this.isHidden = false;
        this.startX = 0; // slingshot charging frame

        // position the image near Chad's hand
        this.y = CHAD.y - 10;
        if (CHAD.facing == "right") {
            this.x = CHAD.x + 10;
            this.startY = 0; // slingshot facing right frame
        } else if (CHAD.facing == "left") {
            this.x = CHAD.x - 10;
            this.startY = 29; // slingshot facing left frame
        }

        // find the angle in radians from the x axis to the mouse
        let deltaX = GAME.mouseX - this.x; 
        let deltaY = GAME.mouseY - this.y;
        let theta = Math.atan2(deltaY, deltaX);
        this.rotation = theta;
    }

    fireSlingshot(mouseX, mouseY) {
        console.log("slingshot is firing");
        this.isFiring = true;
        this.startX = 26; // slingshot firing frame

        INVENTORY.decreaseAmmo();
        let ammo = INVENTORY.getCurrentAmmo();

        // trigger an async operation that will create a projectile and launch it in the direction of the mouse.
        return new Promise((resolve) => {
            
            setTimeout(() => {
                console.log("slingshot finished firing");
                this.isFiring = false;
                this.isHidden = true;

                // create a projectile and launch it in the direction of the mouse
                let projectile = new Projectile(Projectile.BOMB, this.x, this.y, GAME.mouseX, GAME.mouseY);

                resolve();
            }, 1000);
        });
    }


    update() {
        if (GAME.mouseDown) {
            this.findRotation(GAME.mouseX, GAME.mouseY);
        } else if (GAME.mouseUp) {
            this.fireSlingshot(GAME.mouseX, GAME.mouseY);
        }
    }


    draw() {
        if (!this.isHidden) {
            GAME.ctx.save();
            GAME.ctx.translate(this.x, this.y);
            GAME.ctx.rotate(this.rotation);
            GAME.ctx.drawImage(
                ASSET_MGR.getAsset(this.SPRITESHEET),
                this.startX,
                this.startY,
                Slingshot.WIDTH,
                Slingshot.HEIGHT,
                -(Slingshot.WIDTH * Slingshot.SCALE) / 2,
                -(Slingshot.HEIGHT * Slingshot.SCALE) / 2,
                Slingshot.WIDTH * Slingshot.SCALE,
                Slingshot.HEIGHT * Slingshot.SCALE
            );
            GAME.ctx.restore();
        }
    }

    get SPRITESHEET() {
        return "./sprites/slingshot.png";
    }

    get WIDTH() {
        return 26;
    }

    get HEIGHT() {
        return 29;
    }

    get SCALE() {
        return 3;
    }

};