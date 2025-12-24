class BottleBar extends StatusBar {
  percentage = 0;

  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.bottleBar);
    this.y = 90;
    this.setPercentage();
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = ImageHub.statusBar.bottleBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
