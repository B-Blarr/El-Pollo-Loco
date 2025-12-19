class Endboss extends MoveableObject {
  y = 260;
  height = 640;
  width = 620;
  isDeadAnimationPlaying = false;

   offset = {
        top: 150,
        right: 100,
        bottom: 100,
        left: 50
  }

  constructor() {
    super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 4650
    this.loadImages(ImageHub.endboss.alert);
    this.loadImages(ImageHub.endboss.dead);
    this.loadImages(ImageHub.endboss.hurt);
    this.speed = 0;
    this.hitPoints = 200;
    this.animate();
  }

  animate() {
    this.moveLeft(this.speed);
    this.getRealFrame();
    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        if (!this.isDeadAnimationPlaying) {
            this.currentImage = 0; // Zähler auf 0 setzen!
            this.isDeadAnimationPlaying = true; // Merken, dass wir resetten haben
        }
        this.playDeadAnimation(ImageHub.endboss.dead);
        // IntervalHub.stopAllIntervals();
      }  else if (this.isHurt()) {
          this.playAnimation(ImageHub.endboss.hurt);
          this.playAnimation(ImageHub.endboss.hurt);
      }else {
        this.playAnimation(ImageHub.endboss.alert);
      }
    }, 200); 
  }
}
