// 2D Visibility
// Ray Casting

let walls = [];
let ray;
let particleR;
let particleG;
let particleB;
let particleW;

let mouseDown = 0;
let rgb = false;

let xoff = 0;
let yoff = 100000;

let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  for (let i = 0; i < 9; i++) {
    walls[i] = new Boundary(random(width), random(height), random(width), random(height));
  }
  walls.push(new Boundary(0, 0, width, 0, -1));
  walls.push(new Boundary(width, 0, width, height, -1));
  walls.push(new Boundary(width, height, 0, height, -1));
  walls.push(new Boundary(0, height, 0, 0, -1));

  particleR = new Particle(1);
  particleG = new Particle(2);
  particleB = new Particle(3);

  particleW = new Particle(4);

  document.onmouseup = function () {
    mouseDown = false;
  };

  document.onmousedown = function (e) {
    let isRightMB;
    e = e || window.event;

    if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightMB = e.which == 3;
    else if ("button" in e)  // IE, Opera
      isRightMB = e.button == 2;

    if (isRightMB) {
      rgb = !rgb;
    } else {
      mouseDown = true;
    }
  };
}

function draw() {
  background(0);


  for (let i = 7; i < walls.length - 4; i++) {
    const wall = walls[i];
    wall.update(noise(wall.xoff1) * width, noise(wall.yoff1) * height, noise(wall.xoff2) * width, noise(wall.yoff2) * height);
    wall.show();
  }

  walls[0].update(
    noise(walls[0].xoff1) * width, noise(walls[0].yoff1) * height,
    walls[1].a.x, walls[1].a.y
  );
  walls[1].update(
    noise(walls[1].xoff1) * width, noise(walls[1].yoff1) * height,
    walls[2].a.x, walls[2].a.y
  );
  walls[2].update(
    noise(walls[2].xoff1) * width, noise(walls[2].yoff1) * height,
    walls[3].a.x, walls[3].a.y
  );
  walls[3].update(
    noise(walls[3].xoff1) * width, noise(walls[3].yoff1) * height,
    walls[0].a.x, walls[0].a.y
  );

  walls[0].show();
  walls[1].show();
  walls[2].show();
  walls[3].show();

  walls[4].update(
    noise(walls[4].xoff1) * width, noise(walls[4].yoff1) * height,
    walls[5].a.x, walls[5].a.y
  );
  walls[5].update(
    noise(walls[5].xoff1) * width, noise(walls[5].yoff1) * height,
    walls[6].a.x, walls[6].a.y
  );
  walls[6].update(
    noise(walls[6].xoff1) * width, noise(walls[6].yoff1) * height,
    walls[4].a.x, walls[4].a.y
  );

  walls[4].show();
  walls[5].show();
  walls[6].show();

  if (mouseDown) {
    particleW.update(mouseX, mouseY);
    particleR.update(mouseX, mouseY);
    particleG.update(mouseX, mouseY);
    particleB.update(mouseX, mouseY);
    trail.push({
      x: particleW.pos.x,
      y: particleW.pos.y,
      c: 4,
    });
    if (trail.length > 70 * 3) {
      trail.shift();
    }
  } else {
    if (rgb) {
      particleR.update(noise(xoff) * width, noise(yoff) * height);
      particleG.update(noise(xoff + 10) * width, noise(yoff + 10) * height);
      particleB.update(noise(xoff + 100) * width, noise(yoff + 100) * height);

      trail.push({
        x: particleR.pos.x,
        y: particleR.pos.y,
        c: particleR.color,
      });
      trail.push({
        x: particleG.pos.x,
        y: particleG.pos.y,
        c: particleG.color,
      });
      trail.push({
        x: particleB.pos.x,
        y: particleB.pos.y,
        c: particleB.color,
      });

      if (trail.length > 70 * 3) {
        trail.shift();
        trail.shift();
        trail.shift();
      }
    } else {
      particleW.update(noise(xoff + 1000) * width, noise(yoff+ 1000) * height);

      trail.push({
        x: particleW.pos.x,
        y: particleW.pos.y,
        c: particleW.color,
      });
      if (trail.length > 70 * 3) {
        trail.shift();
      }
    }
    xoff += 0.001;
    yoff += 0.001;
  }

  if (rgb) {
    particleR.show();
    particleR.look(walls);

    particleG.show();
    particleG.look(walls);

    particleB.show();
    particleB.look(walls);
  } else {
    particleW.show();
    particleW.look(walls);
  }


  let colorList = ["rgba(255, 0, 0, 0.05)", "rgba(0, 255, 0, 0.05)", "rgba(0, 0, 255, 0.05)", "rgba(255, 255, 255, 0.05)"];
  for (let i = 0; i < trail.length; i++) {
    fill(colorList[trail[i].c - 1]);
    stroke(colorList[trail[i].c - 1])
    ellipse(trail[i].x, trail[i].y, 16);
  }
}

