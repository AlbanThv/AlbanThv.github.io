import AStar from "./AStar.js";

export default class Demon {
    constructor(map, tile) {
        this.map = map;
        this.id = Demon.Count === undefined ? Demon.Count = 0 : ++Demon.Count;
        this.tile = tile;
        this.skin = null;
        this.tile.isOccupied = true;
        this.isAlive = true;
    }

    move(tile) {
        // console.log(this.tile.isOccupied, tile.isOccupied)
        this.tile.isOccupied = false;
        tile.isOccupied = true;
        this.tile = tile;
    }

    // Returns all the cells from where the demon can attack the player
    getAttackPositions() {
        return [];
    }

    canAttack() {
        let attackPositions = this.getAttackPositions();
        let returnValue = false;

        attackPositions.forEach((attackPosition) => {
            if (this.tile === attackPosition)
                returnValue = true;
        });

        return returnValue;
    }

    attack() {
        if (this.map.player.currentHealth > 0) {
            this.map.player.currentHealth--;
        }
        // console.log("hit");
        this.map.player.isAlive();
    }

    planMovement() {
        let attackPositions = this.getAttackPositions();
        let paths = [];

        attackPositions.forEach(v => {
            if (v) {
                paths.push(AStar.search(this.map, this.tile, v));
            }
        });

        let index = paths.length - 1;
        while (index >= 0) {
            if (paths[index].length === 0) {
                paths.splice(index, 1);
            }
            index--;
        }

        let smallest = paths[0];
        for (let i = 0; i < paths.length - 1; i++) {
            if (paths[i]) {
                if (smallest.length > paths[i].length) {
                    smallest = paths[i];
                }
            }
        }

        if (smallest && smallest.length !== 0) {
            this.move(smallest[0]);
        } else { // no paths -> moves randomly
            let randomTile = this.map.getNeighbours(this.tile, true);
            if (randomTile.length !== 0) {
                this.move(randomTile[Math.floor(Math.random() * Math.floor(randomTile.length))]);
            }
        }

    }

    show(color = "rgb(255, 0, 0)") {
        this.tile.hexagon(color, this.id, "rgb(100, 50, 100)");
    }
}