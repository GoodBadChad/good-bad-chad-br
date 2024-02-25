/**
 * WeatherSystem manages what weather to spawn into a zone.
 * 
 * @author Caleb Krauter
 */
class WeatherSystem {

    /**
     * Pass in the type of weather, intensity and time of day.
     * Direction of rain or snow is random.
     * Rain or snow will always include clouds.
     * Intensity is used for both rain/snow and clouds.
     * 
     * @param {String} type warm, hot, cloudy, rain, snow.
     * @param {int} intensity a value between 0 and 5.
     * @param {String} time day or night.
     */
    constructor(type, intensity, time) {
        this.type = type;
        this.intensity = intensity;
        this.time = time;

        // Rainy day or night
        this.makeHeavens();

        if (this.type === "rain") {
            this.makeClouds();
            this.makePrecipitation();
        }
        else if (this.type === "snow") {
            this.makeClouds();
            this.makePrecipitation();
            this.addSurfaceSnow();
        } else if (this.type === "cloudy") {
            this.makeClouds();
            // Default to sunny with white clouds
        }
    }

    /**
     * Adds a sun/moon and updates the sky color.
     */
    makeHeavens() {
        if (this.time === "night") {
            BG_COLOR = COLORS.SKY_DARK_GREY;
            GAME.addEntity(new Sun(sunVector, Sun.MOON), -1);

        } else {
            switch (this.type) {
                case "warm":
                    BG_COLOR = COLORS.SKY_BLUE;
                    GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100), Sun.VILLAGE), -1);
                    break;
                case "hot":
                    BG_COLOR = COLORS.SKY_HOT_SKY;
                    GAME.addEntity(new Sun(new Vector(Camera.SIZE.x - 2 * Sun.SCALED_SIZE, Sun.SCALED_SIZE - 100), Sun.LAVA), -1);
                    break;
                case "cloudy":
                    BG_COLOR = COLORS.SKY_GREY;
                    break;
                case "rain":
                    BG_COLOR = COLORS.SKY_GREY;
                    break;
                case "snow":
                    BG_COLOR = COLORS.SKY_SNOW_GREY;
                    break;
                default:
                    break;
            }
        }

    }

    /**
     * Adds clouds.
     */
    makeClouds() {
        // Make sure to only have a number of clouds that is divisble by 100. For example, 15 is bad value but 25 is a good value.
        const numOfClouds = [2, 5, 10, 20, 25, 50];
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
            for (spaceBetweenMultiplier = 0; spaceBetweenMultiplier < 100; spaceBetweenMultiplier++) {
                if (spaceBetweenMultiplier * cloudNum == 100) {
                    break;
                }
            }

            for (let i = 0; i < cloudNum; i++) {
                let foreground = 0;
                // Give the clouds some random variation.
                let yVariation = Math.random() * (10 - 16) + 14;
                let xVariation = Math.random() * (20 - 50) + 20;
                // Choose a location for each cloud that is added such that it has a random x variation and it is spaced out over the zone.
                // i * spaceBetweenMultiplier ensure that there will be clouds across the whole zone.
                let randomOrigin = xVariation + i * spaceBetweenMultiplier;
                let cloudPosition = Vector.blockToWorldSpace(new Vector(randomOrigin, aboveGroundLevel - yVariation));
                let cloudVarient = Decoration.DECORATIONS.clouds.CLOUD_BUSHY;
const cloudVariants = {
  1: Decoration.DECORATIONS.clouds.CLOUD_LANKY,
  2: Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD,
};

// Assign cloudVariant based on cloudType, defaulting to undefined if not found
let cloudVariant = cloudVariants[cloudType];
                GAME.addEntity(new Decoration(cloudVarient, cloudPosition), foreground);

            }
        }

    }

    /**
     * Adds rain or snow.
     */
    makePrecipitation() {
        let dir = ["left", "down", "right", "down", "down"];
        let rainintensity = [2, 5, 10, 20, 25, 30];
        let dirIndex = Math.floor(Math.random() * dir.length);
        let scale = 1;

        for (let j = 0; j < rainintensity[this.intensity]; j++) {
            for (let i = 0; i < 20; i++) {
                for (let k = 0; k < 4; k++) {
                    if (this.type === "snow") {
                        scale = Math.random() * (.5 - .2) + .2;

                    } else if (dir[dirIndex] !== "down") {
                        scale = Math.random() * (.8 - .4) + .4;
                    } else {
                        r
                        scale = Math.random() * (1.2 - .5) + .5;

                    }
                    GAME.addEntity(new Precipitation(dir[dirIndex], Vector.blockToWorldSpace(new Vector(i, i - 10)), this.type, scale), 1);

                }
            }
        }
    }

    // TODO - complete SurfaceSnow.
    /**
     * Will add snow to the surface of the ground or any blocks on the top layer.
     * Use collision and gravity to do this and add in a loading animation so that the snow
     * is unseen until it hits the ground.
     */
    addSurfaceSnow() {
        // new SurfaceSnow();
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
