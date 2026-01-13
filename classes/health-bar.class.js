class HealthBar extends StatusBar {
  percentage = 100;

  constructor() {
    super();
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = ImageHub.statusBar.healthBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
