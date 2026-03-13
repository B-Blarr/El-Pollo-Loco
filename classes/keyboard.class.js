/**
 * Tracks the current pressed state of all game-relevant keys.
 * Registers global keydown/keyup listeners on construction.
 */
class Keyboard {
  /** @type {boolean} Whether the left arrow key or 'A' is currently pressed. */
  LEFT = false;
  /** @type {boolean} Whether the right arrow key or 'D' is currently pressed. */
  RIGHT = false;
  /** @type {boolean} Whether the space bar is currently pressed (jump). */
  SPACE = false;
  /** @type {boolean} Whether the 'F' key is currently pressed (throw bottle). */
  F = false;
  /** @type {boolean} Whether the 'W' key is currently pressed (reserved). */
  W = false;
  /** @type {boolean} Whether the 'A' key is currently pressed. */
  A = false;
  /** @type {boolean} Whether the 'S' key is currently pressed (reserved). */
  S = false;
  /** @type {boolean} Whether the 'D' key is currently pressed. */
  D = false;

  /**
   * Creates a Keyboard instance and immediately attaches input event listeners.
   */
  constructor() {
    this.setControls();
  }

  /**
   * Registers keydown and keyup listeners on the window to update key state flags.
   */
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
