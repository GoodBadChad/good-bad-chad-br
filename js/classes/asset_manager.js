/**
 * This class is used to manage Assets (just sprites, for now).
 * It will download the assets and store them (in its cache) for use by other classes.
 * @author Seth Ladd (original), Chris Marriott (modified), Devin Peevy (added JSDoc, modified), Nathan Hinthorne (added audio support)
 */
class AssetManager {
    constructor() {
        /** How many filepaths have been successfully added to the cache as images. */
        this.successCount = 0;
        /** How many filepaths could not be added to the cache as images. */
        this.errorCount = 0;
        /** An associative array of downloaded assets. [filePath => img]. */
        this.downloadQueue = AssetManager.BAREBONES_DL_Q;
        /** An indexed array of filepaths which still need to be downloaded. */
        this.cache = [];
    };

    /**
     * This method simply adds a filepath to the downloadQueue.
     */
    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    /**
     * @returns true if the AssetManager has put (or attempted to put) every Asset into the cache. 
     */
    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    /**
     * This method is going to take all paths from the downloadQueue and actually download them into images or audio, which will be stored in
     * the cache. It updates successCount and errorCount appropriately as well.
     * @param {function} callback The function to be run AFTER downloadAll has finished executing.
     */
    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {

            const path = this.downloadQueue[i];
            console.log(path);

            const ext = path.substring(path.length - 3);

            switch (ext) {
                case 'jpg':
                case 'png':
                    const img = new Image();
                    img.addEventListener("load", () => {
                        console.log("Loaded " + img.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    img.addEventListener("error", () => {
                        console.log("Error loading " + path);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    img.src = path;
                    this.cache[path] = img;
                    break;

                case 'mp3':
                case 'wav':
                    const audio = new Audio();
                    audio.addEventListener("loadeddata", () => {
                        console.log("Loaded " + this.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    audio.addEventListener("error", () => {
                        console.log("Error loading " + path);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    audio.addEventListener("ended", () => {
                        audio.pause();
                        audio.currentTime = 0;
                    });

                    audio.src = path;
                    audio.load();

                    this.cache[path] = audio;
                    break;

                default:
                    console.log("Error loading " + path + ": unknown file extension");
                    this.errorCount++;
                    if (this.isDone()) callback();
            }
        }
    };

    /**
     * @param {string} path The filepath of the Asset you are trying to access.
     * @returns The image associated with the path in the cache (given that it has been successfully downloaded).
     */
    getAsset(path) {
        return this.cache[path];
    };

    /**
     * This refreshes the AssetManager to be like new. This is done upon loading a zone to keep down space waste.
     */
    refresh() {
        this.successCount = 0;
        this.errorCount = 0;
        this.downloadQueue = AssetManager.BAREBONES_DL_Q;
        this.cache = [];
    };

    /**
     * This method plays the audio associated with the given path.
     * @param {string} path The filepath of the audio you are trying to play.
     * @param {number} volume The volume to which you want to set the audio.
     * @param {boolean} loop True if you want the audio to loop, false otherwise.
     */
    playAudio(path, volume, loop) {
        loop ?? (loop = false);
        const audio = this.cache[path];
        audio.currentTime = 0;
        audio.volume = volume;

        audio.play();
        if (loop) {
            audio.addEventListener("ended", () => {
                audio.play();
            });
        }
    };

    /**
     * This method stops the audio associated with the given path.
     * @param {string} path The filepath of the audio you are trying to stop.
     */
    stopAudio(path) {
        const audio = this.cache[path];
        audio.pause();
        audio.currentTime = 0;
    };

    /** 
     * This method sets the volume of all audio in the cache to the given volume.
     * @param {number} volume The volume to which you want to set the audio.
     */
    adjustVolume(volume) {
        for (let key in this.cache) {
            const audio = this.cache[key];
            if (audio instanceof Audio) {
                audio.volume = volume;
            }
        }
    };

    /**
     * This method pauses all audio in the cache.
     */
    pauseBackgroundMusic() {
        for (let key in this.cache) {
            const audio = this.cache[key];
            if (audio instanceof Audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    };

    /**
     * The BAREBONES_DL_Q is an array of strings, filepaths to the most essential assets in our game.
     * Those so essential that it would be tedious and more error prone to have to load them in every zone.
     * this.downloadQueue is reset to this every time that the ASSET_MGR is refreshed.
     */
    static get BAREBONES_DL_Q() {
        return [
            // Entities:
            // TODO add clouds and rain as bairbones?
            Block.SPRITESHEET,
            Crosshair.SPRITESHEET,
            DialogBubble.SPRITESHEET,
            OverheadIcon.SPRITESHEET,
            Chad.SPRITESHEET,
            Projectile.SPRITESHEET,
            Slingshot.SPRITESHEET,
            Sun.SPRITESHEET,
            Sword.SPRITESHEET,
            Rune.SPRITESHEET,

            // Sounds:
            SFX.JUMP1.path,
            SFX.JUMP2.path,
            SFX.SLINGSHOT_LAUNCH1.path,
            SFX.SLINGSHOT_LAUNCH2.path,
            SFX.SLINGSHOT_LAUNCH3.path,
            SFX.SLINGSHOT_LAUNCH4.path,
            SFX.SLINGSHOT_STRETCH.path,
            Sun.SPRITESHEET,
            PapaChad.SPRITESHEET,
            Slingshot.SPRITESHEET,
            Block.SPRITESHEET,
            Projectile.SPRITESHEET,
            Slingshot.SPRITESHEET,
            Crosshair.SPRITESHEET,
            //Sword.SPRITESHEET,
            "./sfx/slime_jump.mp3",
            "./sfx/slingshot_launch.wav",
            "./sfx/temp_jump.wav"
        ];
    };
};

