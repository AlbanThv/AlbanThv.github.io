export default class Player {
    constructor(map, tile) {
        this.map = map;
        this.tile = tile;
        this.maxHealth = 3;
        this.currentHealth = 3;
    }

    move(tile) {
        this.tile = tile;
    }

    canAttack(demon) {
        let adjacent = false;
        let killingTile = [];
        this.map.getNeighbours(demon.tile).forEach(tile => {
            if (this.tile === tile) {
                adjacent = true;
            }
        });
        if (adjacent) {
            this.map.getNeighbours(demon.tile).forEach(demonNei => {
                this.map.getNeighbours(this.tile).forEach(myNei => {
                    if (demonNei === myNei) {
                        killingTile.push(myNei);
                    }
                });
            });
        }
        return killingTile;
    }

    // get() {
    //     return this.tile;
    // }

    show() {
        // this.tile.colour()
        this.tile.hexagon("rgba(170, 170, 50," + this.currentHealth / this.maxHealth + ")");
    }

    isAlive() {
        if (this.currentHealth <= 0) {
            // launch gameover
        } else {
            return true;
        }
    }
}
