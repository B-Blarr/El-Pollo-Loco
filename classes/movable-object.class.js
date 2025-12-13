class MoveableObject {
    x = 120;
    y = 570;
    img;
    height = 300;
    width = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image();   // this.img = document.getElementById('image')   <img id='image' scr>
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

        moveRight(){
            console.log('Moving right');
            
        }

        moveLeft(speed){
            setInterval(() => {this.x -= speed}, 1000 / 60);}


        }
