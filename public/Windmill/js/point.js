class Point {
  constructor(x, y, id) {
    this.vect = createVector(x, y);
    this.pivot = false;
    this.id = id;
    this.number = 0;
  }

  show(c1 = 255, c2 = 255, c3 = 255) {
    stroke(0);
    strokeWeight(0);
    textSize(10);
    textAlign(CENTER);
    fill(255)
    text(this.number, this.vect.x, this.vect.y - 7);
    stroke(c1, c2, c3);
    strokeWeight(10);
    point(this.vect.x, this.vect.y);
  }
}