class CoinBar extends StatusBar{
percentage = 0;

  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.coinBar);
    // this.x = 40;
    this.y = 180;
    // this.width = 400;
    // this.height = 100;
    this.setPercentage();
  }

  setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let path = ImageHub.statusBar.coinBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }




}