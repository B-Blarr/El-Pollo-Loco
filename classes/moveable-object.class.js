/**
 * Extends DrawableObject with movement, physics, collision, and health mechanics.
 * Serves as the base class for all moving game entities.
 */
class MoveableObject extends DrawableObject {
  /** @type {number} Horizontal movement speed in pixels per tick. */
  speed = 0.15;
  /** @type {boolean} Whether the object is moving in the opposite (left) direction. */
  otherDirection = false;
  /** @type {number} Vertical velocity; positive values move the object upward. */
  speedY = 0;
  /** @type {number} Gravity acceleration applied each physics tick. */
  acceleration = 1;
  /** @type {number} Horizontal position of the real (hit) frame. */
  rX;
  /** @type {number} Vertical position of the real (hit) frame. */
  rY;
  /** @type {number} Width of the real (hit) frame. */
  rWidth;
  /** @type {number} Height of the real (hit) frame. */
  rHeight;
  /** @type {number} Current hit points; reaching 0 means the object is dead. */
  hitPoints = 100;
  /** @type {number} Timestamp (ms) of the last hit received. */
  lastHit = 0;
  /** @type {number|undefined} Timestamp (ms) recorded when the object died. */
  timeOfDeath;
  /** @type {boolean} Whether this object has already hit something (used by throwables). */
  hasHit = false;

  /**
   * Pixel offsets that shrink the sprite rect to create the actual collision hit box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Starts a gravity loop that applies vertical acceleration each frame.
   * ThrowableObjects always fall; other objects only fall when above the ground line.
   */
  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.hasHit) return;
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 75);
  }

  /**
   * Checks whether the object is currently above the ground level.
   * ThrowableObjects are always considered above ground to keep them falling.
   * @returns {boolean} True if the object is above the ground line.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 326;
    }
  }

  /**
   * Advances the looping animation by one frame.
   * @param {string[]} images - Array of image paths representing the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays a one-shot death animation that stops on the last frame.
   * @param {string[]} images - Array of image paths representing the death animation frames.
   */
  playDeadAnimation(images) {
    let i = Math.min(this.currentImage, images.length - 1);
    let path = images[i];
    this.img = this.imageCache[path];
    if (this.currentImage < images.length - 1) {
      this.currentImage++;
    }
  }

  /**
   * Moves the object to the right by its speed and resets the facing direction.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting the vertical velocity.
   */
  jump() {
    this.speedY = 22;
  }

  /**
   * Recalculates the real collision frame (rX, rY, rWidth, rHeight) from the
   * sprite dimensions and the configured offsets, taking direction into account.
   */
  getRealFrame() {
    this.rX = this.otherDirection
      ? this.x + this.offset.right
      : this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
  }

  /**
   * Checks whether this object's hit box overlaps with another moveable object's hit box.
   * @param {MoveableObject} moveableObject - The other object to test against.
   * @returns {boolean} True if the two hit boxes intersect.
   */
  isColliding(moveableObject) {
    return (
      this.rX + this.rWidth > moveableObject.rX &&
      this.rY + this.rHeight > moveableObject.rY &&
      this.rX < moveableObject.rX + moveableObject.rWidth &&
      this.rY < moveableObject.rY + moveableObject.rHeight
    );
  }

  /**
   * Determines whether this object is jumping on top of another (stomp attack).
   * Never true when the target is an Endboss.
   * @param {MoveableObject} moveableObject - The enemy to check against.
   * @returns {boolean} True if this object is descending onto the enemy's upper half.
   */
  isJumpingOn(moveableObject) {
    if (!this.isColliding(moveableObject) || moveableObject instanceof Endboss) {
      return false;
    }
    let characterFeet = this.rY + this.rHeight;
    let enemyHead = moveableObject.rY + moveableObject.rHeight * 0.5;
    let fallingTolerance = -this.speedY;
    return characterFeet < enemyHead + fallingTolerance;
  }

  /**
   * Reduces hit points by 20 and records the time of the hit.
   * Hit points are clamped to a minimum of 0.
   */
  hit() {
    this.hitPoints -= 20;
    if (this.hitPoints < 0) {
      this.hitPoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object was hit within the last 0.5 seconds.
   * @returns {boolean} True if the object is in its hurt state.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks whether the object has been killed (hit points reached zero).
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.hitPoints == 0;
  }

  /**
   * Returns true once the object has been dead for longer than the given delay.
   * Records the exact time of death on first call after the object dies.
   * @param {number} timer - Milliseconds to wait before the object should disappear.
   * @returns {boolean} True if the object should be removed from the scene.
   */
  objectDisappears(timer) {
    if (!this.isDead()) return false;
    if (!this.timeOfDeath) {
      this.timeOfDeath = new Date().getTime();
    }
    let timepassed = new Date().getTime() - this.timeOfDeath;
    return timepassed > timer;
  }
}
