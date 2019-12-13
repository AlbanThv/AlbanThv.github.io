import Demon from "./Demon.js";

export default class Warrior extends Demon {
    constructor(map, tile) {
        super(map, tile)
    }

    canAttack(player) {
        let found = false;

        this.map.getNeighbours(this.tile).forEach((e) => {
            if (e === player.tile)
                found = true;
            return;
        });

        return found;
    }
}