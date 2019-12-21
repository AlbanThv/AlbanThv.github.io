export default class Player {
    constructor(map, tile) {
        this.map = map;
        this.tile = tile;
        this.maxHealth = 3;
        this.currentHealth = 3;
        this.tile.isOccupied = true;
        this.hasSpear = true;
    }

    move(tile) {
        this.tile.isOccupied = false;
        tile.isOccupied = true;
        this.tile = tile;
    }

    canAttack(demon) {
        let adjacent = false;
        let killingTiles = [];
        this.map.getNeighbours(demon.tile).forEach(tile => {
            if (this.tile === tile) {
                adjacent = true;
            }
        });
        if (adjacent) {
            this.map.getNeighbours(demon.tile).forEach(demonNei => {
                this.map.getNeighbours(this.tile).forEach(myNei => {
                    if (demonNei === myNei) {
                        killingTiles.push(myNei);
                    }
                });
            });
        }
        else if (this.hasSpear)
        {
            if (this.map.get(this.tile.x + 2, this.tile.y - 2, this.tile.z) === demon.tile)
                killingTiles.push(this.map.get(this.tile.x + 1, this.tile.y - 1, this.tile.z));
            else if (this.map.get(this.tile.x - 2, this.tile.y + 2, this.tile.z) === demon.tile)
                killingTiles.push(this.map.get(this.tile.x - 1, this.tile.y + 1, this.tile.z));
            else if (this.map.get(this.tile.x, this.tile.y + 2, this.tile.z - 2) === demon.tile)
                killingTiles.push(this.map.get(this.tile.x, this.tile.y + 1, this.tile.z - 1));
            else if (this.map.get(this.tile.x, this.tile.y - 2, this.tile.z + 2) === demon.tile)
                killingTiles.push(this.map.get(this.tile.x, this.tile.y - 1, this.tile.z + 1));
            else if (this.map.get(this.tile.x - 2, this.tile.y, this.tile.z + 2) === demon.tile)
                killingTiles.push(this.map.get(this.tile.x - 1, this.tile.y, this.tile.z + 1));
            else if (this.map.get(this.tile.x + 2, this.tile.y, this.tile.z - 2) === demon.tile)
                killingTiles.push(this.map.get(this.tile.x + 1, this.tile.y, this.tile.z - 1));
        }


        let index = killingTiles.length - 1;
        while (index >= 0) {
            if (killingTiles[index].isOccupied || killingTiles[index].isLava) {
                killingTiles.splice(index, 1);
            }
            index--;
        }

        return killingTiles;
    }

    attack(demon)
    {
        demon.tile.isOccupied = false;
        demon.isAlive = false;
    }

    show() {
        this.tile.hexagon("rgba(170, 170, 50," + this.currentHealth / this.maxHealth + ")", this.currentHealth, "rgb(200, 50, 50)");
    }

    isAlive() {
        if (this.currentHealth <= 0) {
            // launch gameover
        } else {
            return true;
        }
    }
}
