import {newP5} from "./main.js";

export default class Cell {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.z = options.z;
        this.size = 28;
        this.w = 2 * this.size * 3 / 4;
        this.h = Math.sqrt(3) * this.size * 0.5;
        this.gridX = newP5.width / 2 + this.w * this.x;
        this.gridY = newP5.height / 2 + this.h * (this.z - this.y);
        Cell.count++;

        // this.col = color(255);
    }

    show() {
        // fill(this.col);
        console.log("coucou1");
        this.hexagon(this.gridX, this.gridY, this.size);
    }

    hexagon(x, y, radius, npoints = 6, rotate = 0) {
        let angle = newP5.TWO_PI / npoints;
        newP5.beginShape();
        for (let a = rotate; a < newP5.TWO_PI; a += angle) {
            let sx = x + Math.cos(a) * radius;
            let sy = y + Math.sin(a) * radius;
            newP5.vertex(sx, sy);
        }
        // randomly fill a cell in red cuz why not
        Math.floor(newP5.random(5)) === 0 ? newP5.fill(newP5.color(255, 100, 100)) : newP5.fill(newP5.color(100, 100, 100));
        newP5.endShape(newP5.CLOSE);

        // number
        newP5.fill(0);
        newP5.text(Cell.count > 9 ? "" + Cell.count : "0" + Cell.count, x - 6, y + 5);
    }
}

Cell.count = 0;
