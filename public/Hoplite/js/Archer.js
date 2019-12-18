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
                if (this.map.isClean(this.map.get(coords[j][0], coords[j][1], coords[j][2]), this))
                    attackPositions.push(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id]);
            }
        }
        return attackPositions;
    }

    show() {
        this.tile.hexagon("rgb(100, 200, 100)");
    }
}