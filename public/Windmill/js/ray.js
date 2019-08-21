class Ray {
  constructor(x, y) {
    this.vect = createVector(x, y);
    this.angle = 0;
    this.currentPivot = 0;
    this.previousPivot = 0;
  }

  show() {
    push();
    // rectMode(CENTER);
    translate(this.vect.x, this.vect.y);
    this.rot();
    stroke(0, 255, 255, 200);
    strokeWeight(3);
    line(-windowWidth * 2, 0, windowWidth * 2, 0);
    pop();
  }

  rot() {
    this.angle += 0.05;
    if (this.angle >= 180) this.angle = 0;
    rotate(this.angle)
  }

  newPivot(x, y) {
    this.vect = createVector(x, y);
  }

  isOnLine(obj) {
    let x = obj.vect.x;
    let y = obj.vect.y;

    let m = tan(this.angle);
    let p = this.vect.y - (m * this.vect.x)
    let diff = y - (m * x + p);

    if (abs(diff) <= 1.5) {
      if (this.currentPivot == this.previousPivot) {
        this.currentPivot = obj.id;
        obj.number += 1;
      } else {
        this.previousPivot = this.currentPivot;
        this.currentPivot = obj.id;
        obj.number += 1;
      }
      // console.log(obj.id);
      this.newPivot(x, y);
      return true;
    }
  }
}