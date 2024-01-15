/**
 * The Inventory class. Will be used to keep track of the player's inventory.
 * @author Nathan Hinthorne
 */
class Inventory {

    constructor() {
        this.ammoList = [] // ammo should have a name and an amount
        
        this.addAmmo(Ammo.STONE, "infinite");
        this.switchToAmmo(Ammo.STONE);
    }

    /**
     * @param {number} name The name of the ammo to add to the inventory.
     * @param {number} amount The amount of ammo to add to the inventory.
     */
    addAmmo(name, amount) {
        this.ammoList.push({name: name, amount: amount});
    }

    /**
     * @returns {Array} A map of all the ammo in the inventory.
     */
    getAllAmmo() {
        return this.ammoList;
    }

    /**
     * @param {string} name The name of the ammo to get.
     * @returns {Object} The ammo with the given name.
     */
    getAmmo(name) {
        for (let i = 0; i < this.ammoList.length; i++) {
            if (this.ammoList[i].name == name) {
                return this.ammoList[i];
            }
        }
    }
    
    /**
     * @param {string} name The name of the ammo to switch to.
     */
    switchToAmmo(name) {
        this.currentAmmo = this.getAmmo(name);
    }

    /**
     * @returns {number} The amount of ammo the player currently has.
     */
    decreaseAmmo() {
        if (this.currentAmmo.amount != "infinite") {
            this.currentAmmo.amount--;
        }
    }



    //... other methods for adding/removing various items from the inventory
}