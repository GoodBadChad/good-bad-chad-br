/**
 * Class that represents the HUD and defines its components.
 * 
 * @author Trae Claar
 * @author Nathan Hinthorne
 */
class Hud {
    /**
     * Constructor for the HUD that adds it components.
     */
    constructor() {
        this.addComponents();
    }

    /** The default font size for text in the HUD. Certain components may use different font sizes. */
    static get TEXT_SIZE() {
        return 32;
    }

    /** The margin (in pixels) between HUD elements and the edge of the canvas. */
    static get MARGIN() {
        return 10;
    }

    /**
     * Add a component to the HUD. Creates a field for the component and adds the component
     * to the game engine as an entity. This means that the component must have an update
     * and draw method.
     * 
     * @param {string} name the component's name, used for its field identifier
     * @param {Component} component the component to add (must have update and draw methods)
     * @throws {Error} Will throw an error if component does not have an update and a draw method.
     */
    addComponent(name, component) {
        if (!component.update || !component.draw) {
            throw new Error("Cannot add component: component must have update and draw methods.");
        }
        this[name] = component;
        GAME.addEntity(component);
    }

    /**
     * Initialize the HUD components.
     */
    addComponents() {
        // add Chad's head, rune counter, and health bar
        this.chadHead = new Animator(Chad.SPRITESHEET,
            new Vector(32, 15),
            new Vector(Chad.SIZE.x - 2, 17),
            1, 1)
        const healthBarYPos = 15 + 17 * CHAD.scale;
        this.addComponent("healthBar", new HudHealthBar(
            new Vector(Hud.MARGIN, healthBarYPos)
        ));
        this.addComponent("runeCounter", new ItemCounter(

            new Vector(Chad.SIZE.x * CHAD.scale + 20, (healthBarYPos - ItemCounter.HEIGHT) / 2),
            new Animator("./sprites/runes.png", new Vector(0, 32), new Vector(32, 32), 1, 1), 
            0 // TODO: replace with an access to the rune field once it exists
        ));

        // add pause button
        this.addComponent("pauseButton", new PauseButton(
            new Vector(Camera.SIZE.x - PauseButton.SIZE.x - Hud.MARGIN, Hud.MARGIN)
        ));

        //TODO: add a hidden options button to the center-right of the screen
        //TODO: add a hidden options menu (will contain volume sliders, spanish mode, debug mode, save progress, etc.)
        //TODO: add a hidden game over screen


        // add weapon labels
        const weaponLabelWidth = 150;
        const weaponLabelYPos = Camera.SIZE.y - ItemLabel.DEFAULT_SIZE.y - Hud.MARGIN;
        this.addComponent("slingshotLabel", new ItemLabel(
            new Vector(Hud.MARGIN, weaponLabelYPos),
            new Animator(Slingshot.SPRITESHEET, new Vector(0, 0), Slingshot.SIZE, 1, 1),

            "Left-click", 
            null, 
            weaponLabelWidth,
            5
        ));
        this.addComponent("swordLabel", new ItemLabel(
            new Vector(weaponLabelWidth + Hud.MARGIN, weaponLabelYPos),
            new Animator(Sword.SPRITESHEET, new Vector(0, 0), Sword.SIZE, 1, 1),
            "Right-click", 
            null, 
            weaponLabelWidth,
            -15 // yes I'm using a negative padding don't judge me, it makes the sword bigger
        ));

        // add slingshot ammo hotbar
        const hotbarItemWidth = ItemLabel.DEFAULT_SIZE.x;
        const hotbarXStart = (Camera.SIZE.x - hotbarItemWidth * 5) / 2 - 16;
        const hotbarY = Camera.SIZE.y - ItemLabel.DEFAULT_SIZE.y - Hud.MARGIN;
        this.addComponent("ammoStoneLabel", new AmmoLabel(
            new Vector(hotbarXStart, hotbarY),
            Projectile.STONE,
            "1"
        ));
        this.addComponent("ammoWoodLabel", new AmmoLabel(
            new Vector(hotbarXStart + hotbarItemWidth + 4, hotbarY),
            Projectile.WOOD,
            "2"
        ));
        this.addComponent("ammoBombLabel", new AmmoLabel(
            new Vector(hotbarXStart + (2 * hotbarItemWidth + 4), hotbarY),
            Projectile.BOMB,
            "3"
        ));
        this.addComponent("ammoMetalLabel", new AmmoLabel(
            new Vector(hotbarXStart + 3 * (hotbarItemWidth + 4), hotbarY),
            Projectile.METAL,
            "4"
        ));
        this.addComponent("ammoLaserLabel", new AmmoLabel(
            new Vector(hotbarXStart + 4 * (hotbarItemWidth + 4), hotbarY),
            Projectile.LASER,
            "5"
        ));

        // add a food labels on the bottom right of the screen
        this.addComponent("foodLabel", new FoodLabel(
            new Vector(Camera.SIZE.x - ItemLabel.DEFAULT_SIZE.x - Hud.MARGIN, Camera.SIZE.y - ItemLabel.DEFAULT_SIZE.y - Hud.MARGIN),
            FoodItem.STEAK
        ));

    }

