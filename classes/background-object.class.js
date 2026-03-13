/**
 * A static background layer tile used to build the parallax scrolling background.
 */
class BackgroundObject extends MoveableObject {
  /** @type {number} Rendered width in pixels (one full screen width). */
  width = 1440;
  /** @type {number} Rendered height in pixels (one full screen height). */
  height = 960;

  /**
   * Creates a background tile at the given position using the specified image.
   * @param {string} imagePath - Path to the background layer image.
   * @param {number} x - Horizontal position on the canvas.
   * @param {number} y - Vertical position on the canvas (unused; computed from height).
   */
  constructor(imagePath, x, y) {
    super();
    this.loadImage(imagePath);
    this.y = 960 - this.height;
    this.x = x;
  }
}
