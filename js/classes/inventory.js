/**
 * The Inventory class. Will be used to keep track of the player's inventory.
 * @author Nathan Hinthorne
 */
class Inventory {

    constructor() {
        this.ammoList = [] // ammo should have a type and an amount
        
        this.addAmmo(Projectile.STONE, Infinity);
        this.addAmmo(Projectile.WOOD, 10);
        this.addAmmo(Projectile.METAL, 10);
        this.addAmmo(Projectile.BOMB, 10);
        this.addAmmo(Projectile.LASER, 10);
        this.switchToAmmo(Projectile.WOOD);
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
            let ammo = this.ammoList[i];
            if (ammo.type == type && this) {
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
     * @returns {Ammo} The ammo that was just used. None if the ammo 
     */
    useCurrentAmmo() {
        if (this.currentAmmo.amount <= 0) {
            return "Empty";
        }

        if (this.currentAmmo.amount != Infinity) {
            this.currentAmmo.amount--;
            return this.currentAmmo.type;
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