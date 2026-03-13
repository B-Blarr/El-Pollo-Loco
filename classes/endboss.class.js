/**
 * The final boss enemy (giant chicken).
 * Manages its own AI movement, attack patterns, animations, and audio cues.
 */
class Endboss extends MoveableObject {
  /** @type {number} Initial vertical position on the canvas. */
  y = 260;
  /** @type {number} Rendered height in pixels. */
  height = 640;
  /** @type {number} Rendered width in pixels. */
  width = 620;
  /** @type {boolean} Whether the death animation is currently playing. */
  isDeadAnimationPlaying = false;
  /** @type {boolean} Whether the endboss is currently in an attacking state. */
  isAttacking = false;
  /** @type {boolean} Whether the alarm/approach sound has already been played. */
  alarmSoundPlayed = false;
  /** @type {boolean} Whether the death sound has already been played. */
  deadSoundPlayed = false;
  /** @type {boolean} Whether the hit sound has already been played in the current hurt cycle. */
  hitSoundPlayed = false;
  /** @type {string} Current movement direction: "left", "right", or "stand". */
  moveDirection = "stand";
  /** @type {number} Horizontal movement speed in pixels per tick. */
  speed = 0;
  /** @type {number} Hit-point threshold below which the endboss enters enraged mode. */
  enrageThreshold = 60;

  /**
   * Pixel offsets that define the collision hit box relative to the sprite.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 150,
    right: 100,
    bottom: 100,
    left: 50,
  };

  /**
   * Creates the endboss, loads all animation frames, sets initial position, and starts loops.
   */
  constructor() {
    super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 17300;
    this.loadImages(ImageHub.endboss.walking);
    this.loadImages(ImageHub.endboss.alert);
    this.loadImages(ImageHub.endboss.dead);
    this.loadImages(ImageHub.endboss.hurt);
    this.loadImages(ImageHub.endboss.attacking);
    this.speed = 5;
    this.hitPoints = 100;
    this.animate();
  }

  /**
   * Starts all three endboss loops: movement, animation, and battle logic.
   */
  animate() {
    this.startMovementInterval();
    this.startAnimationInterval();
    this.startBattleLogic();
  }

  /**
   * Starts the animation loop.
   * Doubles the animation speed when the endboss is enraged (below {@link enrageThreshold} hp).
   */
  startAnimationInterval() {
    let animationSpeed = 200;
    IntervalHub.startInterval(() => {
      if (this.hitPoints < this.enrageThreshold) {
        animationSpeed = 100;
      } else {
        animationSpeed = 200;
      }
      if (this.isDead()) {
        this.handleDeadAnimation();
      } else if (this.isHurt()) {
        this.handleHurtAnimation();
      } else {
        this.handleActiveAnimation();
      }
    }, animationSpeed);
  }

  /**
   * Starts the movement loop at 60 fps.
   * Moves the endboss left or right according to {@link moveDirection} once first contact is made.
   */
  startMovementInterval() {
    IntervalHub.startInterval(() => {
      if (this.canMove()) {
        this.playAlarmOnce();
        if (this.moveDirection === "left") {
          this.moveLeft();
          this.otherDirection = false;
        } else if (this.moveDirection === "right" && this.x < 17900) {
          this.moveRight();
          this.otherDirection = true;
        }
        this.getRealFrame();
      }
    }, 1000 / 60);
  }

  /**
   * Starts the battle logic loop that runs once per second.
   * Randomly decides whether to throw a minion and what move to make next.
   */
  startBattleLogic() {
    IntervalHub.startInterval(() => {
      if (this.canStartAttack()) {
        this.checkThrowAttack();
        this.decideNextMove();
      }
    }, 1000);
  }

  /**
   * With 60% probability, throws a baby chicken minion and plays the shoot sound.
   */
  checkThrowAttack() {
    if (Math.random() < 0.6) {
      this.throwMinion();
      AudioHub.ENDBOSS_SHOOT.play();
    }
  }

  /**
   * Decides the next movement pattern based on whether the endboss is enraged.
   */
  decideNextMove() {
    let isEnraged = this.hitPoints < this.enrageThreshold;
    if (isEnraged) {
      this.makeAngryMove();
    } else {
      this.makeCalmMove();
    }
  }

  /**
   * Selects an aggressive movement pattern used when the endboss is enraged.
   * Heavily favours charging left at high speed.
   */
  makeAngryMove() {
    let action = Math.random();
    if (action < 0.7) {
      this.setMovement("left", 10 + Math.random() * 5, true);
    } else {
      this.setMovement("right", 9, false);
    }
  }

  /**
   * Selects a calmer movement pattern used when the endboss is at or above the enrage threshold.
   * Can move left, right, or stand still.
   */
  makeCalmMove() {
    let action = Math.random();
    if (action < 0.5) {
      this.setMovement("left", 8 + Math.random() * 5, true);
    } else if (action < 0.8) {
      this.setMovement("right", 4, false);
    } else {
      this.setMovement("stand", 0, false);
    }
  }

  /**
   * Applies a new movement configuration to the endboss.
   * @param {string} direction - Movement direction: "left", "right", or "stand".
   * @param {number} speed - New horizontal speed in pixels per tick.
   * @param {boolean} isAttacking - Whether to mark the endboss as attacking.
   */
  setMovement(direction, speed, isAttacking) {
    this.moveDirection = direction;
    this.speed = speed;
    this.isAttacking = isAttacking;
  }

