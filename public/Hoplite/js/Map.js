import Cell from "./Cell.js";

export default class Map {
    constructor() {
        this.tiles = [];
    }

    set(_x, _y, _z) {
        if (this.tiles[`${_x},${_y},${_z}`] === undefined) {
            this.tiles[`${_x},${_y},${_z}`] = new Cell({ x: _x, y: _y, z: _z });
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
                    el.show();
                    this.generate(radius, chop, el.x, el.y, el.z);
                }
            });
        }
    }
}