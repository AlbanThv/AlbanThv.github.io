import { newP5 } from "./main.js";
import Cell from "./Cell.js";

export default class Map {
    constructor() {
        this.tiles = [];
        this.cellSize = 35;
    }

    set(_x, _y, _z) {
        if (this.tiles[`${_x},${_y},${_z}`] === undefined) {
            this.tiles[`${_x},${_y},${_z}`] = new Cell({ x: _x, y: _y, z: _z, size: this.cellSize });
        }
    }

    get(_x, _y, _z) {
        return this.tiles[`${_x},${_y},${_z}`];
    }

    neighbour(i, j, k) {
        let neighbourList = [];
        this.set(i + 1, j, k - 1);
        neighbourList[0] = this.get(i + 1, j, k - 1);
        this.set(i + 1, j - 1, k);
        neighbourList[1] = this.get(i + 1, j - 1, k);
        this.set(i, j - 1, k + 1);
        neighbourList[2] = this.get(i, j - 1, k + 1);
        this.set(i - 1, j, k + 1);
        neighbourList[3] = this.get(i - 1, j, k + 1);
        this.set(i - 1, j + 1, k);
        neighbourList[4] = this.get(i - 1, j + 1, k);
        this.set(i, j + 1, k - 1);
        neighbourList[5] = this.get(i, j + 1, k - 1);
        return neighbourList;
    }

    generate(radius = 1, chop = radius + 1, x = 0, y = 0, z = 0) {
        if (radius > 0) {
            radius--;
            this.neighbour(x, y, z).forEach(el => {
                if (Math.abs(el.x) < chop) {
                    el.visible = true;
                    this.generate(radius, chop, el.x, el.y, el.z);
                }
            });
        }
    }

    pixel_to_flat_hex() {
        let mouseX = newP5.mouseX - newP5.width / 2
        let mouseY = newP5.mouseY - newP5.height / 2

        let q = (2 / 3 * mouseX) / this.cellSize;
        let r = (-1 / 3 * mouseX + Math.sqrt(3) / 3 * mouseY) / this.cellSize;

        let x = q;
        let z = r;
        let y = -x - z;
        return this.cube_round(x, y, z);
    }

    cube_round(x, y, z) {
        let rx = Math.round(x);
        let ry = Math.round(y);
        let rz = Math.round(z);

        let x_diff = Math.abs(rx - x);
        let y_diff = Math.abs(ry - y);
        let z_diff = Math.abs(rz - z);

        if (x_diff > y_diff && x_diff > z_diff) {
            rx = -ry - rz;
        } else if (y_diff > z_diff) {
            ry = -rx - rz;
        } else {
            rz = -rx - ry;
        }
        return this.tiles[`${rx},${ry},${rz}`];
    }
}