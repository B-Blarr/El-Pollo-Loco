class Character extends MoveableObject {
  height = 520;
  width = 250;
  y = 326;
  speed = 25;
  world;
  isDying = false;
  lastDeadIndex = ImageHub.character.dead.length - 1;
  lastPath = ImageHub.character.dead[this.lastDeadIndex];
  collectedBottles = 0;
  collectedCoins = 0;

  offset = {
    top: 245,
    right: 85,
    bottom: 30,
    left: 70,
  };

  // wird immer dann als Erstes automatisch ausgeführt wenn irgendwo ein neues Objekt mit new Character() erstellt wird.
  constructor() {
    super().loadImage(ImageHub.character.idle[0]);
    this.loadImages(ImageHub.character.idle);
    this.loadImages(ImageHub.character.walking);
    this.loadImages(ImageHub.character.jumping);
    this.loadImages(ImageHub.character.dead);
    this.loadImages(ImageHub.character.hurt);
    this.loadImages(ImageHub.character.sleeping);
    this.applyGravity();
    this.animate();
    this.getRealFrame();
  }

  animate() {
    IntervalHub.startInterval(() => {
      if (this.isDead()) return;
      // this.walking_sound.pause();
      if ((this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x) {
        this.moveRight();
        // this.walking_sound.play();
      }
      if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 100) {
        this.moveLeft();
        this.otherDirection = true;
        // this.walking_sound.play();
      }
      if (!this.isAboveGround() && this.world.keyboard.SPACE) {
        this.jump();
      }
      this.getRealFrame();
      this.world.camera_x = -this.x + 95;
    }, 1000 / 60);

    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        if (!this.isDying) {
          this.isDying = true;
          this.currentImage = 0;
        }
        this.playDeadAnimation(ImageHub.character.dead);
        if (this.currentImage === this.lastDeadIndex && this.img === this.imageCache[this.lastPath]) {
          IntervalHub.stopAllIntervals();
        }
        return;
      } else if(this.isHurt()){
        this.playAnimation(ImageHub.character.hurt);
      }
      else if (this.isAboveGround()) {
        this.playAnimation(ImageHub.character.jumping);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A) {
        this.playAnimation(ImageHub.character.walking);
      } else {
        this.playAnimation(ImageHub.character.idle);
      }
    }, 150);
  }
}
