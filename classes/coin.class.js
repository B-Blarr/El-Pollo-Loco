class Coin extends CollectableObject {
  offset = {
    top: 65,
    right: 65,
    bottom: 65,
    left: 65,
  };

  constructor() {
    super().loadImage("./assets/img/8_coin/coin_1.png");
    this.loadImages(ImageHub.icon.coin);
    this.x = 480 + Math.random() * 16000;
    this.y = 700 - Math.random() * 350;
    this.width = 180;
    this.height = 180;
    this.playAnimation(ImageHub.icon.coin);
    this.getRealFrame();
  }

  playAnimation(images) {
    IntervalHub.startInterval(() => {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 250);
  }
}
