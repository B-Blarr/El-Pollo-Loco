class ThrowableObject extends MoveableObject{

// speedY = 30;
// speedX = 20;
// width = 180;
// height = 180;
// x;
// y;

offset = {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
  }

constructor(x, y, otherDirection){
    super().loadImage(ImageHub.icon.bottle);
    this.loadImages(ImageHub.bottle.bottleRotation);
    this.animate();
    this.x = x;
    this.y = y + 130;
    this.width = 180;
    this.height = 180;
    this.otherDirection = otherDirection;
    this.throwRight();
    this.throwLeft();
}


throwRight(){
    // this.x = x;
    // this.y = y;
    if (this.otherDirection == false) {
    this.speedY = 30;
    this.applyGravity();
     IntervalHub.startInterval(() => {
    this.x += 10;
    }, 25);
    }
}

throwLeft(){

   if (this.otherDirection == true) {
    this.speedY = 30;
    this.applyGravity();
     IntervalHub.startInterval(() => {
    this.x -= 10;
    }, 25);
   } 
}

animate() {
    IntervalHub.startInterval(() => {
      this.getRealFrame();
    }, 1000 / 60);
    // ,1000 / 60);
    IntervalHub.startInterval(() => {
      this.playAnimation(ImageHub.bottle.bottleRotation);
    }, 150);
    // 150
  }
}