class Portal {
    /**
     * @param {Vector} blockPos The position of the block the portal is on
     * @param {Number} type The type of portal (e.g. Portal.PURPLE or Portal.YELLOW)
     */
    constructor(blockPos, type) {
        this.pos = Vector.blockToWorldSpace(blockPos);
        this.type = type;

        const spritesheetY = this.type * Portal.SIZE.y;
        this.animator = new Animator(Portal.SPRITESHEET, new Vector(0, spritesheetY), Portal.SIZE, 2, 0.5, true);

        switch(this.type) {
            case Portal.PURPLE:
                this.particleEffect = new ParticleEffect(this.pos, ParticleEffect.MAGIC_PURPLE);
                break;
            case Portal.YELLOW:
                this.particleEffect = new ParticleEffect(this.pos, ParticleEffect.MAGIC_YELLOW);
                break;
        }
    };

    
    update() {
        // release portal particles every 0.05 seconds
        if (GAME.gameTime % 0.05 < 0.01) { // we use `< 0.01` instead of `== 0` to avoid floating point errors
            GAME.addEntity(new ParticleEffect(new Vector(this.pos.x + Portal.SCALED_SIZE.x/2, this.pos.y + Portal.SCALED_SIZE.y/2), 
            this.particleEffect));
        }

        //TODO spawn enemies
    };
    
    draw() {
        this.animator.drawFrame(Vector.worldToCanvasSpace(this.pos), Portal.SCALE);
    };

    static get SPRITESHEET() {
        return "./sprites/portals.png";
    }

    static get SIZE() {
        return new Vector(32, 32);
    }

    static get SCALE() {
        return 1;
    }

    static get SCALED_SIZE() {
        return Vector.multiply(Portal.SIZE, Portal.SCALE);
    }

    static get PURPLE() {
        return 0;
    }

    static get YELLOW() {
        return 1;
    }
};