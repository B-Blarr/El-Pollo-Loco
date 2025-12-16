class Endboss extends MoveableObject {
  y = 260;
  height = 640;
  width = 620;

  constructor() {
    super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 4650
    this.loadImages(ImageHub.endboss.alert);
    this.speed = 0;
    this.hitPoints = 200;
    this.animate();
  }

  animate() {
    this.moveLeft(this.speed);
    IntervalHub.startInterval(() => {
        this.playAnimation(ImageHub.endboss.alert);
    //   let i = this.currentImage % ImageHub.endboss.walking.length;
    //   let path = ImageHub.endboss.walking[i];
    //   this.img = this.imageCache[path];
    //   this.currentImage++;
    }, 450);
  }
}
