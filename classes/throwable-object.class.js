class ThrowableObject extends MoveableObject{

// speedY = 30;
// speedX = 20;
// width = 180;
// height = 180;

constructor(x, y){
    super().loadImage(ImageHub.icon.bottle);
    this.x = x;
    this.y = y;
    this.width = 180;
    this.height = 180;
    this.throw();
}


throw(){
    // this.x = x;
    // this.y = y;
    this.speedY = 30;
    this.applyGravity();
     IntervalHub.startInterval(() => {
    this.x += 10;
    }, 25);
}

}