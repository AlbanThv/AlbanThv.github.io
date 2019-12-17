import AStar from "./AStar.js";
import Demon from "./Demon.js";

export default class Archer extends Demon {
    constructor(map, tile) {
        super(map, tile)
        this.smallest;
    }

    newVision() {
        let x = this.tile.x;
        let y = this.tile.y;
        let z = this.tile.z;
        let vision = [];
        for (let i = 2; i < 7; i++) {
            if (this.map.get(x + i, -(x + i) - z, z)) {
                vision.push(this.map.tilesList[this.map.get(x + i, -(x + i) - z, z).id]);
            }
            if (this.map.get(x - i, -(x - i) - z, z)) {
                vision.push(this.map.tilesList[this.map.get(x - i, -(x - i) - z, z).id]);
            }
            if (this.map.get(x, y + i, -x - (y + i))) {
                vision.push(this.map.tilesList[this.map.get(x, y + i, -x - (y + i)).id]);
            }
            if (this.map.get(x, y - i, -x - (y - i))) {
                vision.push(this.map.tilesList[this.map.get(x, y - i, -x - (y - i)).id]);
            }
            if (this.map.get(-y - (z + i), y, z + i)) {
                vision.push(this.map.tilesList[this.map.get(-y - (z + i), y, z + i).id]);
            }
            if (this.map.get(-y - (z - i), y, z - i)) {
                vision.push(this.map.tilesList[this.map.get(-y - (z - i), y, z - i).id]);
            }
        }
        return vision;
    }

    newObjective(tile) {
        let x = tile.x;
        let y = tile.y;
        let z = tile.z;
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

    canAttack(player) {
        let vision = this.newObjective(this.tile);
        vision.forEach(v => {
            if (v === player.tile) {
                console.log("hit");
                return true;
            }
        });
        return false;
    }

    planMovement() {
        let paths = [];
        let objective = this.newObjective(this.map.player.tile);
        objective.forEach(v => {
            if (v) {
                paths.push(AStar.search(this.map, this.tile, v));
            }
        });

        let vision = this.newObjective(this.tile);
        vision.forEach(v => {
            if (v === this.map.player.tile) {
                console.log("I can hit");
                paths.unshift([])
            }
        });

        let small = paths[0].length;
        let smallest = paths[0];
        for (let i = 0; i < paths.length - 1; i++) {
            if (paths[i]) {
                if (small > paths[i].length) {
                    small = paths[i].length;
                    smallest = paths[i];
                }
            }
        }
        this.smallest = smallest;

        if (this.smallest[0]) {
            this.move(this.smallest[0]);
        }
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