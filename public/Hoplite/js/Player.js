export default class Player {
    constructor(map, skin, tile) {
        this.map = map;
        this.tile = tile;
        this.maxHealth = 3;
        this.currentHealth = 3;
        this.tile.isOccupied = true;
        this.hasSpear = true;
        this.skin = skin;
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
            this.map.neighbourCoords.forEach(coords => {
                if (this.map.get(this.tile.x + coords[0] * 2, this.tile.y + coords[1] * 2, this.tile.z + coords[2] * 2) === demon.tile) {
                    killingTiles.push(this.map.get(this.tile.x + coords[0], this.tile.y + coords[1], this.tile.z + coords[2]));
                }
            });
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
        this.tile.hexagon(this.skin, "rgba(170, 170, 50," + this.currentHealth / this.maxHealth + ")", this.currentHealth, "rgb(200, 50, 50)");
    }

    isAlive() {
        if (this.currentHealth <= 0) {
            // launch gameover
        } else {
            return true;
        }
    }
}
