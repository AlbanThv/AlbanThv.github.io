import Map from "./Map.js";

export default class Demon
{
    constructor(map, tile)
    {
        this.map = map;
        this.tile = tile;
        this.skin = null;
    }

    move(tile)
    {
        this.tile = tile;
    }

    canAttack(player)
    {

    }

    attack()
    {

    }
}