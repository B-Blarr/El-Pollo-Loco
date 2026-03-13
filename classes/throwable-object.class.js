/**
 * A salsa bottle thrown by the character.
 * Travels left or right with gravity applied, then explodes on impact or on hitting the ground.
 */
class ThrowableObject extends MoveableObject {
  /** @type {boolean} Whether the bottle has already hit something or the ground. */
  hasHit;
  /** @type {number} The y-coordinate threshold that counts as the ground. */
  ground = 700;

  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  };

  /**
   * Creates a throwable bottle at the given position.
   * Starts rotation animation, applies initial velocity, and launches in the correct direction.
   * @param {number} x - Starting horizontal position.
   * @param {number} y - Starting vertical position (offset of 130 is added internally).
   * @param {boolean} otherDirection - True if the bottle should be thrown to the left.
   */
  constructor(x, y, otherDirection) {
    super();
    this.loadImage(ImageHub.icon.bottle);
    this.loadImages(ImageHub.bottle.bottleRotation);
    this.loadImages(ImageHub.bottle.bottleSplash);
    this.animate();
    this.x = x;
    this.y = y + 130;
    this.width = 180;
    this.height = 180;
    this.hasHit = false;
    this.otherDirection = otherDirection;
    this.throwRight();
    this.throwLeft();
  }

  /**
   * Starts a rightward throw with gravity when the bottle was not thrown in the opposite direction.
   */
  throwRight() {
    if (this.hasHit == true) {
      return;
    } else {
      if (this.otherDirection == false) {
        this.speedY = 20;
        this.applyGravity();
        IntervalHub.startInterval(() => {
          if (this.hasHit) return;
          this.x += 20;
        }, 25);
      }
    }
  }

  /**
   * Starts a leftward throw with gravity when the bottle was thrown in the opposite direction.
   */
  throwLeft() {
    if (this.hasHit == true) {
      return;
    } else {
      if (this.otherDirection == true) {
        this.speedY = 20;
        this.applyGravity();
        IntervalHub.startInterval(() => {
          if (this.hasHit) return;
          this.x -= 20;
        }, 25);
      }
    }
  }

  /**
   * Starts the hit-box update loop and the animation loop.
   * Switches from rotation to splash animation once the bottle has hit.
   */
  animate() {
    IntervalHub.startInterval(() => {
      this.getRealFrame();
    }, 1000 / 60);
    IntervalHub.startInterval(() => {
      if (this.hasHit == true) {
        this.playDeadAnimation(ImageHub.bottle.bottleSplash);
      } else {
        this.playAnimation(ImageHub.bottle.bottleRotation);
      }
    }, 150);
  }

  /**
   * Triggers the bottle explosion: marks it as hit, zeroes hit points and velocity.
   * @returns {boolean} Always returns true to indicate the bottle has hit.
   */
  bottleExplodes() {
    this.hasHit = true;
    this.hitPoints = 0;
    this.speedY = 0;
    this.speedX = 0;
    return this.hasHit;
  }

  /**
   * Checks whether the bottle has reached or passed the ground level.
   * @returns {boolean} True if the bottle's y position is at or below {@link ground}.
   */
  hitGround() {
    if (this.y >= this.ground) {
      return true;
    } else {
      return false;
    }
  }
}
