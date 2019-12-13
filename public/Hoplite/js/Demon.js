import AStar from "./AStar.js";

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

    attack(player)
    {
        player.currentHealth--;
        player.isAlive();
    }

    planMovement()
    {
        let path = AStar.search(this.map, this.tile, this.map.player.tile);
        if (path[0] !== undefined)
            this.move(path[0]);
    }

    show()
    {
        this.tile.hexagon("rgb(255, 50, 50)");
    }
}