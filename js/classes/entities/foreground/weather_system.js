/**
 * WeatherSystem manages what weather to spawn into a zone.
 * 
 * @author Caleb Krauter
 */
class WeatherSystem {

    /**
     * Intensity is used for both rain/snow and clouds simultaneously.
     * 
     * @param {String} type warm, hot, cloudy, rain, snow.
     * @param {int} intensity a value between 0 and 5.
     * @param {String} time day or night.
     */
    constructor(type, intensity, time) {
        this.type = type;
        this.intensity = intensity;
        this.time = time;
        this.clouds = false;

        // Rainy day or night

        if (this.type === "rain") {
            this.makeClouds();
            this.makePrecipitation();
        }
        else if (this.type === "snow") {
            this.makeClouds();
            this.makePrecipitation();
        } else if (this.type === "cloudy") {
            this.makeClouds();
            // Default to sunny with white clouds
        }
        this.makeHeavens();

    }

    /**
     * Adds a sun/moon and updates the sky color.
     */
    makeHeavens() {
        let sunVector = new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100);
        if (this.time === "night") {
            BG_COLOR = COLORS.SKY_DARK_GREY;
            GAME.addEntity(new Sun(sunVector, Sun.MOON), -1);

        } else {
            const bgColors = {
                warm: COLORS.SKY_BLUE,
                hot: COLORS.SKY_HOT_SKY,
                cloudy: COLORS.SKY_GREY,
                rain: COLORS.SKY_GREY,
                snow: COLORS.SKY_SNOW_GREY,
            }
            BG_COLOR = bgColors[this.type];
            if (!this.clouds) {

                let sunType = this.type == "hot" ? Sun.LAVA : Sun.VILLAGE;
                GAME.addEntity(new Sun(sunVector, sunType), -1);
            }

        }

    }

    /**
     * Adds clouds.
     */
    makeClouds() {
        // Make sure to only have a number of clouds that is divisble by 100. For example, 15 is bad value but 25 is a good value.
        const numOfClouds = [2, 5, 10, 20, 25, 50];
        this.clouds = true;
        let aboveGroundLevel = 19;
        // TODO add in dark clouds.
        if (this.makeRain) {
            // Add dark clouds
        } else {
            // Add white clouds
        }

        let cloudNum = numOfClouds[this.intensity];
        // Make so many clouds of each type.
        for (let cloudType = 0; cloudType < 3; cloudType++) {
            // Choose a multiplier that spaces out the clouds across the whole zone nicely.
            let spaceBetweenMultiplier = 0;
            // This line may be causing the game to occasionally load in such a way that the ground does not load in before chad can fall on it.
            // My guess is that the ref to ZONE.MAX_BLOCK.x is not good here or it is just an issue I never ran into until now.
            spaceBetweenMultiplier = ZONE.MAX_BLOCK.x / cloudNum;

            for (let i = 0; i < cloudNum; i++) {
                let foreground = 0;
                // Give the clouds some random variation.
                let yVariation = Math.random() * (10 - 16) + 14;
                let xVariation = Math.random() * (20 - 50) + 20;
                // Choose a location for each cloud that is added such that it has a random x variation and it is spaced out over the zone.
                // i * spaceBetweenMultiplier ensure that there will be clouds across the whole zone.
                let randomOrigin = xVariation + i * spaceBetweenMultiplier;
                let cloudPosition = Vector.blockToWorldSpace(new Vector(randomOrigin, aboveGroundLevel - yVariation));
                const cloudVariants = {
                    0: Decoration.DECORATIONS.clouds.CLOUD_BUSHY,
                    1: Decoration.DECORATIONS.clouds.CLOUD_LANKY,
                    2: Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD,
                };

                // Assign cloudVariant based on cloudType, defaulting to undefined if not found
                let cloudVariant = cloudVariants[cloudType];
                GAME.addEntity(new Decoration(cloudVariant, cloudPosition), foreground);

            }
        }

    }

    /**
     * Adds rain or snow.
     */
    makePrecipitation() {
        let dir = ["left", "down", "right", "down", "down"];
        let precipitaitonIntensity = [2, 5, 10, 20, 25, 30];
        let dirIndex = Math.floor(Math.random() * dir.length);
        let scale = 1;

        // There will be 80 snowflakes/raindrops added times the intensity of precipitaiton.
        for (let j = 0; j < precipitaitonIntensity[this.intensity]; j++) {
            for (let i = 0; i < 80; i++) {
                if (this.type === "snow") {
                    scale = Math.random() * (.5 - .2) + .2;
                } else if (dir[dirIndex] !== "down") {
                    scale = Math.random() * (.8 - .4) + .6;
                } else {
                    scale = Math.random() * (1.2 - .5) + .8;
                }
                GAME.addEntity(new Precipitation(dir[dirIndex], Vector.blockToWorldSpace(new Vector(i, i - 10)), this.type, scale), 1);
            }
        }
    }


    /**
     * Update does nothing.
     */
    update() {

    }

    /**
     * Draw does nothing.
     */
    draw() {

    }
}
