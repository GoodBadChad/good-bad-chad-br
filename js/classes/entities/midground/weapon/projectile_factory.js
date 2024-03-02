class ProjectileFactory {
    static create(type, startPos, targetPos) {
        const projectileMap = {
            [ProjectileFactory.ROCK]: Rock,
            [ProjectileFactory.BOMB]: Bomb,
            [ProjectileFactory.SNOWBALL]: Snowball,
            [ProjectileFactory.SLIMEBALL]: Slimeball,
            [ProjectileFactory.BROCCOLI]: Broccoli,
            [ProjectileFactory.SUS_SNOWBALL]: SusSnowball,
        };
        
        return new (projectileMap[type])(startPos, targetPos);
    }

    static get ROCK() {
        return "rock";
    }

    static get BOMB() {
        return "bomb";
    }

    static get SNOWBALL() {
        return "snowball";
    }

    static get SLIMEBALL() {
        return "slimeball";
    }

    static get BROCCOLI() {
        return "broccoli";
    }

    static get SUS_SNOWBALL() {
        return "susSnowball";
    }
}