/**
 * HUD status bar that displays the player character's current health.
 */
class HealthBar extends StatusBar {
  /** @type {number} Current health percentage (0–100). */
  percentage = 100;

  /**
   * Creates a health bar with the default StatusBar position and images.
   */
  constructor() {
    super();
  }

  /**
   * Updates the displayed health percentage and swaps to the corresponding bar image.
   * @param {number} percentage - New health value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = ImageHub.statusBar.healthBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
