class Chicken extends MoveableObject {
  y = 700;
  height = 140;
  width = 120;

  offset = {
    top: 20,
    right: 10,
    bottom: 30,
    left: 5,
  };

  constructor() {
    super().loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 680 + Math.random() * 12000;
    this.loadImages(ImageHub.chicken.walking);
    this.loadImages(ImageHub.chicken.dead);
    this.hitPoints = 5;
    this.speed = 0.25 + Math.random() * 0.8;
    this.animate();
  }

  animate() {
    IntervalHub.startInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
        this.getRealFrame();
      }
    }, 1000 / 60);
    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        this.playAnimation(ImageHub.chicken.dead);
        if (this.objectDisappears) {
        }
      } else {
        this.playAnimation(ImageHub.chicken.walking);
      }
    }, 150);
  }
}
