import Map from "./Map.js";
import AStar from "./AStar.js";
import Warrior from "./Warrior.js";

let map;
let path;

// temp
document.addEventListener("keydown", (ev) =>
{
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
    map.tilesList[15].wall = false;

    // temporaire
      map.demons.push(new Warrior(map, map.get(-1, 4, -3)));

    path = AStar.search(map, map.tilesList[66], map.tilesList[15]);
    // console.log(path);
  };

  sketch.draw = () => {
    sketch.background(50);
    sketch.showFPS();

    map.tilesList.forEach(tile => {
      tile.show();
    });

      path.forEach(tile => {
          tile.hexagon("rgb(50,50,170)");
      });

    map.player.show();
    map.demons.forEach((e) =>
    {
       e.show();
    });
  };

  sketch.mousePressed = () => {
    let tile = map.pixel_to_flat_hex(); // correct out of the map mouse pos
    path = AStar.search(map, map.tilesList[66], tile);
    // tile.colour(170, 50, 170);
  };

  sketch.mouseDragged = () => {
    let tile = map.pixel_to_flat_hex();
    path = AStar.search(map, map.tilesList[66], tile);
    // tile.colour(170, 50, 170);
  };

  sketch.showFPS = () => {
    newP5.textSize(15);
    newP5.fill(newP5.color(200));
    newP5.text(`fps: ${newP5.floor(newP5.getFrameRate())}`, sketch.windowWidth - 50, 20);
    newP5.textSize(12);
  };
};

export let newP5 = new p5(s);

function update()
{
  map.demons.forEach((demon) =>
  {
    if (demon.canAttack(map.player))
      demon.attack(map.player);
    else
    {
      let path = AStar.search(map, demon.tile, map.player.tile);
      demon.move(path[0]);
    }
  });
}