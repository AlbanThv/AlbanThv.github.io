import AStar from "./AStar.js";

export default class Demon {
    constructor(map, tile) {
        this.map = map;
        this.id = Demon.Count === undefined ? Demon.Count = 0 : ++Demon.Count;
        this.tile = tile;
        this.skin = null;
    }

    move(tile) {
        this.tile.isOccupied = false;
        tile.isOccupied = true;
        this.tile = tile;
    }

    canAttack(player) {

    }

    attack(player) {
        player.currentHealth--;
        // console.log("hit");
        player.isAlive();
    }

    planMovement() {
        let path = AStar.search(this.map, this.tile, this.map.player.tile);
        // console.log(path);
        path.pop();
        if (path[0]) {
            this.move(path[0]);
        }
    }

    show() {
        this.tile.hexagon("rgb(255, 50, 50)");
    }
}