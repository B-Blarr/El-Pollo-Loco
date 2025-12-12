class Cloud extends MoveableObject {
  width = 600;
  height = 400;

  constructor() {
    super().loadImage("../assets/img/5_background/layers/4_clouds/1.png");
    this.x = 480 + Math.random() * 800;
    this.y = 50;
  }
}
