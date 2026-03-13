/**
 * A collectible coin that spins in a looping animation.
 * Collecting 100 coins converts them into 20 hit points for the character.
 */
class Coin extends CollectableObject {
  /**
   * Pixel offsets that define the (small) collision hit box relative to the sprite.
   * The large offsets create a tight central hit box.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 65,
    right: 65,
    bottom: 65,
    left: 65,
  };

  /**
   * Creates a coin at a random position, starts the spinning animation, and computes its hit frame.
   */
  constructor() {
    super().loadImage("./assets/img/8_coin/coin_1.png");
    this.loadImages(ImageHub.icon.coin);
    this.x = 480 + Math.random() * 16000;
    this.y = 700 - Math.random() * 350;
    this.width = 180;
    this.height = 180;
    this.playAnimation(ImageHub.icon.coin);
    this.getRealFrame();
  }

  /**
   * Starts a continuous spinning animation loop at 250 ms per frame.
   * @param {string[]} images - Array of image paths representing the coin spin frames.
   */
  playAnimation(images) {
    IntervalHub.startInterval(() => {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 250);
  }
}
