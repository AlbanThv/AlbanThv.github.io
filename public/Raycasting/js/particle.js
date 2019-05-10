class Particle {
  constructor(color) {
    this.color = color;
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let a = 0; a < 360; a += 0.8) {
      this.rays.push(new Ray(this.pos, radians(a), this.color));
    }
    this.colorList = ["rgba(255, 0, 0, 0.2)", "rgba(0, 255, 0, 0.2)", "rgba(0, 0, 255, 0.2)", "rgba(255, 255, 255, 0.2)"];
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = ray.u;
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(this.colorList[this.color - 1]);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    fill(this.colorList[this.color - 1]);
    ellipse(this.pos.x, this.pos.y, 4)
    // for (let ray of this.rays) {
    //   ray.show(this.color);
    // }
  }
}