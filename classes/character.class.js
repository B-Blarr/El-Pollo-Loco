/**
 * The player-controlled character (Pepe).
 * Handles movement, jumping, animations, idle/sleep state, and death.
 */
class Character extends MoveableObject {
  /** @type {number} Rendered height in pixels. */
  height = 520;
  /** @type {number} Rendered width in pixels. */
  width = 250;
  /** @type {number} Initial vertical position on the canvas. */
  y = 326;
  /** @type {number} Horizontal movement speed in pixels per tick. */
  speed = 15;
  /** @type {World} Reference to the game world for keyboard and level access. */
  world;
  /** @type {boolean} Whether the death animation has started. */
  isDying = false;
  /** @type {number} Index of the last frame in the dead animation array. */
  lastDeadIndex = ImageHub.character.dead.length - 1;
  /** @type {string} Path of the last dead animation frame, used to detect animation end. */
  lastPath = ImageHub.character.dead[this.lastDeadIndex];
  /** @type {number} Number of bottles currently collected (0–100, multiples of 10). */
  collectedBottles = 0;
  /** @type {number} Number of coins currently collected (0–100, multiples of 20). */
  collectedCoins = 0;
  /** @type {number} Timestamp (ms) of the last movement input, used for sleep detection. */
  lastMovement = new Date().getTime();

  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 240,
    right: 70,
    bottom: 30,
    left: 50,
  };

  /**
   * Creates the character, loads all animation frames, starts physics and animation loops.
   */
  constructor() {
    super();
    this.loadImage(ImageHub.character.idle[0]);
    this.loadImages(ImageHub.character.idle);
    this.loadImages(ImageHub.character.walking);
    this.loadImages(ImageHub.character.jumping);
    this.loadImages(ImageHub.character.dead);
    this.loadImages(ImageHub.character.hurt);
    this.loadImages(ImageHub.character.sleeping);
    this.applyGravity();
    this.animate();
    this.getRealFrame();
  }

  /**
   * Starts both the movement and animation update loops.
   */
  animate() {
    this.startMovementInterval();
    this.startAnimationInterval();
  }

  /**
   * Starts the movement update loop at 60 fps.
   * Handles directional movement, jumping, and camera tracking.
   */
  startMovementInterval() {
    IntervalHub.startInterval(() => {
      if (this.isDead()) return;
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        AudioHub.CHARACTER_RUN.pause();
      }
      this.checkMoveRight();
      this.checkMoveLeft();
      this.checkJump();
      this.updateCameraPosition();
    }, 1000 / 60);
  }

  /**
   * Starts the animation update loop at ~6.7 fps (every 150 ms).
   * Selects the correct animation based on the current character state.
   */
  startAnimationInterval() {
    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        this.handleDeathAnimation();
      } else if (this.isHurt()) {
        this.handleHurtAnimation();
      } else {
        this.handleMovementOrIdleAnimation();
      }
    }, 150);
  }

  /**
   * Moves the character right and plays the run sound if the right key is pressed.
   */
  checkMoveRight() {
    if (this.canMoveRight()) {
      this.moveRight();
      this.resetSleepTimer();
      AudioHub.CHARACTER_RUN.play();
    }
  }

  /**
   * Moves the character left and plays the run sound if the left key is pressed.
   */
  checkMoveLeft() {
    if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.resetSleepTimer();
      AudioHub.CHARACTER_RUN.play();
    }
  }

  /**
   * Triggers a jump and plays the jump sound if the jump key is pressed and character is grounded.
   */
  checkJump() {
    if (this.canJump()) {
      this.resetSleepTimer();
      AudioHub.playSound(AudioHub.CHARACTER_JUMP);
      this.jump();
    }
  }

  /**
   * Recalculates the hit frame and updates the world camera to follow the character.
   */
  updateCameraPosition() {
    this.getRealFrame();
    this.world.camera_x = Math.min(0, -this.x + 95);
  }

  /**
   * Resets the idle/sleep timer to the current time.
   */
  resetSleepTimer() {
    this.lastMovement = new Date().getTime();
  }

  /**
   * Checks whether the character can move to the right.
   * @returns {boolean} True if the right key is held and the level end has not been reached.
   */
  canMoveRight() {
    return (this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x;
  }

  /**
   * Checks whether the character can move to the left.
   * @returns {boolean} True if the left key is held and the character is not at the left boundary.
   */
  canMoveLeft() {
    return (this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 100;
  }

  /**
   * Checks whether the character can jump.
   * @returns {boolean} True if the space key is pressed and the character is on the ground.
   */
  canJump() {
    return !this.isAboveGround() && this.world.keyboard.SPACE;
  }

  /**
   * Starts the death animation on first call and checks for the game-over condition.
   */
  handleDeathAnimation() {
    if (!this.isDying) {
      this.isDying = true;
      this.currentImage = 0;
      AudioHub.CHARACTER_DEAD.play();
    }
    this.playDeadAnimation(ImageHub.character.dead);
    this.checkGameOverCondition();
  }

  /**
   * Triggers the game-over screen once the death animation has fully played out.
   */
  checkGameOverCondition() {
    if (this.currentImage === this.lastDeadIndex && this.img === this.imageCache[this.lastPath]) {
      IntervalHub.stopAllIntervals();
      refGameOverScreen.classList.remove("d-none");
      AudioHub.stopAll(AudioHub.CHARACTER_DEAD);
      AudioHub.GAME_OVER.play();
    }
  }

  /**
   * Plays the hurt animation and sound.
   */
  handleHurtAnimation() {
    this.playAnimation(ImageHub.character.hurt);
    this.resetSleepTimer();
    AudioHub.CHARACTER_HIT.play();
  }

  /**
   * Selects between jumping, walking, or idle/sleeping animation based on current state.
   */
  handleMovementOrIdleAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(ImageHub.character.jumping);
    } else if (this.isWalking()) {
      this.playAnimation(ImageHub.character.walking);
    } else {
      this.handleIdleState();
    }
  }

  /**
   * Checks whether any directional movement key is currently pressed.
   * @returns {boolean} True if the character is walking.
   */
  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A;
  }

  /**
   * Plays the idle or sleeping animation depending on how long the character has been still.
   * Sleeping starts after 8 seconds of inactivity.
   */
  handleIdleState() {
    let timePassed = (new Date().getTime() - this.lastMovement) / 1000;
    if (timePassed > 8) {
      this.playAnimation(ImageHub.character.sleeping);
      AudioHub.CHARACTER_SLEEP.play();
    } else {
      this.playAnimation(ImageHub.character.idle);
    }
  }
}
