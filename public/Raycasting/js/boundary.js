class Boundary {
  constructor(x1, y1, x2, y2, color) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    if (!color) {
      this.color = random([0, 1, 2, 3]);
    } else {
      this.color = color;
    }

    this.xoff1 = random(10000000);
    this.yoff1 = random(10000000);
    this.xoff2 = random(10000000);
    this.yoff2 = random(10000000);
  }

  update(x1, y1, x2, y2) {
    this.a.set(x1, y1);
    this.b.set(x2, y2);

    this.xoff1 += 0.001;
    this.yoff1 += 0.001;
    this.xoff2 += 0.001;
    this.yoff2 += 0.001;
  }

  show() {
    switch (this.color) {
      case 0:
        stroke(100);
        break;
      case 1:
        stroke(255, 0, 0);
        break;
      case 2:
        stroke(0, 255, 0);
        break;
      case 3:
        stroke(0, 0, 255);
        break;
      default:
        stroke(0);
        break;
    }
    strokeWeight(2.5);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    strokeWeight(1);
  }
}
