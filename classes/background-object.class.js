class BackgroundObject extends MoveableObject {
  width = 1440;
  height = 960;

  constructor(imagePath, x, y) {
    super();
    this.loadImage(imagePath);
    this.y = 960 - this.height;
    this.x = x;
  }
}