    /**
     * Update the HUD.
     */
    update() {
        // if the user clicks on the pause/play button, toggle GAME.running
        if (GAME.user.firing && this.pauseButton.isMouseOver()) {
            GAME.running = !GAME.running;
            ASSET_MGR.playAudio(SFX.UI_HIGH_BEEP.path, SFX.UI_HIGH_BEEP.volume);
            // TODO: open options menu here

        }
    }

    /**
     * Draw any HUD elements not drawn by individual components.
     */
    draw() {
        this.chadHead.drawFrame(new Vector(10, 10), CHAD.scale);
    }
}

/**
 * Component that serves as a label for some item and its associated quantity.
 * 
 * @author Trae Claar
 */
class ItemCounter {
    /**
     * Constructor for an ItemCounter.
     * 
     * @param {Vector} pos the position of the ItemCounter on the canvas
     * @param {Animator} animation the Animator which will serve as the ItemCounter's image
     * @param {number} initialCount the intial count displayed by the ItemCounter
     */
    constructor(pos, animation, initialCount) {
        this.pos = pos;
        this.animation = animation;
        this.count = initialCount;
    }

    /** The fixed height (in pixels) of an ItemCounter on the canvas. */
    static get HEIGHT() {
        return 40;
    }

    /** The font size of the ItemCounter's count text. */
    static get TEXT_SIZE() {
        return 36;
    }

    /** The width of the left margin (in pixels) of the ItemCounter's count text. */
    static get TEXT_LEFT_MARGIN() {
        return 5;
    }

    /** Set the ItemCounter's count. */
    setCount(count) {
        this.count = count;
    }

    /** Update the ItemCounter. Does nothing. */
    update() {

    }

    /** Draw the ItemCounter. */
    draw() {
        // draw the item image
        const animScale = ItemCounter.HEIGHT / this.animation.size.y;
        this.animation.drawFrame(this.pos, animScale);

        // draw the count
        CTX.fillStyle = "white";
        CTX.font = ItemCounter.TEXT_SIZE + "px vt323";
        CTX.fillText(this.count, this.pos.x + this.animation.size.x * animScale + ItemCounter.TEXT_LEFT_MARGIN,
            this.pos.y + ItemCounter.HEIGHT - (ItemCounter.HEIGHT - CTX.measureText(this.count).emHeightAscent) / 2);
    }
}

/**
 * Component that serves as a label for the currently selected food item.
 * 
 * @author Nathan Hinthorne
 */
class FoodLabel {
    /**
     * Constructor for an FoodLabel.
     * 
     * @param {Vector} pos the position of the FoodLabel on the canvas
     * @param {number} type the fodo type associated with the FoodLabel (should be a FoodItem member type)
     */
    constructor(pos, type) {
        this.foodItem = INVENTORY.getFood(type);
        this.type = type;
        this.label = new ItemLabel(
            pos, 
            this.foodItem.animator,
        );
    }

    /** Update the quantity and selection status of the FoodLabel. */
    update() {
        this.label.setQuantity(this.foodItem.amount);
        this.label.setSelected(INVENTORY.getCurrentFood().type === this.type);
    }

    /** Draw the FoodLabel. */
    draw() {
        this.label.draw();
    }
}

/**
 * Component that serves as a label for an ammo type, displaying its image, the key used to select
 * it, and the amount of this ammo type in the inventory.
 * 
 * @author Trae Claar
 */
class AmmoLabel {
    /**
     * Constructor for an AmmoLabel.
     * 
     * @param {Vector} pos the position of the AmmoLabel on the canvas
     * @param {number} type the ammo type associated with the AmmoLabel (should be a Projectile member type)
     * @param {string} inputName the input key used to select this ammo type
     */
    constructor(pos, type, inputName) {
        this.type = type;
        this.label = new ItemLabel(

            pos, 
            new Animator(AmmoItem.SPRITESHEET, new Vector(0, type * AmmoItem.SPRITESHEET_ENTRY_HEIGHT), 
                AmmoItem.SIZE, 1, 1),
                inputName,
                INVENTORY.getAmmo(type).amount
        );
    }

