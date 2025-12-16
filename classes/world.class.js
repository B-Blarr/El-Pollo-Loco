class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  // gameOver = false;
  // collisionIntervalId = null;
  statusBar = new StatusBar();
  counter = 0;
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    IntervalHub.startInterval(this.startCounter, 1000);
    this.run();
  }

  startCounter = () => {
    this.counter++;
    
  }

  setWorld() {
    this.character.world = this;
  }

run(){
IntervalHub.startInterval(() => {
  this.checkCollisions();
  this.checkThrowObjects();
  }, 200);
}

checkThrowObjects(){
if (this.keyboard.F) {
  let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
  this.throwableObjects.push(bottle);
}

}

checkCollisions(){

    // if (this.gameOver) return;
    this.level.enemies.forEach((enemy) => {
     if(this.character.isColliding(enemy)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.hitPoints);
      }
     
    });
}

// stopGame() {
//   this.gameOver = true;
//   if (this.collisionIntervalId) {
//     clearInterval(this.collisionIntervalId);
//   }
// }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    // Space for fixed Objects

    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    try {
      this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    } catch (error) {
      console.warn("Error loading image", error)
      console.log("Could not load image,", this.flipImage.src );
      
    }
    
    this.ctx.translate(-this.camera_x, 0);
    // draw() wird immer wieder raufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    moveableObject.drawFrame(this.ctx);

    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
  }
}
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

flipImage(moveableObject){
      this.ctx.save();
      this.ctx.translate(moveableObject.width, 0);
      this.ctx.scale(-1, 1);
      moveableObject.x = moveableObject.x * -1;
}

flipImageBack(moveableObject){
moveableObject.x = moveableObject.x * -1;
      this.ctx.restore();
    }
}
