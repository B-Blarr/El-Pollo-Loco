/**
 * HUD status bar that displays the number of collected coins.
 * Starts empty (0%) and fills as coins are collected. At 100% it resets and grants health.
 */
class CoinBar extends StatusBar {
  /** @type {number} Current coin fill percentage (0–100). */
  percentage = 0;

  /**
   * Creates a coin bar, loads coin bar images, positions it below the bottle bar,
   * and initialises the display at 0%.
   */
  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.coinBar);
    this.y = 180;
    this.setPercentage();
  }

  /**
   * Updates the displayed coin percentage and swaps to the corresponding bar image.
   * @param {number} percentage - New coin count value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = ImageHub.statusBar.coinBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