  /**
   * Starts a secondary attack logic interval that fires every 4 seconds.
   */
  startAttackLogicInterval() {
    IntervalHub.startInterval(() => {
      if (this.canStartAttack()) {
        this.triggerAttack();
      }
    }, 4000);
  }

  /**
   * Checks whether the endboss is allowed to move (world set, first contact made, not dead).
   * @returns {boolean} True if the endboss can move.
   */
  canMove() {
    return this.world && this.world.hadFirstContact && !this.isDead();
  }

  /**
   * Plays the alarm sound and switches background music to the endboss track exactly once.
   * Does nothing if already played or if sound is muted.
   */
  playAlarmOnce() {
    if (!this.alarmSoundPlayed && !AudioHub.muteSound) {
      AudioHub.BACKGROUND_LEVEL.volume = 0;
      AudioHub.BACKGROUND_LEVEL.pause();
      AudioHub.ENDBOSS_START.volume = 1;
      AudioHub.ENDBOSS_START.play();
      AudioHub.ENDBOSS_START.addEventListener("ended", () => {
        AudioHub.BACKGROUND_ENDBOSS.play();
      }, { once: true });
      this.alarmSoundPlayed = true;
    }
  }

  /**
   * Resets the animation frame counter on first call and plays the dead animation.
   * Also plays the death sound and checks the win condition.
   */
  handleDeadAnimation() {
    if (!this.isDeadAnimationPlaying) {
      this.currentImage = 0;
      this.isDeadAnimationPlaying = true;
    }
    this.playDeadAnimation(ImageHub.endboss.dead);
    this.playDeadSoundOnce();
    this.checkWinCondition();
  }

  /**
   * Plays the endboss death sound exactly once and pauses the endboss background music.
   */
  playDeadSoundOnce() {
    if (!this.deadSoundPlayed) {
      AudioHub.BACKGROUND_ENDBOSS.pause();
      AudioHub.playSound(AudioHub.ENDBOSS_DEAD);
      this.deadSoundPlayed = true;
    }
  }

  /**
   * Shows the winning screen once the dead animation has reached its last frame.
   */
  checkWinCondition() {
    let lastIndex = ImageHub.endboss.dead.length - 1;
    if (this.currentImage === lastIndex) {
      IntervalHub.stopAllIntervals();
      refWinningScreen.classList.remove("d-none");
      AudioHub.stopAll(AudioHub.ENDBOSS_DEAD);
      AudioHub.WINNING.play();
    }
  }

  /**
   * Plays the hurt animation and sound, then decides whether to flee or charge.
   */
  handleHurtAnimation() {
    this.playAnimation(ImageHub.endboss.hurt);
    if (!this.hitSoundPlayed) {
      AudioHub.ENDBOSS_HIT.play();
      this.hitSoundPlayed = true;
      let flightChance = Math.random() < 0.5;
      let canFleeRight = this.x < 17900;
      if (flightChance && canFleeRight) {
        this.moveDirection = "right";
        this.speed = 10;
        this.isAttacking = false;
      } else {
        this.moveDirection = "left";
        this.speed = 15;
        this.isAttacking = true;
      }
    }
  }

  /**
   * Plays the alert animation before first contact, or the walking/alert animation during battle.
   * Also resets the hit sound flag so it can fire again on the next hit.
   */
  handleActiveAnimation() {
    this.hitSoundPlayed = false;
    if (this.world && !this.world.hadFirstContact) {
      this.playAnimation(ImageHub.endboss.alert);
      return;
    }
    if (this.moveDirection === "stand") {
      this.playAnimation(ImageHub.endboss.alert);
    } else {
      this.playAnimation(ImageHub.endboss.walking);
    }
  }

  /**
   * Checks whether the endboss is ready to start an attack (world set, first contact, not dead).
   * @returns {boolean} True if the endboss can start an attack.
   */
  canStartAttack() {
    return this.world && this.world.hadFirstContact && !this.isDead();
  }

  /**
   * Sets the attacking flag and schedules it to be cleared after 1500 ms.
   */
  triggerAttack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.finishAttack();
    }, 1500);
  }

  /**
   * Ends the current attack, resets the animation frame, and increases movement speed.
   */
  finishAttack() {
    this.isAttacking = false;
    this.currentImage = 0;
    this.speed += 5;
  }

  /**
   * Draws the endboss with a red tint filter when enraged, then calls the parent draw method.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (this.hitPoints < this.enrageThreshold) {
      ctx.filter = "sepia(1) hue-rotate(-50deg) saturate(5)";
    }
    super.draw(ctx);
    ctx.filter = "none";
  }

  /**
   * Spawns a BabyChicken minion near the endboss and adds it to the level's enemy list.
   */
  throwMinion() {
    let minion = new BabyChicken();
    minion.x = this.x - 50;
    minion.y = 500 + Math.random() * 300;
    minion.speed = 10 + Math.random() * 5;
    minion.applyGravity = function () {};
    if (this.world && this.world.level) {
      this.world.level.enemies.push(minion);
    }
  }
}
