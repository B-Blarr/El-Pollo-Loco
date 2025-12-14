class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

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
  setInterval(() => {
    this.level.enemies.forEach((enemy) => {
     if(this.character.isColliding(enemy)) {
      console.log("Treffer");
      
     }
    });

  }, 200);
}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
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
