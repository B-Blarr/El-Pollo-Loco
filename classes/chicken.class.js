class Chicken extends MoveableObject {
  y = 700;
  height = 140;
  width = 120;

     offset = {
        top: 20,
        right: 10,
        bottom: 30,
        left: 5
  }

  constructor() {
    super().loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 480 + Math.random() * 800;
    this.loadImages(ImageHub.chicken.walking);
    this.speed = 0.25 + Math.random() * 0.7;
    this.animate();
  }

  animate() {
    IntervalHub.startInterval(() => {
      this.moveLeft();
      this.getRealFrame();
    }, 1000 / 60);
    IntervalHub.startInterval(() => {
      this.playAnimation(ImageHub.chicken.walking);
    }, 150);
  }
}
