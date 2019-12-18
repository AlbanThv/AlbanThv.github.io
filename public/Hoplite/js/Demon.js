import AStar from "./AStar.js";

export default class Demon {
    constructor(map, tile) {
        this.map = map;
        this.id = Demon.Count === undefined ? Demon.Count = 0 : ++Demon.Count;
        this.tile = tile;
        this.skin = null;
        this.tile.isOccupied = true;
    }

    move(tile) {
        // console.log(this.tile.isOccupied, tile.isOccupied)
        this.tile.isOccupied = false;
        tile.isOccupied = true;
        this.tile = tile;
    }

    // Returns all the cells from where the demon can attack the player
    getAttackPositions()
    {
        return [this.tile];
    }

    canAttack() {
        let attackPositions = this.getAttackPositions();
        console.log(this.tile, attackPositions);
        let returnValue = false;

        attackPositions.forEach((attackPosition) =>
        {
            if (this.tile === attackPosition)
                returnValue = true;
        });

        return returnValue;
    }

    attack() {
        this.map.player.currentHealth--;
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

        let small = paths[0].length;
        let smallest = paths[0];
        for (let i = 0; i < paths.length - 1; i++) {
            if (paths[i]) {
                if (small > paths[i].length) {
                    small = paths[i].length;
                    smallest = paths[i];
                }
            }
        }

        if (smallest && smallest.length !== 0) {
            this.move(smallest[0]);
        }
    }

    show() {
        this.tile.hexagon("rgb(255, 50, 50)");
    }
}