class BackgroundObject extends MoveableObject{
    
    width = 1440;
    height = 800;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
    }


}