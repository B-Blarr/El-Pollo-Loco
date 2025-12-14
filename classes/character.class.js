class Character extends MoveableObject {
  height = 520;
  width = 250;
  //   y = 335;
  y = 135;
  speed = 25;
  world;



  offset = {
        top: 200, 
        right: 70,
        bottom: 25,
        left: 40
  }

  // wird immer dann als Erstes automatisch ausgeführt wenn irgendwo ein neues Objekt mit new Character() erstellt wird.
  constructor() {
    // super();
    super().loadImage(ImageHub.character.idle[0]);
    this.loadImages(ImageHub.character.idle);
    this.loadImages(ImageHub.character.walking);
    this.loadImages(ImageHub.character.jumping);
    this.applyGravity();
    this.animate();
    this.getRealFrame();
  }

  animate() {
    setInterval(() => {
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

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playJumpingAnimation(ImageHub.character.jumping);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playWalkingAnimation(ImageHub.character.walking);
      } else {
        this.playStandingAnimation(ImageHub.character.idle);
      }
    }, 150);
   }



}
