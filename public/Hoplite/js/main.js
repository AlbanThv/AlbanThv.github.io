import Map from "./Map.js";
import AStar from "./AStar.js";

let map;
let path;

const s = (sketch) => {
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    cnv.style('display', 'block');
    sketch.frameRate(60);

    map = new Map(sketch);
    let rad = 5;
    map.generate(rad, 5);
    map.save();
    // make a init funct to englobe generate/save/remove void

    map.setPlayer(0, -rad + 1, rad - 1);
    map.tilesList[15].wall = false;

    path = AStar.search(map, map.tilesList[66], map.tilesList[15]);
    console.log(path);
  }

  sketch.draw = () => {
    sketch.background(50);
    sketch.showFPS();

    map.setPath(path);

    map.tilesList.forEach(tile => {
      tile.show();
    });
  }

  sketch.mousePressed = () => {
    let tile = map.pixel_to_flat_hex(); // correct out of the map mouse pos
    path = AStar.search(map, map.tilesList[66], tile);
    // tile.colour(170, 50, 170);
  }

  sketch.mouseDragged = () => {
    let tile = map.pixel_to_flat_hex();
    path = AStar.search(map, map.tilesList[66], tile);
    // tile.colour(170, 50, 170);
  }

  sketch.showFPS = () => {
    newP5.textSize(15);
    newP5.fill(newP5.color(200));
    newP5.text(`fps: ${newP5.floor(newP5.getFrameRate())}`, sketch.windowWidth - 50, 20);
    newP5.textSize(12);
  }
};

export let newP5 = new p5(s);

