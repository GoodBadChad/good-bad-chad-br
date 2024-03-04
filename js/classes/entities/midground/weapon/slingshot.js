/**
 * A slingshot that Chad holds and uses to launch projectiles. It can support various types of ammo.
 * 
 * @author Nathan Hinthorne
 */
class Slingshot {
    constructor() {
        this.isAiming = false;
        this.isFiring = false;
        this.rotation = 0; //TODO check slingshot.rotation in Chad class to determine which animation to use for him

        this.timeSinceLastShot = 0;
        // this.timeSinceReload = 0;

        this.playedStretchSound = false;

        // this.chadCenter = Vector.add(CHAD.pos, new Vector(CHAD.scaledSize.x / 2, CHAD.scaledSize.y / 2));
    }

    aim() { 
        this.isAiming = true;

        // play the slingshot stretch sound
        if (!this.playedStretchSound) {
            ASSET_MGR.playSFX(SFX.SLINGSHOT_STRETCH.path, SFX.SLINGSHOT_STRETCH.volume);
            this.playedStretchSound = true;
        }
        
        // find the angle in radians from the x axis to the mouse
        const delta = Vector.subtract(Vector.worldToCanvasSpace(CHAD.getCenter()), GAME.mousePos);
        let theta = Math.atan2(delta.y, delta.x);
        this.rotation = theta;

        // this.timeSinceReload += GAME.clockTick;
    }

    fire() {
        ASSET_MGR.stopAudio(SFX.SLINGSHOT_STRETCH.path);

        this.isFiring = true;
        this.isAiming = false;

        const ammoType = INVENTORY.useCurrentAmmo();
        if (ammoType != "Empty") {
            // choose from 4 different firing sounds
            const rand = Math.floor(Math.random() * 4) + 1;
            const sfx = SFX["SLINGSHOT_LAUNCH" + rand];
            ASSET_MGR.playSFX(sfx.path, sfx.volume);

            // create a projectile and launch it in the direction of the mouse
            GAME.addEntity(ProjectileFactory.create(
                ammoType,
                Vector.round(Vector.add(CHAD.getCenter(), new Vector(0, -10))), 
                Vector.round(Vector.canvasToWorldSpace(GAME.mousePos)))
            );
        }

        // trigger an async operation that will erase the slingshot after it fires
        setTimeout(() => {
            this.isFiring = false;
        }, 300); // 0.3 seconds

        // reset the slingshot stretch sound
        this.playedStretchSound = false;

        // reset the shoot timer
        this.timeSinceLastShot = 0;

        // reset the reload timer
        // this.timeSinceReload = 0;
    }

    update() {
        // this.chadCenter = Vector.add(CHAD.pos, new Vector(CHAD.scaledSize.x / 2, CHAD.scaledSize.y / 2));
        this.timeSinceLastShot += GAME.clockTick;

        if ((!HUD.pauseButton || !HUD.pauseButton.isMouseOver()) && CHAD.health > 0) {
            if (GAME.user.aiming) {
                this.aim();
            } else if (GAME.user.firing && this.timeSinceLastShot > Slingshot.SHOOT_DELAY) {    
                this.fire();
            }
        }

        if (GAME.user.firing) {
            GAME.user.firing = false; // reset the firing state
        }
    }

    draw() {

    }

    getAction() {
        if (this.isFiring) {
            if (this.rotation > 0 && this.rotation < Math.PI) {
                return "UpFiring";
            } else {
                return "DownFiring";
            }
        } else if (this.isAiming) {
            if (this.rotation > 0 && this.rotation < Math.PI) {
                return "UpAiming";
            } else {
                return "DownAiming";
            }
        } else {
            return "none";
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