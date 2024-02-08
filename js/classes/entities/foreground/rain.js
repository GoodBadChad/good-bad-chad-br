// class Rain {
//     constructor(dir) {
//         this.dir = dir;
//         // if (dir == "left") {
//         //     spriteSheet = Rain.SPRITE_RAIN_LEFT;
//         // } else if (dir == "right") {
//         //     spriteSheet = Rain.SPRITE_RAIN_LEFT;
//         // } else {
//         //     spriteSheet = Rain.SPRITE_RAIN;
//         // }
//         this.animator = new Animator(Rain.dir.SPRITESHEET, 0, 0, Rain.SIZE.X, Rain.SIZE.Y, 1, 1);

//     }
//     static get RAIN() {
//         return {
//             down: {
//                 SPRITESHEET: "./sprites/rain_drop.png",
//                 SPRITESHEET_START_POS: new Vector(0, 0),
//                 FRAME_COUNT: 1,
//                 FRAME_DURATION: 1,
//                 SIZE: new Vector(16, 32),
//                 SCALE: 2
//             },
//             left: {
//                 SPRITESHEET: "./sprites/rain_drop_left.png",
//                 SPRITESHEET_START_POS: new Vector(0, 0),
//                 FRAME_COUNT: 1,
//                 FRAME_DURATION: 1,
//                 SIZE: new Vector(16, 32),
//                 SCALE: 2
//             },
//             right: {
//                 SPRITESHEET: "./sprites/rain_drop_right.png",
//                 SPRITESHEET_START_POS: new Vector(0, 0),
//                 FRAME_COUNT: 1,
//                 FRAME_DURATION: 1,
//                 SIZE: new Vector(16, 32),
//                 SCALE: 2
//             }
//         }
//     }
//     // static get SPRITE_RAIN_LEFT() {
//     //     return "./sprites/rain_drop_left.png";
//     // }

//     // static get SPRITE_RAIN_RIGHT() {
//     //     return "./sprites/rain_drop_right.png";

//     // }
//     static get SPRITE_RAIN() {
//         return "./sprites/rain_drop.png";
//     }

//     static get SIZE() {
//         return new Vector(16, 16);
//     }
//     update() {
//         this.pos = Vector.add(this.pos, this.pos.Y + 1);
//     }
//     draw() {
//         this.animator.drawFrame(this.pos.X, this.pos.Y, 1);
//     }
// }