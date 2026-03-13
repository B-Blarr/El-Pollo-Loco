/**
 * Base class for all HUD status bars.
 * Manages a percentage value and maps it to one of six status bar images.
 */
class StatusBar extends DrawableObject {
  /** @type {number} Current fill percentage of the status bar (0–100). */
  percentage = 100;

  /**
   * Creates a status bar, loads the health bar images, and sets the initial display to 100%.
   */
  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.healthBar);
    this.x = 40;
    this.y = 0;
    this.width = 400;
    this.height = 100;
    this.setPercentage(100);
  }

  /**
   * Maps the current percentage to an image index (0 = full, 5 = empty).
   * @returns {number} An index between 0 and 5 corresponding to the fill level.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage >= 80) {
      return 1;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
