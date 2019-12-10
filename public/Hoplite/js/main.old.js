let tiles = [[]];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  // noStroke();
  strokeWeight(1);
  stroke(0);

  generate(5, 7)
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

  floor(random(5)) == 0 ? fill(color(255, 100, 100)) : fill(color(100, 100, 100));

  endShape(CLOSE);
  fill(0);
  text(count > 9 ? "" + count : "0" + count, x - 6, y + 5);
  count++;
}

function generate(gridWidth, gridHeight) { // gridWidth must be odd
  let levelHeight = gridWidth * 2 + gridHeight * 2 - 2;
  let size = 28;
  let x = width / 2;
  let y = height - size * 2;
  let w = 2 * size * 3 / 4;
  let h = sqrt(3) * size;

  let length = 1;
  for (let i = 0; i < levelHeight; i++) { // height
    if (i < gridWidth) {
      for (let j = 0; j < length; j++) { // width
        hexagon(x + w * j * 2 - w * length, y - h * (i * 0.5), size);
      }
      length++;
    }
    else if (i < gridHeight * 2 + gridWidth - 2) {
      for (let j = (i) % 2; j < length - 1; j++) { // width
        hexagon(x + w * j * 2 - w * length + (i % 2 ? 0 : w), y - h * (i * 0.5), size);
      }
    } else {
      console.log(length)
      if (length > gridWidth) {
        length = gridWidth - 1;
      }
      for (let j = 0; j < length; j++) { // width
        hexagon(x + w * j * 2 - w * length, y - h * (i * 0.5), size);
      }
      length--;
    }
  }
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

const defaults = {
  x: 0,
  y: 0,
  z: 0,
}

class Hex {
  constructor(options) {
    this.x = options.x || defaults.x;
    this.y = options.y || defaults.y;
    this.z = options.d || defaults.d;
    this.gridX = (this.x - tileSize) / tileSize;
    this.gridY = (this.y - tileSize) / tileSize;

    this.col = color(255);
  }

  show() {
    fill(this.col);
    rect(this.x, this.y, tileSize, tileSize);

  }

  drag() {
    let d = (mouseX > this.x
      && mouseX < (this.x + tileSize)
      && mouseY > this.y
      && mouseY < (this.y + tileSize))
    if (d) {
      if (mouseButton == "left") {
        this.nextStep = 1;
      }
      if (mouseButton == "right") {
        this.nextStep = 0;
      }
    }
  }
}
