import AStar from "./AStar.js";
import Demon from "./Demon.js";

export default class Archer extends Demon {
    constructor(map, tile) {
        super(map, tile);
    }

    getAttackPositions() {
        let x = this.map.player.tile.x;
        let y = this.map.player.tile.y;
        let z = this.map.player.tile.z;
        let ldv;
        let line = [];
        let attackPositions = [];
        let coords = [];
        for (let i = 2; i < 7; i++) {
            coords = [
                [x + i, -(x + i) - z, z],
                [x - i, -(x - i) - z, z],
                [x, y + i, -x - (y + i)],
                [x, y - i, -x - (y - i)],
                [-y - (z + i), y, z + i],
                [-y - (z - i), y, z - i]
            ];
            for (let j = 0; j < coords.length; j++) {
                ldv = true;
                if (this.map.isClean(this.map.get(coords[j][0], coords[j][1], coords[j][2]), this)) { // Sometimes let non existant tile pass
                    if (this.map.isClean(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id], this)) {
                        line = this.map.cube_line(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id], this.map.player.tile);
                        line.pop();
                        line.forEach(tile => {
                            if (!this.map.isObstacle(tile, this)) {
                                ldv = false;
                            }
                        });
                        if(ldv) {
                            attackPositions.push(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id]);
                        }
                    }
                }
            }
        }
        return attackPositions;
    }

    show() {
        this.tile.hexagon("rgb(100, 200, 100)", this.id);
    }
}