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

        WeatherSystem.weatherType = {
            HOT: "hot",
            WARM: "warm",
            CLOUDS: "clouds",
            RAIN: "rain",
            SNOW: "snow"
        };
        if (this.type === WeatherSystem.weatherType.RAIN) {
            this.makeClouds();
            this.makePrecipitation();
        }
        else if (this.type === WeatherSystem.weatherType.SNOW) {
            this.makeClouds();
            this.makePrecipitation();
        } else if (this.type === WeatherSystem.weatherType.CLOUDS) {
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
                clouds: COLORS.SKY_GREY,
                rain: COLORS.SKY_GREY,
                snow: COLORS.SKY_SNOW_GREY,
            }
            BG_COLOR = bgColors[this.type];
            if (!this.clouds) {

                let sunType = this.type == WeatherSystem.weatherType.HOT ? Sun.LAVA : Sun.VILLAGE;
                GAME.addEntity(new Sun(sunVector, sunType), -1);
            }

        }

    }

    /**
     * Adds clouds.
     */
    makeClouds() {
        const cloudIntensity = [2, 5, 10, 20, 25, 50];
        this.clouds = true;
        let aboveGroundLevel = 19;
        // TODO add in dark clouds.
        if (this.makeRain) {
            // Add dark clouds
        } else {
            // Add white clouds
        }

        let cloudNum = cloudIntensity[this.intensity];
        const cloudVariants = {
            0: Decoration.DECORATIONS.clouds.CLOUD_BUSHY,
            1: Decoration.DECORATIONS.clouds.CLOUD_LANKY,
            2: Decoration.DECORATIONS.clouds.CLOUD_JUST_CLOUD,
        };
        for (let cloudType = 0; cloudType < 3; cloudType++) {
            let spaceBetweenMultiplier = 0;
            spaceBetweenMultiplier = ZONE.MAX_BLOCK.x / cloudNum;

            for (let curCloud = 0; curCloud < cloudNum; curCloud++) {
                let foreground = 0;
                let yVariation = Math.random() * (10 - 16) + 14;
                let xVariation = Math.random() * (20 - 50) + 20;
                let cloudSpawnX = curCloud * spaceBetweenMultiplier + xVariation;
                let cloudSpawnY = aboveGroundLevel - yVariation;
                let cloudPosition = Vector.blockToWorldSpace(new Vector(cloudSpawnX, cloudSpawnY));


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
        let precipitaitonIntensity = [5, 10, 15, 25, 45, 60];
        let dirIndex = Math.floor(Math.random() * dir.length);
        let scale = 1;
        let minDropsIntensity = 80;

        // There will be 80 snowflakes/raindrops added times the intensity of precipitaiton so that rain and snow look natural at varrying intensities.
        for (let curIntensity = 0; curIntensity < precipitaitonIntensity[this.intensity]; curIntensity++) {
            for (let curDropNum = 0; curDropNum < minDropsIntensity; curDropNum++) {
                if (this.type === "snow") {
                    scale = Math.random() * (.5 - .2) + .2;
                } else if (dir[dirIndex] !== "down") {
                    scale = Math.random() * (.8 - .4) + .6;
                } else {
                    scale = Math.random() * (1.2 - .5) + .8;
                }
                // TODO consider adjusting the y value of precipitation based on Chad's positon as what I have here currently may not
                // be appropriate for worlds where Chad's y value is highly different from the village world because the rain or snow origin may cut off
                // and be seen if the camera moves too high.
                // I changed the value from -10 to -30 to account for this issue as a bandaid fix. Not sure how this will affect performance.
                let offCanvasYBuffer = -30;
                // Using the current index of the drop for the x and y value of the drop's position creates a staggered effect of the drops as a whole.
                // This makes the rain and snow look natural. To experience the pattern of this phenomeon in a more controlled situation, go to precipitation
                // and comment out this.pos = Vector(0,0); and replace with this.pos = pos; This will show how the pattern induced by the positioning of the drops
                // functions before they are given more random positions and placed randomly above the top of the screen upon being reset.
                let pxPosCurDrop = new Vector(curDropNum, curDropNum + offCanvasYBuffer);
                let blockPosCurDrop = Vector.blockToWorldSpace(pxPosCurDrop);
                GAME.addEntity(new Precipitation(dir[dirIndex], blockPosCurDrop, this.type, scale), 1);
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
