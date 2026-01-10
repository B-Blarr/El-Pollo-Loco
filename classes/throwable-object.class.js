class ThrowableObject extends MoveableObject {
  // speedY = 30;
  // speedX = 20;
  // width = 180;
  // height = 180;
  // x;
  // y;
  hasHit;
  ground = 700;

  offset = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  };

  constructor(x, y, otherDirection) {
    super().loadImage(ImageHub.icon.bottle);
    this.loadImages(ImageHub.bottle.bottleRotation);
    this.loadImages(ImageHub.bottle.bottleSplash);
    this.animate();
    // this.acceleration = 1.5;
    this.x = x;
    this.y = y + 130;
    this.width = 180;
    this.height = 180;
    this.hasHit = false;
    this.otherDirection = otherDirection;
    this.throwRight();
    this.throwLeft();
  }

  throwRight() {
    if (this.hasHit == true) {
      return;
    } else {
      if (this.otherDirection == false) {
        this.speedY = 20;
        this.applyGravity();
        IntervalHub.startInterval(() => {
          if (this.hasHit) return;
          this.x += 20;
        }, 25);
      }
    }
  }

  throwLeft() {
    if (this.hasHit == true) {
      return;
    } else {
      if (this.otherDirection == true) {
        this.speedY = 20;
        this.applyGravity();
        IntervalHub.startInterval(() => {
          if (this.hasHit) return;
          this.x -= 20;
        }, 25);
      }
    }
  }

  animate() {
    IntervalHub.startInterval(() => {
      this.getRealFrame();
    }, 1000 / 60);
    IntervalHub.startInterval(() => {
      if (this.hasHit == true) {
        this.playDeadAnimation(ImageHub.bottle.bottleSplash);
      } else {
        this.playAnimation(ImageHub.bottle.bottleRotation);
      }
    }, 150);
  }

  bottleExplodes() {
    this.hasHit = true;
    this.hitPoints = 0;
    this.speedY = 0;
    this.speedX = 0;
    return this.hasHit;
  }

  hitGround() {
    if (this.y >= this.ground) {
      //
      return true;
    } else {
      return false;
    }
  }
}
