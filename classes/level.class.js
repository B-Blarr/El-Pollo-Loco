class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottlesInAir;
  bottlesOnGround;
  coins;
  level_end_x = 18000;

  constructor(enemies, clouds, backgroundObjects, bottlesInAir, bottleOnGround, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottlesInAir = bottlesInAir;
    this.bottlesOnGround = bottleOnGround;
    this.coins = coins;
  }
}
