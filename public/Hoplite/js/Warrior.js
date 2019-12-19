import Demon from "./Demon.js";

export default class Warrior extends Demon {
    constructor(map, tile) {
        super(map, tile)
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
        this.tile.hexagon("rgb(50, 50, 50)", this.id);
    }
}