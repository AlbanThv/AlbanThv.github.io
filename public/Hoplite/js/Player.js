export default class Player {
  constructor() {
    this.tile;
  }

  set(tile) {
    tile.player = true;
    this.tile = tile;
  }

  get() {
    return this.tiles;
  }

  show() {
    this.tiles.colour()
  }
}
