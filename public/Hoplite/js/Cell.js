import { newP5 } from "./main.js";

let Count = 0;
export default class Cell {
    constructor(options) {
        this.id = Count++;
        this.x = options.x;
        this.y = options.y;
        this.z = options.z;
        this.size = options.size;

        this.w = 2 * this.size * 3 / 4;
        this.h = Math.sqrt(3) * this.size * 0.5;
        this.gridX = newP5.width / 2 + this.w * this.x;
        this.gridY = newP5.height / 2 + this.h * (this.z - this.y);

        this.color = newP5.color(100, 100, 100);
        this.visible = false;
    }

    show() {
        this.hexagon(this.gridX, this.gridY, this.size);
    }

    hexagon(x, y, radius, npoints = 6, rotate = 0) {
        let angle = newP5.TWO_PI / npoints;
        newP5.fill(this.color);
        newP5.beginShape();
        for (let a = rotate; a < newP5.TWO_PI; a += angle) {
            let sx = x + Math.cos(a) * radius;
            let sy = y + Math.sin(a) * radius;
            newP5.vertex(sx, sy);
        }
        newP5.endShape(newP5.CLOSE);

        // number
        newP5.fill(0);
        newP5.text(this.id > 9 ? "" + this.id : "0" + this.id, x - 6, y + 5);
        newP5.fill(newP5.color(100, 255, 100));
        newP5.text(`${this.x}.${this.y}.${this.z}`, x - 14, y + 20);
    }
}
