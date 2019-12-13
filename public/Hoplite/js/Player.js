export default class Player {
  constructor() {
    this.tile;
    this.maxHealth = 3;
    this.currentHealth = 3;
  }

  set(tile) {
    this.tile = tile;
  }

  get() {
    return this.tile;
  }

  show() {
    // this.tile.colour()
      this.tile.hexagon("rgba(170, 170, 50," + this.currentHealth / this.maxHealth + ")");
  }

  isAlive()
  {
    if (this.currentHealth <= 0)
    {
      // launch gameover
    }
    else
    {
      return true;
    }
  }
}
