import AStar from "./AStar.js";
import Demon from "./Demon.js";

export default class Archer extends Demon {
    constructor(map, tile) {
        super(map, tile);
    }

    // newVision() {
    //     let x = this.tile.x;
    //     let y = this.tile.y;
    //     let z = this.tile.z;
    //     let vision = [];
    //     for (let i = 2; i < 7; i++) {
    //         if (this.map.get(x + i, -(x + i) - z, z)) {
    //             vision.push(this.map.tilesList[this.map.get(x + i, -(x + i) - z, z).id]);
    //         }
    //         if (this.map.get(x - i, -(x - i) - z, z)) {
    //             vision.push(this.map.tilesList[this.map.get(x - i, -(x - i) - z, z).id]);
    //         }
    //         if (this.map.get(x, y + i, -x - (y + i))) {
    //             vision.push(this.map.tilesList[this.map.get(x, y + i, -x - (y + i)).id]);
    //         }
    //         if (this.map.get(x, y - i, -x - (y - i))) {
    //             vision.push(this.map.tilesList[this.map.get(x, y - i, -x - (y - i)).id]);
    //         }
    //         if (this.map.get(-y - (z + i), y, z + i)) {
    //             vision.push(this.map.tilesList[this.map.get(-y - (z + i), y, z + i).id]);
    //         }
    //         if (this.map.get(-y - (z - i), y, z - i)) {
    //             vision.push(this.map.tilesList[this.map.get(-y - (z - i), y, z - i).id]);
    //         }
    //     }
    //     return vision;
    // }

    getAttackPositions() {
        let x = this.map.player.tile.x;
        let y = this.map.player.tile.y;
        let z = this.map.player.tile.z;
        let objective = [];
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
                if (this.map.get(coords[j][0], coords[j][1], coords[j][2])) {
                    if (this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id]) {
                        if (!this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id].wall) {
                            if (!this.map.isDemon(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id])) {
                                objective.push(this.map.tilesList[this.map.get(coords[j][0], coords[j][1], coords[j][2]).id]);
                            }
                        }
                    }
                }
            }
        }
        return objective;
    }

    show() {
        // let vision = this.newVision();
        // vision.forEach(v => {
        //     if (v) {
        //         v.hexagon("rgb(50, 50, 200)");
        //     }
        // });
        this.tile.hexagon("rgb(100, 200, 100)");
    }
}