    /** Update the quantity and selection status of the AmmoLabel. */
    update() {
        this.label.setQuantity(INVENTORY.getAmmo(this.type).amount);
        this.label.setSelected(INVENTORY.getCurrentAmmo().type === this.type);
    }

    /** Draw the AmmoLabel. */
    draw() {
        this.label.draw();
    }
}

/**
 * Component that serves as a label for an item, displaying an associated image, control input, 
 * and an optional quantity.
 * 
 * @author Trae Claar
 */
class ItemLabel {
    /**
     * Constructor for an ItemLabel.
     * 
     * @param {Vector} pos the position of the ItemLabel on the canvas
     * @param {Animator} animation the Animator to be used as the ItemLabel's image
     * @param {string} inputName the name of the control associated with the item
     * @param {number} [quantity] (OPTIONAL) the quantity associated with the item
     * @param {number} [width] (OPTIONAL) the width (in pixels) of the ItemLabel on the canvas
     * @param {number} [imgPadding] (OPTIONAL) the padding (in pixels) of the ItemLabel's image
     */
    constructor(pos, animation, inputName, quantity, width = ItemLabel.DEFAULT_SIZE.x,
        imgPadding = ItemLabel.DEFAULT_IMG_PADDING) {

        this.pos = pos;
        this.animation = animation;
        this.size = new Vector(width, ItemLabel.DEFAULT_SIZE.y);
        this.inputName = inputName;
        this.quantity = quantity;
        this.selected = false;
        this.imgPadding = imgPadding;
    }

    /** The default size (in pixels) of an ItemLabel on the canvas */
    static get DEFAULT_SIZE() {
        return new Vector(75, 75);
    }

    /** The font size of an ItemLabel's text. */
    static get TEXT_SIZE() {
        return Hud.TEXT_SIZE;
    }

    /** The width (in pixels) of an ItemLabel's text margins. */
    static get TEXT_MARGIN() {
        return 8;
    }

    /** The width (in pixels) of the item image's padding. */
    static get DEFAULT_IMG_PADDING() {
        return 25;
    }

    /** The default width (in pixels) of an ItemLabel's border. */
    static get DEFAULT_BORDER_WIDTH() {
        return 2;
    }

    /** The width (in pixels) of an ItemLabel's border when selected. */
    static get SELECTED_BORDER_WIDTH() {
        return 6;
    }

    /** 
     * Set the quantity associated with the ItemLabel. 
     * 
     * @param {number} quantity the new quantity of the ItemLabel
     */
    setQuantity(quantity) {
        this.quantity = quantity;
    }

    /** 
     * Set whether or not this ItemLabel is selected. 
     * 
     * @param {boolean} isSelected a boolean indicating whether or not the ItemLabel is selected
     */
    setSelected(isSelected) {
        this.selected = isSelected;
    }

    /**
     * Update the ItemLabel. Does nothing.
     */
    update() {

    }

    /**
     * Draw the ItemLabel.
     */
    draw() {

        // draw a translucent background for the ItemLabel
        CTX.fillStyle = "rgba(32, 32, 32, 0.5)";
        CTX.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        // draw a border around the ItemLabel
        CTX.lineWidth = (this.selected) ? ItemLabel.SELECTED_BORDER_WIDTH : ItemLabel.DEFAULT_BORDER_WIDTH;
        CTX.strokeStyle = "white";
        CTX.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);

        // draw the image on the ItemLabel
        // the image's height will be scaled to the height of the ItemLabel
        // the image will be centered horizontally within the ItemLabel
        const animScale = (this.size.y - 2 * this.imgPadding) / this.animation.size.y;
        this.animation.drawFrame(Vector.add(this.pos, new Vector((this.size.x - animScale * this.animation.size.x)
            / 2, + this.imgPadding)), animScale);

        // draw the inputName text
        CTX.fillStyle = "white";
        CTX.font = ItemLabel.TEXT_SIZE + "px vt323";
        CTX.fillText(this.inputName, this.pos.x + ItemLabel.TEXT_MARGIN, this.pos.y + ItemLabel.TEXT_SIZE - ItemLabel.TEXT_MARGIN);

        // if this ItemLabel is assigned a quantity, draw it in the bottom right corner of the ItemLabel
        if (this.quantity) {
            let text = "x" + this.quantity;
            if (this.quantity === Infinity) {
                text = "∞";
                CTX.font = ItemLabel.TEXT_SIZE + "px sans-serif";
            }

            CTX.fillStyle = "white";
            CTX.fillText(text, this.pos.x + this.size.x - ItemLabel.TEXT_MARGIN - CTX.measureText(text).width,
                this.pos.y + this.size.y - ItemLabel.TEXT_MARGIN);
        }
    }
}

