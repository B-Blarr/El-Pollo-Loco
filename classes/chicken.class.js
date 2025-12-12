class Chicken extends MoveableObject{

     
    
    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 480 + Math.random() * 800;
    }


}