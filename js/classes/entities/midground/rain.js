class Rain {
    constructor(dir, pos) {
        // TODO use direction to rotate raindrop and choose different travel path.
        this.dir = dir;
        //spritesheet, start, size, frameCount, frameDuration
        this.origin = pos;
        this.pos = pos;
        this.velocity = new Vector(0, 0);
        this.animator = new Animator(Rain.SPRITESHEET, new Vector(0, 0), new Vector(Rain.SIZE.x, Rain.SIZE.y), 1, 1);
        // this.animator = new Animator(this.type.SPRITESHEET, this.type.SPRITESHEET_START_POS,
        //     this.type.SIZE, this.type.FRAME_COUNT, this.type.FRAME_DURATION);


    }
    static get SPRITESHEET() {
        return "./sprites/rain_drop.png";

    }
    static get SIZE() {
        return new Vector(16, 16);
    }
    static get SCALE() {
        return 2.5;
    }

    reset() {
        let variationY = Math.random() * (50 + 100) - 100;
        let variationX = Math.random() * (100 + 300) - 100;
        this.pos = new Vector(this.origin.x + variationX, this.origin.y + variationY);
        this.velocity = new Vector(0, 0);
        // console.log("Reset");
        // console.log(this.origin);

    }
    /**
     * Update the BoundingBox of the Projectile based on the latter's current position.
     * @author Trae Claar and (modified) Caleb Krauter
     */
    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.pos, Vector.multiply(Rain.SIZE, Rain.SCALE));

    };

    static get RIGHT_SIDE() {
        return (CAMERA.pos.x + Camera.SIZE.x);
    }

    /**
     * @author Caleb Krauter and Trae Claar
     */
    update() {
        // This side works properly. Rain outside of the left of FOV is removed. Flipping the operator from < to > changes Cam.pos.x to 0.
        if ((this.pos.x < CAMERA.pos.x)) {
            console.log("Left side rain");
            console.log(this.pos.x);
            console.log("Left side of camera");
            console.log(CAMERA.pos.x);
            this.removeFromWorld = true;
        }

        // This side sets CAMERA.pos.x to 0 for some reason causing it not to work
        // if (this.pos.x > this.RIGHT_SIDE) {
        //     console.log("Right side rain");
        //     console.log(this.pos.x);
        //     console.log("Right side of camera");
        //     console.log(CAMERA.pos.x);
        //     this.removeFromWorld = true;
        // }
        this.velocity.y = PHYSICS.GRAVITY_ACC * GAME.clockTick;

        if (this.velocity.y > PHYSICS.TERMINAL_VELOCITY) {
            this.velocity.y = PHYSICS.TERMINAL_VELOCITY;
        }
        this.velocity = new Vector(this.velocity.x, this.velocity.y);

        // const posChange = Vector.multiply(this.dir, this.speed);
        // this.pos = Vector.add(this.pos, new Vector(posChange.x, posChange.y + this.yVelocity))
        this.pos = Vector.add(this.pos, this.velocity);

        this.updateBoundingBox();
        // GAME.entities.midground.forEach((entity) => {
        //     if (this != entity && entity.boundingBox) {
        //         if (this.boundingBox.collide(entity.boundingBox)) {
        //             this.reset();
        //         }
        //     }
        // });
        // Using background makes it so that the projectiles shot from slinghsot don't collide with the
        // rain drops and cause issues as it would seem.
        GAME.entities.background.forEach((entity) => {
            if (this != entity && entity.boundingBox) {
                if (this.boundingBox.collide(entity.boundingBox)) {
                    this.reset();
                }
            }
        });
    }
    // if (rainHitGround) {
    //     Vector.blockToWorldSpace(new Vector(80, 10));
    // }

    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), Rain.SCALE);

    }
}