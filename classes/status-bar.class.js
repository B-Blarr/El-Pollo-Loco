class StatusBar extends DrawableObject{
  percentage = 100;

  constructor() {
    super();
    this.loadImages(ImageHub.statusBar.healthBar);
    this.x = 40;
    this.y = 0;
    this.width = 400;
    this.height = 100;
    this.setPercentage(100);
  }

  // setPercentage(percentage) {
  //   this.percentage = percentage; // => 0...5
  //   let path = ImageHub.statusBar.healthbar[this.resolveImageIndex()];
  //   this.img = this.imageCache[path];
  // }

resolveImageIndex() {
    if (this.percentage == 100) {
    return 0;
    } else if (this.percentage >= 80) {
    return 1;
    } else if (this.percentage >= 60) {
    return 2;
    } else if (this.percentage >= 40) {
    return 3;
    } else if (this.percentage >= 20) {
    return 4;
    } else {
    return 5;
    }
    }
  }

