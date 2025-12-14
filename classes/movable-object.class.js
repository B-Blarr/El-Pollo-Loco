class MoveableObject {
  x = 120;
  y = 570;
  img;
  height = 300;
  width = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
//   groundY = 846;

  applyGravity(){
    setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }
    }, 1000 / 75);
  }

  isAboveGround(){
    return this.y < 326;
  }

  // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image')   <img id='image' scr>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx){
   ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
  }

  drawFrame(ctx){
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height,);
    ctx.stroke();
  }

  playWalkingAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playStandingAnimation(images){
    let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
  }

  playJumpingAnimation(images){
    let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
  }

  moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        
  }

  moveLeft() {
    this.x -= this.speed;
    
  
}
  jump(){
    this.speedY = 20;
  }
}
