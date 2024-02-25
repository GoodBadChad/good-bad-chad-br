class ProjectileFactory {
    static create(type, startPos, targetPos) {
        switch (type) {
            case ProjectileFactory.ROCK:
                return new Rock(startPos, targetPos);
            case ProjectileFactory.BOMB:
                return new Bomb(startPos, targetPos);
            case ProjectileFactory.SNOWBALL:
                return new Snowball(startPos, targetPos);
            case ProjectileFactory.SLIMEBALL:
                return new Slimeball(startPos, targetPos);
            case ProjectileFactory.LASER:
                return new Laser(startPos, targetPos);
            case ProjectileFactory.SONIC_WAVE:
                return new SonicWave(startPos, targetPos);
            case ProjectileFactory.BROCCOLI:
                return new Broccoli(startPos, targetPos);
            case ProjectileFactory.SUS_SNOWBALL:
                return new SusSnowball(startPos, targetPos);
        }

    }

    
    static get ROCK() {
        return 1;
    }

    static get BOMB() {
        return 2;
    }

    static get SNOWBALL() {
        return 3;
    }

    static get SLIMEBALL() {
        return 4;
    }

    static get LASER() {
        return 5;
    }

    static get SONIC_WAVE() {
        return 6;
    }

    static get BROCCOLI() {
        return 7;
    }

    static get SUS_SNOWBALL() {
        return 8;
    }
}