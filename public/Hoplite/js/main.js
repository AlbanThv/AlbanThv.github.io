let map;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  // noStroke();
  strokeWeight(1);
  stroke(0);

  map = new Map();

  map.set(0, 0, 0).show();
  map.set(1, 0, -1).show();
  map.set(2, 0, -2).show();
  map.set(2, -1, -1).show();
  map.set(0, -1, 1).show();
  map.set(1, -1, 0).show();
  map.set(0, 1, -1).show();
  map.set(-1, 1, 0).show();
  map.set(-1, 0, 1).show();
}

count = 0;
function hexagon(x, y, radius, npoints = 6, offset = 0) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = offset; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  // randomly fill a cell in red cuz why not
  floor(random(5)) == 0 ? fill(color(255, 100, 100)) : fill(color(100, 100, 100));
  endShape(CLOSE);

  // number
  fill(0);
  text(count > 9 ? "" + count : "0" + count, x - 6, y + 5);
  count++;
}

function draw() {
  // background(ccc)
}

function keyPressed() {
}

function mousePressed() {
}

function mouseDragged() {
}

function mouse() {
}

class Map {
  constructor() {
    this.tiles = [];
  }

  set(_x, _y, _z) {
    this.tiles[`${_x},${_y},${_z}`] = new Cell({ x: _x, y: _y, z: _z });
    return this.tiles[`${_x},${_y},${_z}`];
  }

  get(_x, _y, _z) {
    return this.tiles[`${_x},${_y},${_z}`];
  }
}

class Cell {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.z = options.z;
    this.size = 28;
    this.w = 2 * this.size * 3 / 4;
    this.h = sqrt(3) * this.size * 0.5;
    this.gridX = width / 2 + this.w * this.x;
    this.gridY = height / 2 + this.h * (this.z - this.y);
    // this.col = color(255);
  }

  show() {
    // fill(this.col);
    hexagon(this.gridX, this.gridY, this.size);
  }
}
