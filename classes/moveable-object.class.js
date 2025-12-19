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
  timeOfDeath;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  applyGravity() {
    IntervalHub.startInterval(() => {
      if (this.hasHit) return;
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

  isJumpingOn(moveableObject){
if (!this.isColliding(moveableObject)) {
        return false;
    }
   // 2. Wo sind Pepes Füße?
    let characterFeet = this.rY + this.rHeight;
    // 3. Wo ist der Kopf des Gegners?
    // Wir definieren: Der "Kopf" ist das oberste Viertel (Top 25% der Hitbox)
    // Das ist viel strenger als vorher!
    let enemyHead = moveableObject.rY + (moveableObject.rHeight * 0.25);

    // 4. Der Profi-Check:
    // Sind wir ÜBER dem Kopf? 
    // ODER: Sind wir zwar schon tiefer, aber nur, weil wir so schnell gefallen sind? (-this.speedY ist die Strecke, die wir im letzten Frame zurückgelegt haben)
    let fallingTolerance = -this.speedY; // z.B. 20 Pixel, wenn wir schnell fallen
    return (characterFeet < enemyHead + fallingTolerance);
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
    return timepassed < 0.5;
  }

  isDead() {
    return this.hitPoints == 0;
  }

  objectDisappears(timer){
  if (!this.isDead()) return false;
        if (!this.timeOfDeath) {
            this.timeOfDeath = new Date().getTime();
        }
        let timepassed = new Date().getTime() - this.timeOfDeath;
        return timepassed > timer;
  }
  
  
}
