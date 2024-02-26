/**
 * A slingshot that Chad holds and uses to launch projectiles. It can support various types of ammo.
 * 
 * @author Nathan Hinthorne
 */
class Slingshot {
    constructor() {
        
        this.pos = 0;
        
        this.isAiming = false;
        this.isFiring = false;
        this.rotation = 0; //TODO check slingshot.rotation in Chad class to determine which animation to use for him

        this.timeSinceLastShot = 0;
        // this.timeSinceReload = 0;

        this.playedStretchSound = false;

        this.chadCenter = new Vector(0, 0);

        this.start = new Vector(0, 0);
    }

    aim() { 
        this.isAiming = true;

        // play the slingshot stretch sound
        if (!this.playedStretchSound) {
            ASSET_MGR.playSFX(SFX.SLINGSHOT_STRETCH.path, SFX.SLINGSHOT_STRETCH.volume);
            this.playedStretchSound = true;
        }
        
        // position the image near Chad's hand
        // let x;
        // let startY = this.start.y;
        // if (CHAD.facing == "right") {
        //     x = CHAD.pos.x + 80;
        //     startY = 0; // slingshot facing right frame
        // } else if (CHAD.facing == "left") {
        //     x = CHAD.pos.x - 80;
        //     // startY = 29; // slingshot facing left frame
        // }
        // this.start = new Vector(0, startY);

        
        // find the angle in radians from the x axis to the mouse
        const delta = Vector.subtract(Vector.worldToCanvasSpace(this.chadCenter), GAME.mousePos);
        console.log(Vector.worldToCanvasSpace(this.chadCenter), GAME.mousePos);
        let theta = Math.atan2(delta.y, delta.x);
        this.rotation = theta;

        // console.log("rotation: " + this.rotation * (180 / Math.PI) + " degrees");


        // this.timeSinceReload += GAME.clockTick;
    }

    fire() {
        ASSET_MGR.stopAudio(SFX.SLINGSHOT_STRETCH.path);

        this.isFiring = true;
        this.isAiming = false;
        //this.startX = 26; // slingshot firing frame

        let ammoType = INVENTORY.useCurrentAmmo();
        if (ammoType != "Empty") {
            // choose from 4 different firing sounds
            const rand = Math.floor(Math.random() * 4) + 1;
            const sfx = SFX["SLINGSHOT_LAUNCH" + rand];
            ASSET_MGR.playSFX(sfx.path, sfx.volume);

            // create a projectile and launch it in the direction of the mouse
            GAME.addEntity(ProjectileFactory.create(
                ProjectileFactory.SLIMEBALL, 
                Vector.round(this.chadCenter), 
                Vector.round(Vector.canvasToWorldSpace(GAME.mousePos)))
            );
        }

        // trigger an async operation that will erase the slingshot after it fires
        setTimeout(() => {
            this.isFiring = false;
        }, 1000);

        // reset the slingshot stretch sound
        this.playedStretchSound = false;

        // reset the shoot timer
        this.timeSinceLastShot = 0;

        // reset the reload timer
        // this.timeSinceReload = 0;
    }

    update() {
        this.chadCenter = Vector.add(CHAD.pos, new Vector(CHAD.pos.x + (CHAD.scaledSize.x / 2), CHAD.pos.y + (CHAD.scaledSize.y / 2)));
        this.pos = this.chadCenter;
        this.timeSinceLastShot += GAME.clockTick;

        if (!HUD.pauseButton.isMouseOver() && CHAD.health > 0) {
            if (GAME.user.aiming) {
                this.aim();
            } else if (GAME.user.firing && this.timeSinceLastShot > Slingshot.SHOOT_DELAY) {    
                this.fire();
            }
        }
    }

    //TODO remove this when we have a Chad animation containing the slingshot
    draw() {
        if (!this.isAiming) {
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

    getAction() {
        if (this.isFiring) {
            if (this.rotation < 0 && this.rotation > -Math.PI / 2) {
                return "FiringUp";
            } else if (this.rotation < -Math.PI / 2 && this.rotation > -Math.PI) {
                return "FiringDown";
            } else {
                return "FiringStraight";
            }
        } else if (this.isAiming) {
            if (this.rotation < 0 && this.rotation > -Math.PI / 2) {
                return "AimingUp";
            } else if (this.rotation < -Math.PI / 2 && this.rotation > -Math.PI) {
                return "AimingDown";
            } else {
                return "AimingStraight";
            }
        } else {
            throw new Error("Slingshot.getAction() called when not firing or aiming.");
        }
    }


    /** The delay between shots in seconds */
    static get SHOOT_DELAY() {
        return 0.25;
    }

    /** The time it takes to reload the slingshot in seconds */
    // static get RELOAD_TIME() {
    //     return 0.5;
    // }

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