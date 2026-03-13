/**
 * HUD status bar that displays the endboss's current health.
 * Shown only after the character first enters the endboss zone.
 */
class EndbossHealthBar extends StatusBar{
  /** @type {number} Current endboss health percentage (0–100). */
  percentage = 100;

  /**
   * Creates an endboss health bar in the upper-right corner of the HUD,
   * loads the orange endboss bar images, and initialises the display at 100%.
   */
  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.healthBarEndboss);
    this.x = 1000;
    this.y = 15;
    this.width = 400;
    this.height = 100;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed endboss health percentage and swaps to the corresponding bar image.
   * @param {number} percentage - New health value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let path = ImageHub.statusBar.healthBarEndboss[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
