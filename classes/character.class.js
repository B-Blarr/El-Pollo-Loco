class Character extends MoveableObject {
  height = 520;
  width = 250;
  y = 335;
  speed = 10;
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
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.x += this.speed;
        let i = this.currentImage % ImageHub.character.walking.length;
        let path = ImageHub.character.walking[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let i = this.currentImage % ImageHub.character.idle.length;
        let path = ImageHub.character.idle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 300);
  }

  jump() {}
}
