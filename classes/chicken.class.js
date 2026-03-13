/**
 * A regular chicken enemy that walks left and can be stomped or hit by bottles.
 */
class Chicken extends MoveableObject {
  /** @type {number} Initial vertical position on the canvas. */
  y = 700;
  /** @type {number} Rendered height in pixels. */
  height = 140;
  /** @type {number} Rendered width in pixels. */
  width = 120;
  /** @type {boolean} Whether the death sound has already been played. */
  deathSoundPlayed = false;

  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 20,
    right: 10,
    bottom: 30,
    left: 5,
  };

  /**
   * Creates a chicken at a random horizontal position, loads images, and starts animation.
   */
  constructor() {
    super();
    this.loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 680 + Math.random() * 17000;
    this.loadImages(ImageHub.chicken.walking);
    this.loadImages(ImageHub.chicken.dead);
    this.hitPoints = 5;
    this.speed = 0.25 + Math.random() * 0.8;
    this.animate();
  }

  /**
   * Starts the movement loop (60 fps) and the animation loop (every 150 ms).
   * Plays the death sound exactly once when the chicken dies.
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
          AudioHub.playSound(AudioHub.CHICKEN_DEAD);
          this.deathSoundPlayed = true;
        }
        this.playAnimation(ImageHub.chicken.dead);
      } else {
        this.playAnimation(ImageHub.chicken.walking);
      }
    }, 150);
  }
}
