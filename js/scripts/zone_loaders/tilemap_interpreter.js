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