/**
 * Holds all objects that belong to a single game level.
 */
class Level {
  /** @type {MoveableObject[]} Array of enemy instances active in this level. */
  enemies;
  /** @type {Cloud[]} Array of cloud objects that scroll across the background. */
  clouds;
  /** @type {BackgroundObject[]} Array of background layer tiles for parallax scrolling. */
  backgroundObjects;
  /** @type {BottleInAir[]} Array of collectable bottles floating in the air. */
  bottlesInAir;
  /** @type {BottleOnGround[]} Array of collectable bottles lying on the ground. */
  bottlesOnGround;
  /** @type {Coin[]} Array of collectable coin objects. */
  coins;
  /** @type {number} The x-coordinate that marks the right-hand boundary of the level. */
  level_end_x = 18000;

  /**
   * Creates a level and populates it with the provided game objects.
   * @param {MoveableObject[]} enemies - Enemy instances to include in the level.
   * @param {Cloud[]} clouds - Cloud objects for the background.
   * @param {BackgroundObject[]} backgroundObjects - Background layer tiles.
   * @param {BottleInAir[]} bottlesInAir - Bottles placed in the air.
   * @param {BottleOnGround[]} bottleOnGround - Bottles placed on the ground.
   * @param {Coin[]} coins - Coin objects placed in the level.
   */
  constructor(enemies, clouds, backgroundObjects, bottlesInAir, bottleOnGround, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottlesInAir = bottlesInAir;
    this.bottlesOnGround = bottleOnGround;
    this.coins = coins;
  }
}
