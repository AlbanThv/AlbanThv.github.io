export default class Demon {
    constructor(map, tile) {
        this.map = map;
        this.tile = tile;
        this.skin = null;
    }

    move(tile) {
        this.tile = tile;
    }

    canAttack(player) {

    }

    attack(player) {
        player.currentHealth--;
        player.isAlive();
    }

    show() {
        this.tile.hexagon("rgb(255, 50, 50)");
    }
}