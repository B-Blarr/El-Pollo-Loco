class BottleOnGround extends CollectableObject{

offset = {
    top: 25,
    right: 60,
    bottom: 25,
    left: 75,
  };

constructor() {
    super();
    if (Math.random() < 0.5) {
        this.loadImage("./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    }else {
        this.loadImage("./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    }
    
    this.x = 480 + Math.random() * 9500;
    this.y = 700;
    // this.width = 180;
    // this.height = 180;
this.getRealFrame();
}

}