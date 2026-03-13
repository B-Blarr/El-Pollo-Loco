/**
 * A decorative cloud that drifts slowly to the left across the background.
 */
class Cloud extends MoveableObject {
  /** @type {number} Fixed vertical position near the top of the canvas. */
  y = 50;
  /** @type {number} Rendered width in pixels. */
  width = 600;
  /** @type {number} Rendered height in pixels. */
  height = 400;

  /**
   * Creates a cloud at a random horizontal position and starts its drift animation.
   */
  constructor() {
    super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");
    this.x = 480 + Math.random() * 3800;
    this.animate();
  }

  /**
   * Starts the movement loop at 60 fps, drifting the cloud to the left at its default speed.
   */
  animate() {
    IntervalHub.startInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
