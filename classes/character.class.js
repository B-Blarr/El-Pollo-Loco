class Character extends MoveableObject {
  height = 520;
  width = 250;
  //   y = 335;
  y = 135;
  speed = 25;
  world;
  moveIntervalId = null;
  animationIntervalId = null;
  isDying = false;

  offset = {
    top: 235,
    right: 80,
    bottom: 30,
    left: 50,
  };

  // wird immer dann als Erstes automatisch ausgeführt wenn irgendwo ein neues Objekt mit new Character() erstellt wird.
  constructor() {
    // super();
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
    this.moveIntervalId = setInterval(() => {
      if (this.isDead()) return;
      // this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        // this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 100) {
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

    this.animationIntervalId = setInterval(() => {
      if (this.isDead()) {
        if (!this.isDying) {
          this.isDying = true;
          this.currentImage = 0;
          clearInterval(this.moveIntervalId);
        }
        this.playDeadAnimation(ImageHub.character.dead);
        const lastDeadIndex = ImageHub.character.dead.length - 1;
        const lastPath = ImageHub.character.dead[lastDeadIndex];

        if (this.currentImage === lastDeadIndex && this.img === this.imageCache[lastPath]) {
          clearInterval(this.animationIntervalId);
        }
        return;
      } else if(this.isHurt()){
        this.playAnimation(ImageHub.character.hurt);
      }
      else if (this.isAboveGround()) {
        this.playAnimation(ImageHub.character.jumping);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(ImageHub.character.walking);
      } else {
        this.playAnimation(ImageHub.character.idle);
      }
    }, 150);
  }
}
