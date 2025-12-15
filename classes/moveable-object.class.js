class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  rX;
  rY;
  rWidth;
  rHeight;
  hitPoints = 100;
  lastHit = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 75);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }else{

    return this.y < 326;
  }
  }


  //   playWalkingAnimation(images) {
  //     let i = this.currentImage % images.length;
  //     let path = images[i];
  //     this.img = this.imageCache[path];
  //     this.currentImage++;
  //   }

  //   playStandingAnimation(images) {
  //     let i = this.currentImage % images.length;
  //     let path = images[i];
  //     this.img = this.imageCache[path];
  //     this.currentImage++;
  //   }

  //   playJumpingAnimation(images) {
  //     let i = this.currentImage % images.length;
  //     let path = images[i];
  //     this.img = this.imageCache[path];
  //     this.currentImage++;
  //   }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playDeadAnimation(images) {
    let i = Math.min(this.currentImage, images.length - 1);
    let path = images[i];
    this.img = this.imageCache[path];
    if (this.currentImage < images.length - 1) {
      this.currentImage++;
    }
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }
  jump() {
    this.speedY = 20;
  }

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rWidth = this.width - this.offset.left - this.offset.right;
    this.rHeight = this.height - this.offset.top - this.offset.bottom;
  }

  isColliding(moveableObject) {
    return (
      this.rX + this.rWidth > moveableObject.rX &&
      this.rY + this.rHeight > moveableObject.rY &&
      this.rX < moveableObject.rX + moveableObject.rWidth &&
      this.rY < moveableObject.rY + moveableObject.rHeight
    );
  }

  hit() {
    this.hitPoints -= 5;
    if (this.hitPoints < 0) {
      this.hitPoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.5;
  }

  isDead() {
    return this.hitPoints == 0;
  }
}
