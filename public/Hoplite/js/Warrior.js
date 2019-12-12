import Demon from "./Demon.js";
import Map from "./Map.js";

export default class Warrior extends Demon
{
    constructor(map, tile)
    {
        super(map, tile)
    }

    canAttack(player)
    {
        this.map.getNeighbours(this.tile).forEach((e) =>
        {
            if (e === player.tile)
                return true;
        });

        return false;
    }
}