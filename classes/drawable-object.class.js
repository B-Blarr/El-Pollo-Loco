class DrawableObject {
  x = 120;
  y = 570;
  height = 300;
  width = 150;
  img;
  imageCache = {};
  currentImage = 0;
  percentage = 100;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

    drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      // ctx.rect(this.x, this.y, this.width, this.height,);
      const frameX = this.x + this.offset.left;
      const frameY = this.y + this.offset.top;
      const frameWidth = this.width - this.offset.left - this.offset.right;
      const frameHeight = this.height - this.offset.top - this.offset.bottom;
      ctx.rect(frameX, frameY, frameWidth, frameHeight);
      ctx.stroke();
    }
  }
}
