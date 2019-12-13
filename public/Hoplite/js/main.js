import Map from "./Map.js";
import Warrior from "./Warrior.js";
import Archer from "./Archer.js";

let map;

// temp
document.addEventListener("keydown", (ev) => {
    if (ev.key === " ")
        update();
});

const s = (sketch) => {
    sketch.setup = () => {
        let cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cnv.style('display', 'block');
        sketch.frameRate(60);

        map = new Map(sketch);
        let rad = 5;

        map.init(rad, 5);

        map.setPlayer(0, -rad + 1, rad - 1);
        map.generateWall();

        // temporaire
        let tile;
        let isNeighbour;

        do {
            isNeighbour = false;
            tile = map.tilesList[Math.round(Math.random() * map.tilesList.length)];
            console.log(tile);
            if (tile !== undefined) {
                map.getNeighbours(tile).forEach((neighbour) => {
                    if (neighbour === map.player.tile)
                        isNeighbour = true;
                });
            }
        } while (tile === undefined || tile.wall || isNeighbour || tile === map.player.tile);

        map.demons.push(new Archer(map, tile));
    };

    sketch.draw = () => {
        sketch.background(50);
        sketch.showFPS();

        map.tilesList.forEach(tile => {
            tile.show();
        });

        map.player.show();
        map.demons.forEach((e) => {
            e.show();
        });
    };

    sketch.mousePressed = () => {
        let tile = map.pixel_to_flat_hex(); // correct out of the map mouse pos
        if (tile) {
            console.log(tile);
        }
    };

    sketch.mouseDragged = () => {
        // let tile = map.pixel_to_flat_hex();
    };

    sketch.showFPS = () => {
        newP5.textSize(15);
        newP5.fill(newP5.color(200));
        newP5.text(`fps: ${newP5.floor(newP5.getFrameRate())}`, sketch.windowWidth - 50, 20);
        newP5.textSize(12);
    };
};

export let newP5 = new p5(s);

function update() {
    map.demons.forEach((demon) => {
        if (demon.canAttack(map.player))
            demon.attack(map.player);
        else {
            demon.planMovement();
        }
    });
}