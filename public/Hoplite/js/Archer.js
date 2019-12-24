import AStar from "./AStar.js";
import Demon from "./Demon.js";

export default class Archer extends Demon {
    constructor(map, tile) {
        super(map, tile);
        this.skin.src = 'img/Archer.png';
    }

    getAttackPositions() {
        let x = this.map.player.tile.x;
        let y = this.map.player.tile.y;
        let z = this.map.player.tile.z;
        let attackPositions = [];
        // let coords = [];
        for (let i = 2; i < 7; i++) {
            this.map.neighbourCoords.forEach(coords => {
                if (this.map.isClean(this.map.get(x + coords[0] * i, y + coords[1] * i, z + coords[2] * i), this)) {
                    if (this.map.has_ldv(this.map.get(x + coords[0] * i, y + coords[1] * i, z + coords[2] * i), this.map.player.tile, this)) {
                        attackPositions.push(this.map.get(x + coords[0] * i, y + coords[1] * i, z + coords[2] * i));
                    }
                }
            });
            // should work
            // coords = [
            //     [x + i, -(x + i) - z, z],
            //     [x - i, -(x - i) - z, z],
            //     [x, y + i, -x - (y + i)],
            //     [x, y - i, -x - (y - i)],
            //     [-y - (z + i), y, z + i],
            //     [-y - (z - i), y, z - i]
            // ];
            // for (let j = 0; j < coords.length; j++) {
            //     if (this.map.isClean(this.map.get(coords[j][0], coords[j][1], coords[j][2]), this)) {
            //         if (this.map.has_ldv(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id], this.map.player.tile, this)) {
            //             attackPositions.push(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id]);
            //         }
            //     }
            // }
        }
        return attackPositions;
    }

    show() {
        Demon.prototype.show.call(this, "rgb(50, 150, 50)");
    }
}