class SurfaceSnow {
    constructor() {
        this.pos = new Vector(0, 0);

        this.animator = new Animator(
            Precipitation.SPRITESHEET,
            new Vector(0, 7 * Precipitation.SIZE.x),
            new Vector(Precipitation.SIZE.x, Precipitation.SIZE.y),
            1,
            1,
        );

    }
    static get SPRITESHEET() {
        return "./sprites/snow_and_rain.png";
    }
    static get SIZE() {
        return new Vector(32, 32);
    }

    /**
     * Update the BoundingBox of the Projectile based on the latter's current position.
     */
    updateBoundingBox() {
        this.boundingBox = new BoundingBox(this.pos, Vector.multiply(this.size, Projectile.SCALE));
    };

    setupBoundingBox() {
        this.boundingBox = new BoundingBox(this.pos, Vector.multiply(SurfaceSnow.SIZE, 1));
    }
    update() {
        this.velocity.y = PHYSICS.GRAVITY_ACC * GAME.clockTick;
        setupBoundingBox();
        GAME.entities.midground.forEach((entity) => {
            if (this != entity && entity.boundingBox && this.boundingBox.collide(entity.boundingBox)) {
                this.pos = Vector.blockToWorldSpace(new Vector(this.velocity.y, CHAD.pos.x));
                GAME.addEntity(this, 1);

            }
        })


        // GAME.entities.midground.forEach((entity) => {
        //     if (this != entity && entity.boundingBox && !(entity instanceof FoodDrop)) {
        //         if (this.boundingBox.collide(entity.boundingBox)) {
        //             this.action(entity, this);



        //         }
        //     }
        // });
    }

    draw() {
        this.pos = new Vector(variationX + CHAD.pos.x, this.origin.y + variationY);

        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), this.scale);
    }
}