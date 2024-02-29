package dev_tools_temp;

/**
 * Makes a console output for 2D JS array template for a tile map.
 * @author Caleb Krauter
 */
public class MakeMap {

    /**
     * Constructor
     */
    public MakeMap() {
        fillArray();

    }

    /**
     * Fills the array and outputs it to the console in the format of the 2D JS aray.
     * 
     * How to use it:
     * - Change width and height as necessary to make a new template.
     * - Change groundDefault to a value that represents the primarily used block value.
     */
    public void fillArray() {
        System.out.print("[");
        int width = 150;
        int height = 25;
        int startGround = 20;
        int firstLayerBlock = 2;
        int air = 0;
        // Change this value to match what the world type block uses the most. 1 is used for dirt.
        // For ice world you would choose the value that is used for ice block or whatever the ground will
        // be primarily made up of.
        int groundDefault = 1;
        for (int y = 0; y <= height; y++) {
            System.out.print("[");

            if (y == startGround) {
                System.out.print("\'" + firstLayerBlock + "\', ");

            } else if (y < startGround) {
                    // Print blank space.
                    System.out.print("\'" + air + "\', ");
                } else {
                    // Print the ground block value.
                    System.out.print("\'" + groundDefault + "\', ");
                }

            for (int x = 0;x <= width; x++) {
                if (y == startGround) {
                    System.out.print("\'" + firstLayerBlock + "\', ");
    
                } else if (y < startGround) {
                    // Print blank space.
                    System.out.print("\'" + air + "\', ");
                } else {                    
                    // Print the ground block value.
                    System.out.print("\'" + groundDefault + "\', ");
                }
                
            }
            System.out.print("],\n");
        }
        System.out.print("];");
    }
}


