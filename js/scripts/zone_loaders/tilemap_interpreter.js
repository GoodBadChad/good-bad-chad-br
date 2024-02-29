class tilemapInterpreter {

    constructor(tilemap, isSnow = false) {
        this.tilemap = tilemap;
        this.isSnow = isSnow;

        this.interpretTilemap();
    }

    interpretTilemap() {
        for (let y = ZONE.MAX_BLOCK.y; y >= ZONE.MIN_BLOCK.y; y--) {
            for (let x = ZONE.MAX_BLOCK.x; x >= ZONE.MIN_BLOCK.x; x--) {

                switch (this.tilemap[y][x]) {
                    case 'S':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_UP_GROUP_GREY));
                        break;
                    case 'R':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_DOWN_GROUP_GREY));
                        break;
                    case 'Q':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_UP_1_GREY));
                        break;
                    case 'P':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_DOWN_1_GREY));
                        break;
                    case 'O':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_UP_GROUP));
                        break;
                    case 'N':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_DOWN_GROUP));
                        break;
                    case 'M':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_UP_1));
                        break;
                    case 'L':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_SHARP_DOWN_1));
                        break;
                    case 'K':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_4), 1);
                        break;
                    case 'J':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_3));
                        break;
                    case 'I':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_2));
                        break;
                    case 'H':
                        GAME.addEntity(new Block(new Vector(x, y), Block.CAVE_1));
                        break;
                    case 'G':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE_DARK), -1);
                        break;
                    case 'F':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_RIGHT), 0);
                        break;
                    case 'E':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_LEFT), 0);
                        break;
                    case 'D':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_RIGHT_END), 0);
                        break;
                    case 'C':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_LEFT_END), 0);
                        break;
                    case 'A':
                        GAME.addEntity(new Block(new Vector(x, y), Block.TWIG_LEFT), -1);
                        break;
                    case 'B':
                        GAME.addEntity(new Block(new Vector(x, y), Block.TWIG_RIGHT), -1);
                        break;
                    case 'z':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LOG_SPRUCE_VIRTICAL), 1);
                        break;
                    case 'y':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LOG_SPRUCE_VIRTICAL), -1);
                        break;
                    case 'x':
                        GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector(x, y + 1))), 1);
                        break;
                    case '@':
                        GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_1, Vector.blockToWorldSpace(new Vector(x, y + 1))), 1);
                        break;
                    case 'w':
                        GAME.addEntity(new Decoration(Decoration.DECORATIONS.grass.GRASS_3, Vector.blockToWorldSpace(new Vector(x, y + 1))), -1);
                        break;
                    case 'v':
                        GAME.addEntity(new Block(new Vector(x, y), Block.TWIG_LEFT), 1);
                        break;
                    case 'u':
                        GAME.addEntity(new Block(new Vector(x, y), Block.TWIG_RIGHT), 1);
                        break;
                    case 't':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_RIGHT_HALF), 0);
                        break;
                    case 's':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_RIGHT_FULL), 0);
                        break;
                    case 'r':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_LEFT_HALF), 0);
                        break;
                    case 'q':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BR_LEFT_FULL), 0);
                        break;
                    case 'p':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BRANCH_TOP), 0);
                        break;
                    case 'o':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BRANCH_FILL_LOG), 0);
                        break;
                    case 'n':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BRANCH_FILL), 0);
                        break;
                    case 'm':
                        GAME.addEntity(new Block(new Vector(x, y), Block.DIRT), 0);
                        break;
                    case 'l':
                        if (this.isSnow) {
                            GAME.addEntity(new Block(new Vector(x, y), Block.SNOW_SURFACE), 1);
                        }
                        break;
                    case 'k':
                        GAME.addEntity(new Block(new Vector(x, y), Block.ICE));
                        break;
                    case 'j':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_SPRUCE_STAIRS_RIGHT));
                        break;
                    case 'i':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_SPRUCE_STAIRS_LEFT));
                        break;
                    case 'h':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_OAK_STAIRS_RIGHT), 0);
                        break;
                    case 'g':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANK_OAK_STAIRS_LEFT));
                        break;
                    case 'f':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE_VOLCANIC));
                        break;
                    case 'e':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE_DARK));
                        break;
                    case 'd':
                        GAME.addEntity(new Block(new Vector(x, y), Block.STONE_COBBLE));
                        break;
                    case 'c':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_REDWOOD_LIGHT));
                        break;
                    case 'b':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_REDWOOD));
                        break;
                    case 'a':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LOG_SPRUCE_VIRTICAL));
                        break;
                    case '9':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LOG_SPRUCE_HORIZONTAL));
                        break;
                    case '8':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_SPRUCE));
                        break;
                    case '7':
                        GAME.addEntity(new Block(new Vector(x, y), Block.PLANKS_OAK));
                        break;
                    case '6':
                        GAME.addEntity(new Block(new Vector(x, y), Block.BARS));
                        break;
                    case '5':
                        GAME.addEntity(new Block(new Vector(x, y), Block.LAVA_ROCK));
                        break;
                    case '4':
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_ICE));
                        break;
                    case '3':
                        GAME.addEntity(new Block(new Vector(x, y), Block.SNOWY_DIRT));
                        break;
                    case '2':
                        GAME.addEntity(new Block(new Vector(x, y), Block.GRASS));
                        break;
                    case '1':
                        GAME.addEntity(new Block(new Vector(x, y), Block.DIRT), -1);
                        break;

                    default:
                        break;
                }
            }

        }

    }

}