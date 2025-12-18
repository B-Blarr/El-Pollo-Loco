class BottleInAir extends CollectableObject{


offset = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  };


constructor(){
super().loadImage("./assets/img/6_salsa_bottle/salsa_bottle.png");
    this.x = 480 + Math.random() * 1800;
    this.y = 500 - Math.random() * 250;
    this.width = 180;
    this.height = 180;
this.getRealFrame();
}
}