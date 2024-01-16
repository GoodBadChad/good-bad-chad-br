/**
 * The Inventory class. Will be used to keep track of the player's inventory.
 * @author Nathan Hinthorne
 */
class Inventory {

    constructor() {
        this.ammoList = [] // ammo should have a type and an amount
        
        this.addAmmo(Projectile.STONE, "infinite");
        this.switchToAmmo(Projectile.STONE);
    }

    /**
     * @param {number} type The type of the ammo to add to the inventory.
     * @param {number} amount The amount of ammo to add to the inventory.
     */
    addAmmo(type, amount) {
        this.ammoList.push({type: type, amount: amount});
    }

    /**
     * @returns {Array} An array of all the ammo in the inventory.
     */
    getAllAmmo() {
        return this.ammoList;
    }

    /**
     * @param {number} type The type of the ammo to get.
     * @returns {Object} The ammo with the given name.
     */
    getAmmo(type) {
        for (let i = 0; i < this.ammoList.length; i++) {
            if (this.ammoList[i].type == type) {
                return this.ammoList[i];
            }
        }
    }
    
    /**
     * @param {number} type The type of the ammo to switch to.
     */
    switchToAmmo(type) {
        this.currentAmmo = this.getAmmo(type);
    }

    /**
     * @returns {number} The amount of ammo the player currently has.
     */
    decreaseAmmo() {
        if (this.currentAmmo.amount != "infinite") {
            this.currentAmmo.amount--;
        }
    }

    /**
     * @returns {Object} The current ammo.
     */
    getCurrentAmmo() {
        return this.currentAmmo;
    }



    //... other methods for adding/removing various items from the inventory
}