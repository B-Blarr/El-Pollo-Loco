class Chicken extends MoveableObject{

     y = 700;
     height = 140;
     width = 120;
    
    constructor(){
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 480 + Math.random() * 800;
        this.loadImages(ImageHub.chicken.walking);
        this.speed = 0.25 + Math.random() * 0.7;
        this.animate();
    }
    

 animate(){
    this.moveLeft(this.speed);
           setInterval(() => {  
           let i = this.currentImage % ImageHub.chicken.walking.length;   
           let path = ImageHub.chicken.walking[i];
           this.img = this.imageCache[path];     
           this.currentImage++;
           },  150); 
        };
}