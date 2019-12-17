import Map from "./Map.js";
import Warrior from "./Warrior.js";
import Archer from "./Archer.js";
import Timer from "./Timer.js";

let map;

async function main(canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    map = new Map(ctx);
    let rad = 5;

    map.init(rad, 5);

    map.setPlayer(0, -rad + 1, rad - 1);
    map.generateWall();

    document.addEventListener("click", mousePressed);

    // temporaire
    document.addEventListener("keydown", (ev) => {
        if (ev.key === " ") {
            //passer son tour
            update();
        }
    });

    let tile;
    let isNeighbour;
    do {
        isNeighbour = false;
        tile = map.tilesList[Math.round(Math.random() * map.tilesList.length)];
        // console.log(tile);
        if (tile !== undefined) {
            map.getNeighbours(tile).forEach((neighbour) => {
                if (neighbour === map.player.tile)
                    isNeighbour = true;
            });
        }
    } while (tile === undefined || tile.wall || isNeighbour || tile === map.player.tile);

    map.demons.push(new Archer(map, tile));

    // ===========

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        draw(ctx);
    }
    timer.start();

    function showFPS (fps) {
        ctx.font = "15px sans-serif";
        ctx.fillStyle = `rgb(200,200,200)`;
        ctx.fillText(`fps: ${Math.floor(fps)}`, ctx.canvas.width - 50, 20);
        ctx.font = "12px sans-serif";
    }

    function draw (ctx) {
        ctx.fillStyle = `rgb(200,200,200)`;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        showFPS(timer.fps);

        map.tilesList.forEach(tile => {
            tile.show();
        });

        map.player.show();
        map.demons.forEach((e) => {
            e.show();
        });
    }

    function mousePressed(e) {
        // correct out of the map mouse pos
        // or do if(tile)
        let tile = map.pixel_to_flat_hex(e);
        // if (tile) {
            // console.log(tile);
        // }
        map.getNeighbours(map.player.tile).forEach(nextTile => {
            if (tile && !tile.wall && tile === nextTile) {
                map.player.set(tile);
                update();
            }
        });
    };

    function mouseDragged() {
        // let tile = map.pixel_to_flat_hex();
    };

    function update() {
        map.demons.forEach((demon) => {
            if (demon.canAttack(map.player))
                demon.attack(map.player);
            else {
                demon.planMovement();
            }
        });
    }
};

const canvas = document.getElementById("screen");
main(canvas);