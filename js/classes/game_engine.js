/**
 * The Game Engine contains all entities, and puts them all through the update-render loop. It is also responsible for tracking user input.
 * @author Seth Ladd (original), Chris Marriott (modified), Devin Peevy (modified), Nathan Hinthorne (modified), Caleb Krauter (modified)
 */
class GameEngine {
    /**
     * This constructs a new GameEngine, initializing some necessary parameters.
     * @param {boolean} isSpanish ¿Debería estar en español este juego? Default: false.
     */
    constructor(isSpanish) {
        /** ¿Está el juego en español? Default: false. */
        this.spanish = isSpanish ?? false;
        /** Everything that will be updated and drawn each frame. */
        this.entities = [];

        /** A user object to define behaviors of Chad. */
        this.user = {
            movingDown: false,
            movingUp: false,
            movingRight: false,
            movingLeft: false,
            jumping: false,
            sprinting: false,
            dashing: false,
            aiming: false,
            firing: false,
            jabbing: false
        }

        // /** Where is the x coordinate of the user's mouse? */
        // this.mouseX = 0;
        // /** Where is the y coordinate of the user's mouse? */
        // this.mouseY = 0;
        this.mousePos = new Vector(0, 0);

        /** The timer tells you how long it's been since the last tick! */
        this.timer = new Timer();
        /** Are we currently debugging? */
        this.debug = false;
    };

    /**
     * This adds a new entity to the entities array.
     * @param {Object} entity The entity (sprite) that you want to add to the Game.
     */
    addEntity(entity) {
        this.entities.push(entity);
    };

    /** This is going to clear all of the entities so that a new set can be placed in. */
    clearEntities() {
        this.entities = [];
    }

