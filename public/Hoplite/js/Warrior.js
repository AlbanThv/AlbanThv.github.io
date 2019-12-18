import Demon from "./Demon.js";

export default class Warrior extends Demon {
    constructor(map, tile) {
        super(map, tile)
    }

    getAttackPositions()
    {
        return this.map.getNeighbours(this.map.player.tile);
    }

    show() {
        this.tile.hexagon("rgb(20, 20, 20)");
    }
}