/**
 * A class which represents a projectile fired from the player's slingshot.
 * 
 * @author Trae Claar
 */
class Projectile {
    constructor(type, x, y, targetX, targetY) {
        this.type = type;
        this.x = x;
        this.y = y;
        
        this.yVelocity = 0;
        this.animator = new Animator(Projectile.SPRITESHEET, 0, type * Projectile.SIZE, Projectile.SIZE, Projectile.SIZE, 1, 1);
        this.updateBoundingBox();
        this.setProperties();

        // calculate direction the Projectile should move in
        let deltaX = targetX - this.x;
        let deltaY = targetY - this.y;
        let magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        this.dirX = deltaX / magnitude;
        this.dirY = deltaY / magnitude;
    }

    static get SPRITESHEET() {
        return "./sprites/ammo.png";
    }

    static get SIZE() {
        return 13;
    }

    static get SCALE() {
        return 3;
    }

    static get SCALED_SIZE() {
        return Projectile.SCALE * Projectile.SIZE;
    }

    static get BOMB() {
        return 0;
    }

    static get WOOD() {
        return 1;
    }

    static get STONE() {
        return 2
    }

    static get METAL() {
        return 3
    }

    static get LASER() {
        return 6
    }

    static get PROPERTY_TABLE() {
        return {
            [Projectile.BOMB]: {
                ACTION: () => {
                    console.log("boom");
                },
                SPEED: 15,
                WEIGHT: 0.05
            },
            [Projectile.WOOD]: {
                ACTION: () => {
                    console.log("wood");
                },
                SPEED: 15,
                WEIGHT: 0.001
            },
            [Projectile.STONE]: {
                ACTION: () => {
                    console.log("stone");
                },
                SPEED: 14,
                WEIGHT: 0.005
            },
            [Projectile.METAL]: {
                ACTION: () => {
                    console.log("metal");
                },
                SPEED: 12,
                WEIGHT: 0.07
            },
            [Projectile.LASER]: {
                ACTION: () => {
                    console.log("laser");
                },
                SPEED: 20,
                WEIGHT: 0
            }
        };
    }

    setProperties() {
        this.action = Projectile.PROPERTY_TABLE[this.type].ACTION;
        this.speed = Projectile.PROPERTY_TABLE[this.type].SPEED;
        this.weight = Projectile.PROPERTY_TABLE[this.type].WEIGHT;
    }

    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.x, this.y, Projectile.SCALED_SIZE, Projectile.SCALED_SIZE);
    }

    update() {
        this.yVelocity += PHYSICS.GRAVITY_ACC * GAME.clockTick * this.weight;

        
        // I put this here because the bomb seemed to be falling unrealisticly fast when launching it downwards -Nathan
        //--------------------------------------- 
        // account for terminal velocity
        if (this.yVelocity > PHYSICS.TERMINAL_VELOCITY) {
            this.yVelocity = PHYSICS.TERMINAL_VELOCITY;
        }
        //---------------------------------------

        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed + this.yVelocity;

        this.updateBoundingBox();
        GAME.entities.forEach((entity) => {
            if (this != entity && entity.boundingBox) {
                if (this.boundingBox.collide(entity.boundingBox)) {
                    this.action();
                    this.removeFromWorld = true;
                }
            }
        });
    };

    draw() {
        this.animator.drawFrame(this.x - CAMERA.x, this.y - CAMERA.y, Projectile.SCALE);
    }
};