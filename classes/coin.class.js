class Coin extends CollectableObject {



offset = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
  };

constructor(){
super().loadImage("./assets/img/8_coin/coin_1.png");
this.loadImages(ImageHub.icon.coin);
    this.x = 480 + Math.random() * 1800;
    this.y = 500 - Math.random() * 250;
    this.width = 180;
    this.height = 180;
    this.playAnimation(ImageHub.icon.coin);

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