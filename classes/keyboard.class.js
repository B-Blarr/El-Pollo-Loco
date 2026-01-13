class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  F = false;
  W = false;
  A = false;
  S = false;
  D = false;

  constructor() {
    this.setControls();
  }

  setControls() {
    window.addEventListener("keydown", (event) => {
      if (event.key == " ") {
        keyboard.SPACE = true;
      }
      if (event.key == "ArrowLeft" || event.key == "a") {
        keyboard.LEFT = true;
      }
      if (event.key == "ArrowRight" || event.key == "d") {
        keyboard.RIGHT = true;
      }
      if (event.key == "f") {
        keyboard.F = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.key == " ") {
        keyboard.SPACE = false;
      }
      if (event.key == "ArrowLeft" || event.key == "a") {
        keyboard.LEFT = false;
      }
      if (event.key == "ArrowRight" || event.key == "d") {
        keyboard.RIGHT = false;
      }
      if (event.key == "f") {
        keyboard.F = false;
      }
    });
  }
}
