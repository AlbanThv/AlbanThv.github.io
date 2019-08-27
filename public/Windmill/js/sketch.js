// 2011 IMO Problem #2 : Windmill

let points = [];
let ray;

function preload() {
  snap = loadSound('assets/snap.mp3');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight - 4);
  cnv.style('display', 'block');
  cnv.style('image-rendering', 'pixelated');
  cnv.id('canvas');
  frameRate(60);
  angleMode(DEGREES)

  document.getElementById('canvas').addEventListener('click', mouseClick);

  for (let i = 0; i < 9; i++) {
    points[i] = new Point(random(0, width - 50), random(50, height), i);
  }

  ray = new Ray(points[0].vect.x, points[0].vect.y);
  points[0].number += 1;

  stroke(255);
  strokeWeight(10);
}

function mouseClick(e) {
  removed = false;
  for(let i = 0; i< points.length; i++) {
    const point = points[i];
    if (abs(point.vect.x - mouseX) < 7 && abs(point.vect.y - mouseY) < 7) {
      if (!(i == ray.currentPivot || i == ray.previousPivot)) {
        point.id = -1;
      }
      removed = true;
    }
  }
  if (!removed) {
    points.push(new Point(mouseX, mouseY, points.length));
  }
}

function draw() {
  background(0, 0, 0, 30);

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point.id >= 0) {
      if (point.id != ray.currentPivot && point.id != ray.previousPivot) {
        point.show();
        if (ray.isOnLine(point)) {
          snap.play();
        }
      } else if (point.id == ray.currentPivot) {
        points[ray.currentPivot].show(0, 255, 0);
      } else {
        points[ray.previousPivot].show(255, 0, 0);
      }
    }
  }
  ray.show();
  ray.rot(0.1);
}
