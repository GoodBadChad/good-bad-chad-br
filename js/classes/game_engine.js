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
            firing: false
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

        if (this.user.aiming) {
            this.user.aiming = false;
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

        CANVAS.addEventListener("mouseDown", (e) => {
            this.user.firing = true;
            this.user.aiming = false;
        });

        CANVAS.addEventListener("mouseUp", (e) => {
            this.user.aiming = true;
            this.user.firing = false;
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
            }
        }, false);
    };

    drawGrid() {
        CTX.strokeStyle = "white";
        CTX.strokeWeight = 1;
        // Draw the grid.
        for (let x = DIMENSION.MIN_X; x <= DIMENSION.MAX_X; x += Block.SCALED_SIZE) {
            for (let y = DIMENSION.MIN_Y; y <= DIMENSION.MAX_Y; y += Block.SCALED_SIZE) {
                CTX.beginPath();
                CTX.moveTo(DIMENSION.MIN_X - CAMERA.pos.x, y - CAMERA.pos.y);
                CTX.lineTo(DIMENSION.MAX_X - CAMERA.pos.x, y - CAMERA.pos.y);
                CTX.stroke();

                CTX.beginPath();
                CTX.moveTo(x - CAMERA.pos.x, DIMENSION.MIN_Y - CAMERA.pos.y);
                CTX.lineTo(x - CAMERA.pos.x, DIMENSION.MAX_Y - CAMERA.pos.y);
                CTX.stroke();
            }
        }
        CTX.fillStyle = "red";
        CTX.font = FONT.VT323_NORMAL;
        let gameX = DIMENSION.MIN_X + 5;
        const minY = DIMENSION.MIN_Y + 18;
        let gameY = minY;
        for (let blockX = DIMENSION.MIN_BLOCK_X; blockX <= DIMENSION.MAX_BLOCK_X; blockX += 5) {
            for (let blockY = DIMENSION.MIN_BLOCK_Y; blockY <= DIMENSION.MAX_BLOCK_Y; blockY += 5) {
                let pt = "(" + blockX + ", " + blockY + ")";
                CTX.fillText(pt, gameX - CAMERA.pos.x, gameY - CAMERA.pos.y, Block.SCALED_SIZE);
                gameY += Block.SCALED_SIZE * 5;
            }
            gameX += Block.SCALED_SIZE * 5;
            gameY = minY;
        }

    };
};