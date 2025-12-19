class EndbossHealthBar extends StatusBar{
  percentage = 100;

  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.healthBarEndboss);
    this.x = 1000;
    this.y = 15;
    this.width = 400;
    this.height = 100;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let path = ImageHub.statusBar.healthBarEndboss[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}