/**
 * HUD status bar that displays the number of collected salsa bottles.
 * Starts empty (0%) and fills as bottles are collected.
 */
class BottleBar extends StatusBar {
  /** @type {number} Current bottle fill percentage (0–100). */
  percentage = 0;

  /**
   * Creates a bottle bar, loads bottle bar images, positions it below the health bar,
   * and initialises the display at 0%.
   */
  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.bottleBar);
    this.y = 90;
    this.setPercentage();
  }

  /**
   * Updates the displayed bottle percentage and swaps to the corresponding bar image.
   * @param {number} percentage - New bottle count value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = ImageHub.statusBar.bottleBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
