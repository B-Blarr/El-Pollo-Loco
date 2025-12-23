class Endboss extends MoveableObject {
  y = 260;
  height = 640;
  width = 620;
  isDeadAnimationPlaying = false;
  isAttacking = false;
  alarmSoundPlayed = false;
  deadSoundPlayed = false;

  offset = {
    top: 150,
    right: 100,
    bottom: 100,
    left: 50,
  };

  constructor() {
    super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 12300;
    this.loadImages(ImageHub.endboss.walking);
    this.loadImages(ImageHub.endboss.alert);
    this.loadImages(ImageHub.endboss.dead);
    this.loadImages(ImageHub.endboss.hurt);
    this.loadImages(ImageHub.endboss.attacking);
    this.speed = 5;
    this.hitPoints = 400;
    this.animate();
  }

  animate() {
    IntervalHub.startInterval(() => {
      if (this.world && this.world.hadFirstContact && !this.isDead() && !this.isAttacking) {
        if (!this.alarmSoundPlayed) {
          AudioHub.ENDBOSS_START.play();
          this.alarmSoundPlayed = true;
        }
        
        this.moveLeft(this.speed); 
        this.getRealFrame();
      }
    }, 1000 / 60);
    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        if (!this.isDeadAnimationPlaying) {
          this.currentImage = 0;
          this.isDeadAnimationPlaying = true;
        }
        this.playDeadAnimation(ImageHub.endboss.dead);
        let lastIndex = ImageHub.endboss.dead.length - 1;
        if (!this.deadSoundPlayed) {
          AudioHub.playSound(AudioHub.ENDBOSS_DEAD);
        this.deadSoundPlayed = true;
        }
        
        if (this.currentImage === lastIndex) {
          IntervalHub.stopAllIntervals();
          refWinningScreen.classList.remove("d-none");
          AudioHub.stopAll(AudioHub.ENDBOSS_DEAD);
        }
      } else if (this.isHurt()) {
        this.playAnimation(ImageHub.endboss.hurt);
        AudioHub.playSound(AudioHub.ENDBOSS_HIT);
      } else if (this.isAttacking) {
        this.playAnimation(ImageHub.endboss.attacking);
      } else if (this.world && this.world.hadFirstContact) {
        this.playAnimation(ImageHub.endboss.walking);
      } else {
        this.playAnimation(ImageHub.endboss.alert);
      }
    }, 200);
    IntervalHub.startInterval(() => {
      if (this.world && this.world.hadFirstContact && !this.isDead()) {
        this.isAttacking = true;
        setTimeout(() => {
          this.isAttacking = false;
          this.currentImage = 0;
          this.speed += 2;
        }, 1500); 
      }
    }, 4000); 
  }
}
