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
    this.x = 4250;
    this.loadImages(ImageHub.endboss.walking);
    this.loadImages(ImageHub.endboss.alert);
    this.loadImages(ImageHub.endboss.dead);
    this.loadImages(ImageHub.endboss.hurt);
    this.speed = 10;
    this.hitPoints = 400;
    this.animate();
  }

  animate() {
    

    
    
    IntervalHub.startInterval(() => {
      if (this.world.hadFirstContact == false) {
      return;
    }else {
      this.moveLeft(this.speed);
    this.getRealFrame();
      if (this.isDead()) {
        if (!this.isDeadAnimationPlaying) {
            this.currentImage = 0; // Zähler auf 0 setzen!
            this.isDeadAnimationPlaying = true; // Merken, dass wir resetten haben
        }
        this.playDeadAnimation(ImageHub.endboss.dead);
        // IntervalHub.stopAllIntervals();
      }  else if (this.isHurt()) {
          this.playAnimation(ImageHub.endboss.hurt);
      }else {
        this.playAnimation(ImageHub.endboss.alert);
      }
    }
    }, 200); 
  }
}
