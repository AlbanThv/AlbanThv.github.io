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
    rotate(this.angle);
    stroke(0, 255, 255, 200);
    strokeWeight(3);
    line(-windowWidth * 2, 0, windowWidth * 2, 0);
    pop();
  }

  rot(rot) {
    this.angle += rot;
    if (this.angle >= 180) this.angle = 0;
  }

  newPivot(x, y) {
    this.vect = createVector(x, y);
  }

  isOnLine(obj) {
    let target = {x: obj.vect.x, y: obj.vect.y};
    let anchor = {x: this.vect.x, y: this.vect.y};

    let m = tan(this.angle);
    let p = anchor.y - (m * anchor.x);
    let diff = target.y - (m * target.x + p);

    console.log(diff);

    if (abs(diff) <= 5) {

        console.log("im inside", diff);
      if (this.currentPivot == this.previousPivot) {
        this.currentPivot = obj.id;
        obj.number += 1;
      } else {
        this.previousPivot = this.currentPivot;
        this.currentPivot = obj.id;
        obj.number += 1;
      }
      // console.log(obj.id);
      this.newPivot(target.x, target.y);
      return true;
    }
  }
}
