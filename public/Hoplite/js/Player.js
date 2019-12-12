export default class Player {
  constructor() {
    this.tile;
  }

  set(tile) {
    this.tile = tile;
  }

  get() {
    return this.tile;
  }

  show() {
    // this.tile.colour()
      this.tile.hexagon("rgb(170, 170, 50)");
  }
}
