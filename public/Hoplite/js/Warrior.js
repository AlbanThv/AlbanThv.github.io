import Demon from "./Demon.js";

export default class Warrior extends Demon {
    constructor(map, tile, skin) {
        super(map, tile, skin)
    }

    getAttackPositions() {
        let attackPositions = [];

        this.map.getNeighbours(this.map.player.tile).forEach((neighbour) => {
            if (this.map.isClean(neighbour, this))
                attackPositions.push(neighbour);
        });
        return attackPositions;
    }

    show() {
        Demon.prototype.show.call(this, "rgb(50, 50, 50)");
    }
}