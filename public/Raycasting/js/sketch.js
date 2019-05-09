// 2D Visibility
// Ray Casting

let walls = [];
let ray;
let particle;

let mouseDown = 0;

let xoff = 0;
let yoff = 100000;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);

  }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  particle = new Particle();

  document.onmousedown = function () {
    ++mouseDown;
  };
  document.onmouseup = function () {
    --mouseDown;
  };
}

function draw() {
  background(0);
  for (let i = 0; i < walls.length - 4; i++) {
    const wall = walls[i];
    wall.update(noise(wall.xoff1) * width, noise(wall.yoff1) * height, noise(wall.xoff2) * width, noise(wall.yoff2) * height);
    wall.show();
  }

  if (mouseDown) {
    particle.update(mouseX, mouseY);
  } else {
    particle.update(noise(xoff) * width, noise(yoff) * height);
    xoff += 0.002;
    yoff += 0.002;
  }

  particle.show();
  particle.look(walls);
}

