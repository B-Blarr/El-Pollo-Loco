class BabyChicken extends MoveableObject {
  y = 750;
  height = 80;
  width = 70;
  deathSoundPlayed = false;

  offset = {
    top: 20,
    right: 10,
    bottom: 30,
    left: 5,
  };

  constructor() {
    super().loadImage("./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 680 + Math.random() * 12500;
    this.loadImages(ImageHub.babyChicken.walking);
    this.loadImages(ImageHub.babyChicken.dead);
    this.hitPoints = 5;
    this.speed = 2.75 + Math.random() * 1.2;
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
        if (!this.deathSoundPlayed) {
          AudioHub.BABY_CHICKEN_DEAD.play();
          this.deathSoundPlayed = true;
        }
        this.playAnimation(ImageHub.babyChicken.dead);
        
        if (this.objectDisappears) {
        }
      } else {
        this.playAnimation(ImageHub.babyChicken.walking);
      }
    }, 150);
  }
}