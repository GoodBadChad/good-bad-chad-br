/**
 * Initializes the honor at the start of a game to default honor 
 * unless honor values already exists in currentHonor.
 * This class is intended to modify some of CHAD's stats based on his honor and the honor points gained
 * or lost during a particular event or action. 
 * The constructor takes in a positive or negative value for delatahonorPts from at least 0 to 5 points.
 * @author Caleb Krauter
 */

class honorSystem {
    constructor(deltaHonorPts, isNewGame) {
        /**
         * The milestones on the honor meter that determine special events and help to
         * calculate stat changes.
         */
        this.honorEventMarkers = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        /** Index used for recursive function "manageHonor" */
        this.i = 0;
        // When we have attack damage stat "this.attackDamage" will be set by it.
        /** Attack damage of CHAD. */
        this.attackDamage = 100;
        // When we have health stat "this.health" will be set by it.
        /** The health of CHAD. */
        this.health = 100;

        if (isNewGame) {
            this.currentHonor = this.INITIIAL_HONOR;
        } else {
            // Not sure if this works.
            this.currentHonor = this.currentHonor;
        }
        manageHonor(this.currentHonor, deltaHonorPts);
    }

    /** CHAD's initial honor at the start of the game. */
    get INITIIAL_HONOR() {
        return 50;
    }

    /**
     * The class the stats of CHAD's health and damage
     * dependent on his current honor and the positive or negative addend representing 
     * the honor points he gained or lost from a particular action.
     * @param {integer} currentHonor 
     * @param {integer} deltaHonorPts 
     */
    manageHonor(currentHonor, deltaHonorPts) {
        if ((currentHonor + deltaHonorPts) >= this.honorEventMarkers[i]) {
            // Update stats.
            // Sign of deltaHonorPts is negative if there is a decrease in honor.
            // Example, you have 50 points but loose 5, ~-5.5 or -50/9 will be added to your stats.
            // Example, you have 30 points and loose 6, -12.5 is added to your stats.
            if (Math.sign(deltaHonorPts) == -1 && ((currentHonor + deltaHonorPts) < this.INITIIAL_HONOR)) {
                this.setDamage((this.INITIIAL_HONOR / this.honorEventMarkers[i]) * deltaHonorPts);
                this.setHealth((this.INITIIAL_HONOR / this.honorEventMarkers[i]) * deltaHonorPts);
                triggerBadChadEvent(this.honorEventMarkers[i]);
                // In the case we are increasing honor or we are decreasing but have more or equal to the initial honor amount.
            } else { // Current honor plus delta honor points is initial honor (50) or higher
                // Example: You have 50 honor and gain 5, your updated stat will get an additional 5.5 points add to
                // the 100 damage and health assuming this isn't after losing honor previously.
                // Another example: You have 30 honor and increase by 5 to 35, your new stats will update with an additional
                // 3.5 points.
                // Example, you have 60 points and loose 5 points, you will add -4.5 points to your stats.
                // Example, you have 70 points and add 6 to your honor, 9 points will be added to your stats.
                this.setDamage((this.honorEventMarkers[i] / this.INITIIAL_HONOR) * deltaHonorPts + deltaHonorPts / 10)
                this.setHealth((this.honorEventMarkers[i] / this.INITIIAL_HONOR) * deltaHonorPts + deltaHonorPts / 10)
            }
            return;
        }
        i++;
        this.manageHonor(currentHonor, deltaHonorPts);
    }

    // The acutal amound of buffing/nerfing can be adjusted as the game is balanced/maintained.

    /**
     * Sets the damage for CHAD, could be a buff, nerf or neutral update to his damage.
     * @param {integer} damageAddend 
     */
    setDamage(damageAddend) {
        this.attackDamage += damageAddend;
    }

    /**
     * Sets the health of CHAD, could be a buff, nerf or neutral update to his damage.
     * @param {integer} healthAddend 
     */
    setHealth(healthAddend) {
        this.health += healthAddend;
    }

    /**
     * Trigger a special event for when CHAD becomes dishonorable at specific
     * milestones in the honorEventMarkers below the INITIAL_HONOR point.
     * @param {integer} honorEventMarker 
     */
    triggerBadChadEvent(honorEventMarker) {
        // Change CHAD's animation and dialog. Trigger a BAD CHAD event
        // based on the honorEventMarker.
    }

}