/** 
 * A class which serves as a pause button.
 * 
 * @author Trae Claar
 */
class PauseButton {
    /**
     * Constructor for a PauseButton.
     * 
     * @param pos the position of the pause button on the canvas
     */
    constructor(pos) {
        this.pos = pos;
    }

    /** The size (in pixels) of the PauseButton on the canvas. */
    static get SIZE() {
        return new Vector(50, 50);
    }

    /** The size (in pixels) of a single bar in the pause icon on the canvas. */
    static get BAR_SIZE() {
        return new Vector(10, 30);
    }

    /** The width (in pixels) of the PauseButton's border. */
    static get BORDER_WIDTH() {
        return 2;
    }

    /** The distance (in pixels) between the bars in the pause icon. */
    static get BAR_DISTANCE() {
        return 5;
    }

    /** The margin width (in pixels) between the play icon and the border of the PauseButton. */
    static get PLAY_ICON_MARGIN() {
        return 10;
    }

    /**
     * Checks whether or not the mouse is currently positioned over the PauseButton.
     * 
     * @returns {boolean} true if the mouse is over the PauseButton, and false otherwise
     */
    isMouseOver() {
        return GAME.mousePos.x > Camera.SIZE.x - PauseButton.SIZE.x
            && GAME.mousePos.y < PauseButton.SIZE.y;
    }

    /** Update the PauseButton. */
    update() {

    }

    /** Draw the PauseButton. */
    draw() {
        const size = PauseButton.SIZE;
        const barSize = PauseButton.BAR_SIZE;

        // draw a translucent background for the PauseButton
        CTX.fillStyle = "rgba(32, 32, 32, 0.5)";
        CTX.fillRect(this.pos.x, this.pos.y, size.x, size.y);
        // draw a border around the PauseButton
        CTX.lineWidth = PauseButton.BORDER_WIDTH;
        CTX.strokeStyle = "white";
        CTX.strokeRect(this.pos.x, this.pos.y, size.x, size.y);

        // draw the PauseButton icon
        CTX.fillStyle = "white";
        if (GAME.running) {
            // if the game is running, draw a pause icon
            CTX.fillRect(this.pos.x + (size.x - PauseButton.BAR_DISTANCE) / 2 - barSize.x,
                this.pos.y + (size.y - barSize.y) / 2, barSize.x, barSize.y);
            CTX.fillRect(this.pos.x + (size.x + PauseButton.BAR_DISTANCE) / 2, this.pos.y + (size.y - barSize.y) / 2,
                barSize.x, barSize.y);
        } else {
            // if the game is paused, draw a play icon
            const margin = PauseButton.PLAY_ICON_MARGIN;
            CTX.beginPath();
            CTX.moveTo(this.pos.x + margin, this.pos.y + margin);
            CTX.lineTo(this.pos.x + size.x - margin, this.pos.y + size.y / 2);
            CTX.lineTo(this.pos.x + margin, this.pos.y + size.y - margin);
            CTX.fill();
        }

    }
}



/**
 * A class used to display Chad's health in the HUD.
 * 
 * @author Trae Claar
 */
class HudHealthBar {
    /**
     * Constructor for a HUDHealthBar. 
     * 
     * @param pos the position of the health bar on the canvas
     */
    constructor(pos) {
        this.pos = pos;
    };

    /** The height of the actual health bar. */
    static get BAR_HEIGHT() {
        return 20;
    }

    /** The size (in pixels) of the HealthBar on the canvas. */
    static get SIZE() {
        return new Vector(400, HudHealthBar.BAR_HEIGHT /*+ Hud.TEXT_SIZE*/);
    };

    /** The padding between the actual health bar and the outer edge of the border. */
    static get PADDING() {
        return 5;
    };

    /** Update the HealthBar. */
    update() {

    };

    /** Draw the HealthBar. */
    draw() {
        // draw background
        CTX.fillStyle = "#000000";
        CTX.fillRect(this.pos.x, this.pos.y, HudHealthBar.SIZE.x, HudHealthBar.BAR_HEIGHT);

        // draw the actual health bar
        CTX.fillStyle = "#ff0000";
        CTX.fillRect(this.pos.x + HudHealthBar.PADDING, this.pos.y + HudHealthBar.PADDING,
            (HudHealthBar.SIZE.x - HudHealthBar.PADDING * 2) * CHAD.health / Chad.MAX_HEALTH,
            HudHealthBar.BAR_HEIGHT - HudHealthBar.PADDING * 2);
    };
}