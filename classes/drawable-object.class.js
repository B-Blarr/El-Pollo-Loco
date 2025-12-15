class DrawableObject {
  x = 120;
  y = 570;
  height = 300;
  width = 150;
  img;
  imageCache = {};
  currentImage = 0;

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
}
