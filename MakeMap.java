
public class MakeMap {

    public MakeMap() {
        fillArray();

    }
    public void fillArray() {
        System.out.print("[");
        int width = 100;
        int height = 25;
        for (int y = 0; y <= height; y++) {
            System.out.print("[");
                if (y < height/2) {
                    System.out.print(0 + ", ");
                } else {
                    System.out.print(1 + ", ");
                }

            for (int x = 0;x <= width; x++) {
                if (y < height/2) {
                    System.out.print(0 + ", ");
                } else {
                    System.out.print(1 + ", ");
                }
                
            }
            

            System.out.print("],\n");
        }
        System.out.print("];");
    }
}


