import Timer from "./Timer.js";
import Map from "./Map.js";
import ImageLoader from "./ImageLoader.js";
import ActionBar from "./ActionBar.js";
import Warrior from "./Warrior.js";
import Archer from "./Archer.js";

function main(canvasMap, canvasActionBar) {
    // Load ctx
    const map;
    canvasMap.width = window.innerWidth;
    canvasMap.height = window.innerHeight - window.innerHeight * 0.20;
    const ctx = canvasMap.getContext("2d");

    const actionBar;
    canvasActionBar.width = window.innerWidth;
    canvasActionBar.height = window.innerHeight - ctx.canvas.height;
    const ctxActBar = canvasActionBar.getContext("2d");

    // Load Images
    let sources = {
        Player  : "img/Player.png",
        Lava    : "img/Lava.png",
        Warrior : "img/Warrior.png",
        Archer  : "img/Archer.png",
        Heart   : "img/Heart.png",
        HeartG  : "img/HeartG.png",
    };
    let _images = {};
    ImageLoader(sources, function(images) {
        _images = images;
    });
    function when_external_loaded (callback) {
        if (Object.keys(_images).length < Object.keys(sources).length) {
            setTimeout (function () {
                when_external_loaded (callback);
            }, 100); // wait 100 ms
        } else { callback (); }
    }

    // Load game
    let isReady = false;
    when_external_loaded (function () {
        isReady = true;

        map = new Map(ctx);
        actionBar = new ActionBar(canvasActionBar, ctxActBar, map.cellSize);

        let rad = 5;
        let chopX = 5;
        map.init(rad, chopX);
        map.createPlayer(_images.Player, 0, -rad + 1, rad - 1);
        map.generateLava(_images.Lava);

        map.demons.push(new Archer(map, newTile(), _images.Archer));
        map.demons.push(new Archer(map, newTile(), _images.Archer));

        map.demons.push(new Warrior(map, newTile(), _images.Warrior));
        map.demons.push(new Warrior(map, newTile(), _images.Warrior));
        map.demons.push(new Warrior(map, newTile(), _images.Warrior));
    });


    canvasMap.addEventListener("click", mousePressed);
    canvasActionBar.addEventListener("click", mousePressedActionBar);

    // dragging mouse code
    // let drag = false;
    // document.addEventListener('mousedown', () => drag = true);
    // document.addEventListener('mouseup', () => drag = false);
    // document.addEventListener('mousemove', mouseDragged);

    // requestFullscreen by dlb tap/clic
    let tapped = false;
    document.addEventListener("dblclick", _ =>  document.documentElement.requestFullscreen());
    document.addEventListener("touchstart", e =>  {
        if(!tapped){
            tapped = setTimeout(function(){
                // single_tap
                tapped = null;
            },300); //wait 300ms
          } else {
            clearTimeout(tapped);
            tapped = null;
            // double_tap
            document.documentElement.requestFullscreen();
          }
          e.preventDefault();
    });

    // temporaire
    document.addEventListener("keydown", (ev) => {
        if (ev.key === " ") { // space key
            //passer son tour
            update();
        }
    });
    // ===========

    // Request Animation Frame
    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        if(isReady) {
            draw();
            drawActionBar();
        }
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
        actionBar.show(_images, map.player.maxHealth, map.player.currentHealth);
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
        actionBar.buttonClick(e);
    }

    // function mouseDragged(e) {
    //     if (drag) {
    //         let tile = actionBar.buttonClick(e);
    //     }
    // }

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

    // get new valid tile
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
