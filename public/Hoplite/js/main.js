import Map from "./Map.js";

let map;

const s = (sketch) => {
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    cnv.style('display', 'block');

    map = new Map();
    map.generate(5, 5);
  }

  sketch.draw = () => {
    sketch.background(50)

    for (const tile in map.tiles) {
      if (map.tiles[tile].visible) {
        map.tiles[tile].show();
      }
    }
  }

  sketch.mousePressed = () => {
    let tile = map.pixel_to_flat_hex();
    if (tile !== undefined) {
      tile.color = sketch.color(200, 100, 200);
    }
  }

  sketch.mouseDragged = () => {
    let tile = map.pixel_to_flat_hex();
    if (tile !== undefined) {
      tile.color = sketch.color(200, 100, 200);
    }
  }
};

export let newP5 = new p5(s);

