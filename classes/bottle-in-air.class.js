/**
 * A collectable salsa bottle that floats in the air.
 * Uses a narrower hit box (trimmed sides) to make aerial collection feel fair.
 */
class BottleInAir extends CollectableObject {
  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 25,
    right: 70,
    bottom: 25,
    left: 70,
  };

  /**
   * Creates a bottle in the air, inheriting the random position from CollectableObject.
   */
  constructor() {
    super();
  }
}
