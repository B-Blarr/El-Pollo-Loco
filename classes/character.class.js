class Character extends MoveableObject{
        height = 520;
        width = 250;
        y = 335;

        // wird immer dann als Erstes automatisch ausgeführt wenn irgendwo ein neues Objekt mit new Character() erstellt wird.
        constructor(){
                // super();
          super().loadImage(ImageHub.character.idle[0]);
          this.loadImages(ImageHub.character.idle);

          this.animate();
        }

        animate(){
           setInterval(() => {  
           let i = this.currentImage % ImageHub.character.idle.length;   
           let path = ImageHub.character.idle[i];
           this.img = this.imageCache[path];     
           this.currentImage++;
           },  150); 
        };


        jump(){

        }
}