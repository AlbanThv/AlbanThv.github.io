class Boundary {
  constructor(x1, y1, x2, y2, xoff1, xoffy1, xoffx2, xoffy2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);

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
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}