class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/air.png", 1440),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 1440),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 1440),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 1440),
    
    new BackgroundObject("./assets/img/5_background/layers/air.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/air.png", 4320),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 4320),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 4320),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 4320),
  ];
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
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0);
    // draw() wird immer wieder raufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(moveableObject.width, 0);
      this.ctx.scale(-1, 1);
      moveableObject.x = moveableObject.x * -1;
    }
    this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
    if (moveableObject.otherDirection) {
      moveableObject.x = moveableObject.x * -1;
      this.ctx.restore();
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
}