    /** This method is actually going to control the update-render loop that is at the heart of any game. */
    start() {
        this.startInput();
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, CANVAS);
        };
        gameLoop();
    };

    /** This is the update-render loop. */
    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    /**
     * This method is going to go through all entities and allow them to update their position.
     */
    update() {
        // Iterate forward through the entities array. Update everything.
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        // Update Chad, who is not a regular entity.
        CHAD.update();
        // Update the camera, which is not a regular entity.
        CAMERA.update();

        // Iterate backward through the entities array, and remove all entities which ought be removed.
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        if (this.user.firing) {
            this.user.firing = false;
        }
    };

    /**
     * This method is going to clear the canvas and redraw ALL of the entities in their *new* positions.
     */
    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        CTX.fillStyle = BG_COLOR;
        CTX.fillRect(0, 0, Camera.SIZE.x, Camera.SIZE.y);
        // Draw entities from first to last.
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
        // If we're debugging, draw the grid.
        if (this.debug) {
            this.drawGrid();
        }
        // Draw Chad, who is not a regular entity.
        CHAD.draw();
    };

    /**
     * This method is going to start listening for user inputs. Affects the Game Engine's left/right/up/down booleans according
     * to interaction with either the WASD keys or arrows.
     */
    startInput() {

        CANVAS.addEventListener("mousedown", (e) => {
            this.user.firing = false;
            this.user.aiming = true;
        });

        CANVAS.addEventListener("mouseup", (e) => {
            this.user.aiming = false;
            this.user.firing = true;
            console.log("mouse clicked at (" + Math.round(this.mousePos.x) + ", " + Math.round(this.mousePos.y) + ")");
        });

        CANVAS.addEventListener("mousemove", (e) => {
            const rect = CANVAS.getBoundingClientRect();
            const scaleX = CANVAS.width / rect.width;
            const scaleY = CANVAS.height / rect.height;
            // this.mouseX = (e.clientX - rect.left) * scaleX;
            // this.mouseY = (e.clientY - rect.top) * scaleY;
            this.mousePos = new Vector((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
        });

        CANVAS.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyA":
                    this.user.movingLeft = true;
                    break;
                case "KeyD":
                    this.user.movingRight = true;
                    break;
                case "KeyS":
                    this.user.movingDown = true;
                    break;
                case "KeyW":
                    this.user.movingUp = true;
                    break;
                case "Space":
                    this.user.jumping = true;
                    break;
                case "ShiftLeft":
                    this.user.sprinting = true;
                    break;
                case "KeyX":
                    this.user.dashing = true;
                    break;
                case "KeyQ":
                    this.user.jabbing = true;
                    break;
            }
        }, false);

        CANVAS.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyA":
                    this.user.movingLeft = false;
                    break;
                case "KeyD":
                    this.user.movingRight = false;
                    break;
                case "KeyS":
                    this.user.movingDown = false;
                    break;
                case "KeyW":
                    this.user.movingUp = false;
                    break;
                case "Space":
                    this.user.jumping = false;
                    break;
                case "ShiftLeft":
                    this.user.sprinting = false;
                    break;
                case "KeyX":
                    this.user.dashing = false;
                    break;
                case "KeyQ":
                    this.user.jabbing = false;
                    break;
            }
        }, false);
    };

    /**
     * This is (the only thing, currently, that is) called when Debug mode is active!
     * This draws a grid around all blocks, and every 5 block cells are labeled.
     */
    drawGrid() {

        // (1) Draw the grid: 

        CTX.strokeStyle = "white";
        CTX.strokeWeight = 1;

        // Draw all the vertical lines by iterating through the x values we need.
        for (let x = ZONE.MIN_PT.x; x <= ZONE.MAX_PT.x; x += Block.SCALED_SIZE) {
            // Start a path
            CTX.beginPath();
            // Starting point
            CTX.moveTo(x - CAMERA.pos.x, ZONE.MIN_PT.y - CAMERA.pos.y);
            // Ending point
            CTX.lineTo(x - CAMERA.pos.x, ZONE.MAX_PT.y - CAMERA.pos.y);
            // Actually draw it.
            CTX.stroke();
            // Close the path
            CTX.closePath();
        }

        // Draw all the horizontal lines by iterating through the y values we need. 
        for (let y = ZONE.MIN_PT.y; y <= ZONE.MAX_PT.y; y += Block.SCALED_SIZE) {
            // Start a path
            CTX.beginPath();
            // Starting point
            CTX.moveTo(ZONE.MIN_PT.x - CAMERA.pos.x, y - CAMERA.pos.y);
            // Ending point
            CTX.lineTo(ZONE.MAX_PT.x - CAMERA.pos.x, y - CAMERA.pos.y);
            // Actually draw it.
            CTX.stroke();
            // Close the path
            CTX.closePath();
        }

        // (2) Label the cells.

        CTX.fillStyle = "red";
        CTX.font = FONT.VT323_NORMAL;
        
        // Where we want to start drawing the label. Note: the +5 is so that it is clear which cell we are labeling.
        let gameX = ZONE.MIN_PT.x + 5;
        // This is the minimum y value that we will write at. Note: the +18 is related to the font size.
        // Apparently drawing text with the context will start writing right ABOVE where you dictate.
        const minY = ZONE.MIN_PT.y + 18;
        // This is going to be where we want to start drawing the label, just like gameX.
        let gameY = minY;

        // As it is currently working, it will DEFINITELY label ZONE.MIN_BLOCK, and every 5 other than that.
        // Would like to refactor it eventually to DEFINITELY label the origin, but not super important.
        // Also, could be refactored to better use the Vector class's static methods.
        for (let blockX = ZONE.MIN_BLOCK.x; blockX <= ZONE.MAX_BLOCK.x; blockX += 5) {
            for (let blockY = ZONE.MIN_BLOCK.y; blockY <= ZONE.MAX_BLOCK.y; blockY += 5) {
                // The string representing the cell we are labeling.
                let pt = "(" + blockX + ", " + blockY + ")";
                // Draw it.
                CTX.fillText(pt, gameX - CAMERA.pos.x, gameY - CAMERA.pos.y, Block.SCALED_SIZE);
                // Skip 5 blocks.
                gameY += Block.SCALED_SIZE * 5;
            }
            // Skip 5 blocks.
            gameX += Block.SCALED_SIZE * 5;
            // Reset gameY! If you don't you'll only ever see the first column of labels.
            gameY = minY;
        }
    };
};