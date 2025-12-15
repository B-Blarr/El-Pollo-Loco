class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  gameOver = false;
  collisionIntervalId = null;
  statusBar = new StatusBar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

checkCollisions(){
  this.collisionIntervalId = setInterval(() => {
    if (this.gameOver) return;
    this.level.enemies.forEach((enemy) => {
     if(this.character.isColliding(enemy)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.hitPoints);
      }
     
    });

  }, 200);
}

stopGame() {
  this.gameOver = true;
  if (this.collisionIntervalId) {
    clearInterval(this.collisionIntervalId);
  }
}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    // Space for fixed Objects

    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
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
