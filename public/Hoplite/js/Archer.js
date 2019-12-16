import Demon from "./Demon.js";

export default class Archer extends Demon
{
    constructor(map, tile)
    {
        super(map, tile)
    }

    canAttack(player)
    {
        for (let i = 2; i < 7; i++)
        {
            let x = this.tile.x;
            let y = this.tile.y;
            let z = this.tile.z;

            if (this.map.get(x + i, -(x+i)-z, z) === player.tile || this.map.get(x - i, -(x-i)-z, z) === player.tile || this.map.get(x, y + i, -x-(y+i)) === player.tile || this.map.get(x, y - i, -x-(y-i)) === player.tile || this.map.get(-y-(z+i), y, z + i) === player.tile || this.map.get(-y-(z-i), y, z - i) === player.tile)
            {
                console.log("hit");
                return true;
            }
        }

        return false;
    }

    show()
    {
        this.tile.hexagon("rgb(50, 255, 50)");
    }
}