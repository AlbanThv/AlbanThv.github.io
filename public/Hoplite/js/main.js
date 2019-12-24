import Timer from "./Timer.js";
import Map from "./Map.js";
import ActionBar from "./ActionBar.js";
import Warrior from "./Warrior.js";
import Archer from "./Archer.js";

function main(canvasMap, canvasActionBar) {
    canvasMap.width = window.innerWidth;
    canvasMap.height = window.innerHeight - window.innerHeight * 0.15;
    const ctx = canvasMap.getContext("2d");

    canvasActionBar.width = window.innerWidth;
    canvasActionBar.height = window.innerHeight - ctx.canvas.height;
    const ctxActBar = canvasActionBar.getContext("2d");

    const map = new Map(ctx);
    const actionBar = new ActionBar(ctxActBar);

    let rad = 5;
    map.init(rad, 5);
    map.createPlayer(0, -rad + 1, rad - 1);
    map.generateLava();

    canvasMap.addEventListener("click", mousePressed);
    canvasActionBar.addEventListener("click", mousePressedActionBar);

    // let drag = false;
    // document.addEventListener('mousedown', () => drag = true);
    // document.addEventListener('mouseup', () => drag = false);
    // document.addEventListener('mousemove', mouseDragged);

    // temporaire
    document.addEventListener("keydown", (ev) => {
        if (ev.key === " ") {
            //passer son tour
            update();
        }
    });


    map.demons.push(new Archer(map, newTile()));
    map.demons.push(new Archer(map, newTile()));

    map.demons.push(new Warrior(map, newTile()));
    map.demons.push(new Warrior(map, newTile()));
    map.demons.push(new Warrior(map, newTile()));

    // ===========


    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        draw();
        drawActionBar();
    };
    timer.start();

    function showFPS(fps) {
        ctx.font = "15px sans-serif";
        ctx.fillStyle = `rgb(200,200,200)`;
        ctx.fillText(`fps: ${Math.floor(fps)}`, ctx.canvas.width - 50, 20);
        ctx.font = "12px sans-serif";
    }

    function draw() {
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

    function drawActionBar() {
        ctxActBar.fillStyle = `rgb(200,200,200)`;
        ctxActBar.clearRect(0, 0, ctxActBar.canvas.width, ctxActBar.canvas.height);
        actionBar.show();
    }

    function mousePressed(e) {
        let tile = map.mouse_to_coords(e);
        if (tile) {
            // console.log(tile);
            map.getNeighbours(map.player.tile).forEach(nextTile => {
                if (tile === nextTile && map.isClean(nextTile)) { // Vérifie que le joueur clic à côté du perso
                    map.demons.forEach(demon => {
                        map.player.canAttack(demon).forEach(killingTile => {
                            // console.log(demon, killingTile);
                            if (killingTile === tile) {
                                map.player.attack(demon);
                            }
                        });
                    });
                    map.player.move(tile);
                    update();
                }
            });
        }
    }

    function mousePressedActionBar(e) {
        let tile = actionBar.mouse_to_coords(e);
    }

    function mouseDragged(e) {
        if (drag) {
            let tile = actionBar.mouse_to_coords(e);
        }
    }

    function update() {
        let index = map.demons.length - 1;
        while (index >= 0) {
            if (!map.demons[index].isAlive) {
                map.demons.splice(index, 1);
            }
            index--;
        }
        // Source of probleme and i don't know why
        // map.demons.forEach((demon) => {
        //     if (!demon.isAlive) {
        //         map.demons.splice(map.demons.findIndex(element => element.id === demon.id), 1);
        //     }
        // });
        map.demons.forEach((demon) => {
            if (demon.canAttack()) {
                demon.attack();
            } else {
                demon.planMovement();
            }
        });
    }

    function newTile() {
        let tile;
        let badTile;
        do {
            badTile = false;
            tile = map.tilesList[map.random(map.tilesList.length)];
            if (map.isClean(tile)) {
                map.getNeighbours(tile).forEach((neighbour) => {
                    if (neighbour === map.player.tile) {
                        badTile = true;
                    }
                });
            } else {
                badTile = true;
            }
        } while (badTile);
        return tile;
    }
}

const canvasMap = document.getElementById("map");
const canvasActionBar = document.getElementById("actionBar");
main(canvasMap, canvasActionBar);