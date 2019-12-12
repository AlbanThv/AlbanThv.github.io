import Cell from "./Cell.js";
import Player from "./Player.js";

export default class Map {
    constructor(ctx) {
        this.ctx = ctx;
        this.tiles = [];
        this.cellSize = 35;
        this.player = new Player();
        this.tilesList = [];
    }

    set(_x, _y, _z) {
        if (this.tiles[`${_x},${_y},${_z}`] === undefined) {
            this.tiles[`${_x},${_y},${_z}`] = new Cell({ x: _x, y: _y, z: _z, size: this.cellSize, ctx: this.ctx });
        }
    }

    get(_x, _y, _z) {
        return this.tiles[`${_x},${_y},${_z}`];
    }

    save() {
        for (const tile in this.tiles) {
            if (!this.tiles[tile].void) {
                this.tilesList[this.tiles[tile].id] = this.tiles[tile];
            }
        }
        // console.log(this.tilesList);
    }

    setPlayer(_x, _y, _z) {
        this.tilesList.forEach(tile => {
            tile.player = false;
        });
        this.player.set(this.tiles[`${_x},${_y},${_z}`]);
        // console.log(this.tiles[`${_x},${_y},${_z}`]);
    }

    setPath(tiles) {
        this.tilesList.forEach(tile => {
            tile.isPath = false;
        });
        tiles.forEach(tile => {
            tile.isPath = true;
        });
    }

    generateNeighbour(i, j, k) {
        let neighbourList = [];
        let neighbourCoords = [
            [1, 0, -1], [1, -1, 0], [0, -1, 1],
            [-1, 0, 1], [-1, 1, 0], [0, 1, -1]
        ];
        neighbourCoords.forEach(coords => {
            this.set(i + coords[0], j + coords[1], k + coords[2]);
            neighbourList.push(this.get(i + coords[0], j + coords[1], k + coords[2]));
        });
        return neighbourList;
    }

    getNeighbours(tile)
    {
        let neighbourList = [];
        let neighbourCoords = [
            [1, 0, -1], [1, -1, 0], [0, -1, 1],
            [-1, 0, 1], [-1, 1, 0], [0, 1, -1]
        ];
        neighbourCoords.forEach(coords => {
            neighbourList.push(map.get(tile.x + coords[0], tile.y + coords[1], tile.z + coords[2]));
        });

        let index = neighbourList.length - 1;
        while (index >= 0) {
            if (neighbourList[index] === undefined) {
                neighbourList.splice(index, 1);
            }
            index--;
        }

        return neighbourList;
    }

    generate(radius = 1, chop = radius + 1, x = 0, y = 0, z = 0) {
        if (radius > 0) {
            radius--;
            this.generateNeighbour(x, y, z).forEach(el => {
                if (Math.abs(el.x) < chop) {
                    this.generate(radius, chop, el.x, el.y, el.z);
                } else {
                    el.void = true;
                }
            });
        }
    }

    pixel_to_flat_hex() {
        let mouseX = this.ctx.mouseX - this.ctx.width / 2;
        let mouseY = this.ctx.mouseY - this.ctx.height / 2;

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