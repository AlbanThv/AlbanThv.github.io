import Cell from "./Cell.js";
import Player from "./Player.js";

export default class Map {
    constructor(ctx) {
        this.ctx = ctx;
        this.tiles = [];
        this.tilesList = [];
        this.cellSize = this.ctx.canvas.width < this.ctx.canvas.height ? this.ctx.canvas.width/9/(4/5)/2 : Math.floor(this.ctx.canvas.height/11/Math.sqrt(3));
        this.player = new Player(this);
        this.demons = [];
    }

    set(_x, _y, _z) {
        if (this.tiles[`${_x},${_y},${_z}`] === undefined) {
            this.tiles[`${_x},${_y},${_z}`] = new Cell({x: _x, y: _y, z: _z, size: this.cellSize, ctx: this.ctx});
        }
    }

    get(x, y, z) {
        return this.tiles[`${x},${y},${z}`];
    }

    pixel_to_flat_hex(e) {
        let mouseX = e.x - this.ctx.canvas.width / 2;
        let mouseY = e.y - this.ctx.canvas.height / 2;

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

    generate(radius = 1, chop = radius + 1, x = 0, y = 0, z = 0) {
        if (radius > 0) {
            radius--;
            this.generateNeighbour(x, y, z).forEach(el => {
                if (Math.abs(el.x) < chop) {
                    this.generate(radius, chop, el.x, el.y, el.z);
                } else {
                    // delete this.tiles[el];
                    el.void = true;
                }
            });
        }
    }

    save() {
        for (const tile in this.tiles) {
            if (this.tiles[tile].void) {
                delete this.tiles[tile];
            } else {
                this.tilesList[this.tiles[tile].id] = this.tiles[tile];
            }
        }
    }

    init(r, chop) {
        this.generate(r, chop);
        this.save();
    }

    generateWall(wallNumber = 3) {
        let walls = [];
        this.tilesList.forEach(tile => {
                tile.AStar_visited = false;
                if (tile !== this.player.tile && Math.floor(Math.random() * Math.floor(10)) === 0 && wallNumber > 0) {
                    tile.wall = true;
                    tile.AStar_visited = true;
                    walls.push(tile);
                    wallNumber--;
                }
        });
        walls.forEach(wall => {
            this.generateWallNeighbour(wall, 2);
        });
    }

    generateWallNeighbour(wall, chance = 2) {
        this.generateNeighbour(wall.x, wall.y, wall.z).forEach(el => {
            if (el !== this.player.tile && Math.floor(Math.random() * Math.floor(chance)) === 0 && !el.AStar_visited && !el.wall) {
                el.wall = true;
                this.generateWallNeighbour(el, chance * chance);
            }
            el.AStar_visited = true;
        });
    }

    getNeighbours(tile) {
        let neighbourList = [];
        let neighbourCoords = [
            [1, 0, -1], [1, -1, 0], [0, -1, 1],
            [-1, 0, 1], [-1, 1, 0], [0, 1, -1]
        ];
        neighbourCoords.forEach(coords => {
            neighbourList.push(this.get(tile.x + coords[0], tile.y + coords[1], tile.z + coords[2]));
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

    setPlayer(x, y, z) {
        this.player.set(this.tiles[`${x},${y},${z}`]);
    }

    isDemon(tile) {
        let found = false;
        this.demons.forEach(demon => {
            if (tile === demon.tile) {
                found = true;
            }
        });
        return found;
    }
}