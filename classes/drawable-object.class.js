/**
 * Base class for all drawable objects in the game.
 * Provides image loading and rendering functionality.
 */
class DrawableObject {
  /** @type {number} Horizontal position on the canvas. */
  x = 120;
  /** @type {number} Vertical position on the canvas. */
  y = 570;
  /** @type {number} Rendered height in pixels. */
  height = 300;
  /** @type {number} Rendered width in pixels. */
  width = 150;
  /** @type {number} Z-order for layering (currently unused by renderer). */
  zIndex = 1;
  /** @type {HTMLImageElement} The currently displayed image. */
  img;
  /** @type {Object.<string, HTMLImageElement>} Cache of preloaded images keyed by path. */
  imageCache = {};
  /** @type {number} Index of the current animation frame. */
  currentImage = 0;
  /** @type {number} Fill percentage used by status bars (0–100). */
  percentage = 100;

  /**
   * Loads a single image and assigns it to {@link img}.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads an array of images into {@link imageCache}.
   * @param {string[]} array - Array of image file paths to preload.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image onto the canvas at the object's position.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // Blauer Rahmen!
  /**
   * Draws a blue debug frame around the object's bounding box and hit box.
   * Only renders for Character, Chicken, Endboss, ThrowableObject, CollectableObject, and BabyChicken.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof CollectableObject ||
      this instanceof BabyChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.rect(this.rX, this.rY, this.rWidth, this.rHeight);
      ctx.stroke();
    }
  }
}
