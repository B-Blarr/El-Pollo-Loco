class CoinBar extends StatusBar {
  percentage = 0;

  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.coinBar);
    this.y = 180;
    this.setPercentage();
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = ImageHub.statusBar.coinBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
