class Endboss extends MoveableObject {
  y = 260;
  height = 640;
  width = 620;
  isDeadAnimationPlaying = false;
  isAttacking = false;
  alarmSoundPlayed = false;
  deadSoundPlayed = false;
  hitSoundPlayed = false;
  moveDirection = "stand";
  speed = 0;
  enrageThreshold = 60;

  offset = {
    top: 150,
    right: 100,
    bottom: 100,
    left: 50,
  };

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

  animate() {
    this.startMovementInterval();
    this.startAnimationInterval();
    this.startBattleLogic();
  }

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

  startBattleLogic() {
    IntervalHub.startInterval(() => {
      if (this.canStartAttack()) {
        this.checkThrowAttack();
        this.decideNextMove();
      }
    }, 1000);
  }

  checkThrowAttack() {
    if (Math.random() < 0.6) {
      this.throwMinion();
      AudioHub.ENDBOSS_SHOOT.play();
    }
  }

  decideNextMove() {
    let isEnraged = this.hitPoints < this.enrageThreshold;
    if (isEnraged) {
      this.makeAngryMove();
    } else {
      this.makeCalmMove();
    }
  }

  makeAngryMove() {
    let action = Math.random();
    if (action < 0.7) {
      this.setMovement("left", 10 + Math.random() * 5, true);
    } else {
      this.setMovement("right", 9, false);
    }
  }

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

  setMovement(direction, speed, isAttacking) {
    this.moveDirection = direction;
    this.speed = speed;
    this.isAttacking = isAttacking;
  }

  startAttackLogicInterval() {
    IntervalHub.startInterval(() => {
      if (this.canStartAttack()) {
        this.triggerAttack();
      }
    }, 4000);
  }

  canMove() {
    return this.world && this.world.hadFirstContact && !this.isDead();
  }

  playAlarmOnce() {
    if (!this.alarmSoundPlayed) {
      AudioHub.BACKGROUND_LEVEL.volume = 0;
      AudioHub.ENDBOSS_START.volume = 1;
      AudioHub.ENDBOSS_START.play();
      AudioHub.BACKGROUND_LEVEL.pause();
      AudioHub.BACKGROUND_ENDBOSS.play();
      this.alarmSoundPlayed = true;
      setTimeout(() => {
        AudioHub.BACKGROUND_LEVEL.volume = 0.2;
      }, 3000);
    }
  }

  handleDeadAnimation() {
    if (!this.isDeadAnimationPlaying) {
      this.currentImage = 0;
      this.isDeadAnimationPlaying = true;
    }
    this.playDeadAnimation(ImageHub.endboss.dead);
    this.playDeadSoundOnce();
    this.checkWinCondition();
  }

  playDeadSoundOnce() {
    if (!this.deadSoundPlayed) {
      AudioHub.BACKGROUND_ENDBOSS.pause();
      AudioHub.playSound(AudioHub.ENDBOSS_DEAD);
      this.deadSoundPlayed = true;
    }
  }

  checkWinCondition() {
    let lastIndex = ImageHub.endboss.dead.length - 1;
    if (this.currentImage === lastIndex) {
      IntervalHub.stopAllIntervals();
      refWinningScreen.classList.remove("d-none");
      AudioHub.stopAll(AudioHub.ENDBOSS_DEAD);
      AudioHub.WINNING.play();
    }
  }

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

  canStartAttack() {
    return this.world && this.world.hadFirstContact && !this.isDead();
  }

  triggerAttack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.finishAttack();
    }, 1500);
  }

  finishAttack() {
    this.isAttacking = false;
    this.currentImage = 0;
    this.speed += 5;
  }

  draw(ctx) {
    if (this.hitPoints < this.enrageThreshold) {
      ctx.filter = "sepia(1) hue-rotate(-50deg) saturate(5)";
    }
    super.draw(ctx);
    ctx.filter = "none";
  }

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
