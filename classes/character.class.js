class Character extends MoveableObject {
  height = 520;
  width = 250;
  y = 335;
  speed = 20;
  world;

  // wird immer dann als Erstes automatisch ausgeführt wenn irgendwo ein neues Objekt mit new Character() erstellt wird.
  constructor() {
    // super();
    super().loadImage(ImageHub.character.idle[0]);
    this.loadImages(ImageHub.character.idle);
    this.loadImages(ImageHub.character.walking);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 100) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playWalkingAnimation(ImageHub.character.walking);
        // let i = this.currentImage % ImageHub.character.walking.length;
        // let path = ImageHub.character.walking[i];
        // this.img = this.imageCache[path];
        // this.currentImage++;
      } else {
        this.playStandingAnimation(ImageHub.character.idle);
        // let i = this.currentImage % ImageHub.character.idle.length;
        // let path = ImageHub.character.idle[i];
        // this.img = this.imageCache[path];
        // this.currentImage++;
      }
    }, 300);
  }

  jump() {}
}
