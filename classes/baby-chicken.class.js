/**
 * A small, fast chicken enemy.
 * Spawned by the Endboss or placed in the level; behaves like a regular chicken but is quicker.
 */
class BabyChicken extends MoveableObject {
  /** @type {number} Initial vertical position on the canvas. */
  y = 750;
  /** @type {number} Rendered height in pixels. */
  height = 80;
  /** @type {number} Rendered width in pixels. */
  width = 70;
  /** @type {boolean} Whether the death sound has already been played. */
  deathSoundPlayed = false;

  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 20,
    right: 5,
    bottom: 20,
    left: 15,
  };

  /**
   * Creates a baby chicken at a random horizontal position, loads images, and starts animation.
   */
  constructor() {
    super();
    this.loadImage("./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 680 + Math.random() * 17500;
    this.loadImages(ImageHub.babyChicken.walking);
    this.loadImages(ImageHub.babyChicken.dead);
    this.hitPoints = 5;
    this.speed = 2.75 + Math.random() * 1.2;
    this.animate();
  }

  /**
   * Starts the movement loop (60 fps) and the animation loop (every 150 ms).
   * Plays the death sound exactly once when the baby chicken dies.
   */
  animate() {
    IntervalHub.startInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
        this.getRealFrame();
      }
    }, 1000 / 60);
    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        if (!this.deathSoundPlayed) {
          AudioHub.playSound(AudioHub.BABY_CHICKEN_DEAD);
          this.deathSoundPlayed = true;
        }
        this.playAnimation(ImageHub.babyChicken.dead);
      } else {
        this.playAnimation(ImageHub.babyChicken.walking);
      }
    }, 150);
  }
}
