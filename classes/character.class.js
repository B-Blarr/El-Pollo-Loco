class Character extends MoveableObject{
        height = 520;
        width = 250;
        y = 335;

        // wird immer dann als Erstes automatisch ausgeführt wenn irgendwo ein neues Objekt mit new Character() erstellt wird.
        constructor(){
          super().loadImage(ImageHub.character.idle[0]);

        }

        jump(){

        }
}