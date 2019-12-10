import Cell from "./Cell.js";

export default class Map {
    constructor() {
        this.tiles = [];
    }

    set(_x, _y, _z) {
        console.log("coucou2");
        this.tiles[`${_x},${_y},${_z}`] = new Cell({ x: _x, y: _y, z: _z });
        return this.tiles[`${_x},${_y},${_z}`];
    }

    get(_x, _y, _z) {
        return this.tiles[`${_x},${_y},${_z}`];
    }
}