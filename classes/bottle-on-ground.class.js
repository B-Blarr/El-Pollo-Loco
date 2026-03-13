/**
 * A collectable salsa bottle lying on the ground.
 * Randomly selects one of two ground-bottle sprites and positions itself at ground level.
 */
class BottleOnGround extends CollectableObject {
  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 25,
    right: 60,
    bottom: 25,
    left: 75,
  };

  /**
   * Creates a ground bottle, randomly picks a sprite variant, and fixes it to the ground row.
   */
  constructor() {
    super();
    if (Math.random() < 0.5) {
      this.loadImage("./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    } else {
      this.loadImage("./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    }

    this.y = 700;
    this.getRealFrame();
  }
}
