
public class Maker {

    public Maker() {
        fillArray();

    }
    public void fillArray() {
        System.out.print("[");
        for (int y = 0; y <= 1000; y++) {
            System.out.print("[");
            
            for (int x = 0; x <= 1000; x++) {

                if (y < 12) {
                    System.out.print(0 + ", ");
    
                } else {
                    int val = 1;
                    System.out.print(val + ", ");
                }
                
            }
            

            System.out.print("],\n");
        }
        System.out.print("];");
    }
}


