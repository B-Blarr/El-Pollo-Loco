/**
 * Base class for all collectables (bottles and coins).
 * Places the object at a random position within the level on creation.
 */
class CollectableObject extends MoveableObject {
  /**
   * Creates a collectable at a random position and computes its hit frame.
   */
  constructor() {
    super();
    this.loadImage("./assets/img/6_salsa_bottle/salsa_bottle.png");
    this.x = 480 + Math.random() * 18000;
    this.y = 500 - Math.random() * 350;
    this.width = 180;
    this.height = 180;
    this.getRealFrame();
  }
}
