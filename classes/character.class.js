class Character extends MoveableObject {
  height = 520;
  width = 250;
  y = 326;
  speed = 25;
  world;
  isDying = false;
  lastDeadIndex = ImageHub.character.dead.length - 1;
  lastPath = ImageHub.character.dead[this.lastDeadIndex];
  collectedBottles = 0;
  collectedCoins = 0;
  lastMovement = new Date().getTime();

  offset = {
    top: 245,
    right: 100,
    bottom: 30,
    left: 90,
  };

  constructor() {
    super().loadImage(ImageHub.character.idle[0]);
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

  // animate() {
  //   IntervalHub.startInterval(() => {
  //     if (this.isDead()) return;
  //     AudioHub.CHARACTER_RUN.pause();
  //     if ((this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x) {
  //       this.lastMovement = new Date().getTime();
  //       this.moveRight();
  //       AudioHub.CHARACTER_RUN.play();
  //     }
  //     if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 100) {
  //       this.lastMovement = new Date().getTime();
  //       this.moveLeft();
  //       this.otherDirection = true;
  //       AudioHub.CHARACTER_RUN.play();
  //     }
  //     if (!this.isAboveGround() && this.world.keyboard.SPACE) {
  //       this.lastMovement = new Date().getTime();
  //       AudioHub.playSound(AudioHub.CHARACTER_JUMP);
  //       this.jump();
  //     }
  //     this.getRealFrame();
  //     this.world.camera_x = -this.x + 95;
  //   }, 1000 / 60);

  //   IntervalHub.startInterval(() => {
  //     let timePassed = new Date().getTime() - this.lastMovement;
  //     timePassed = timePassed / 1000;
  //     if (this.isDead()) {
  //       if (!this.isDying) {
  //         this.isDying = true;
  //         this.currentImage = 0;
  //         AudioHub.CHARACTER_DEAD.play();
  //       }
  //       this.playDeadAnimation(ImageHub.character.dead);
  //       if (this.currentImage === this.lastDeadIndex && this.img === this.imageCache[this.lastPath]) {
  //         IntervalHub.stopAllIntervals();
  //         refGameOverScreen.classList.remove("d-none");
  //         AudioHub.stopAll(AudioHub.CHARACTER_DEAD);
  //         AudioHub.GAME_OVER.play();
  //       }

  //       return;
  //     } else if (this.isHurt()) {
  //       this.playAnimation(ImageHub.character.hurt);
  //       this.lastMovement = new Date().getTime();
  //       AudioHub.CHARACTER_HIT.play();
  //     } else if (this.isAboveGround()) {
  //       this.playAnimation(ImageHub.character.jumping);
  //     } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A) {
  //       this.playAnimation(ImageHub.character.walking);
  //     } else {
  //       if (timePassed > 8) {
  //         this.playAnimation(ImageHub.character.sleeping);
  //         AudioHub.CHARACTER_SLEEP.play();
  //       } else {
  //         this.playAnimation(ImageHub.character.idle);
  //       }
  //     }
  //   }, 150);
  // }

animate() {
  this.startMovementInterval();
  this.startAnimationInterval();
}

startMovementInterval() {
  IntervalHub.startInterval(() => {
    if (this.isDead()) return;
    AudioHub.CHARACTER_RUN.pause();
    this.checkMoveRight();
    this.checkMoveLeft();
    this.checkJump();
    this.updateCameraPosition();
  }, 1000 / 60);
}

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

checkMoveRight() {
  if (this.canMoveRight()) {
    this.moveRight();
    this.resetSleepTimer();
    AudioHub.CHARACTER_RUN.play();
  }
}

checkMoveLeft() {
  if (this.canMoveLeft()) {
    this.moveLeft();
    this.otherDirection = true;
    this.resetSleepTimer();
    AudioHub.CHARACTER_RUN.play();
  }
}

checkJump() {
  if (this.canJump()) {
    this.resetSleepTimer();
    AudioHub.playSound(AudioHub.CHARACTER_JUMP);
    this.jump();
  }
}

updateCameraPosition() {
  this.getRealFrame();
  this.world.camera_x = -this.x + 95;
}

resetSleepTimer() {
  this.lastMovement = new Date().getTime();
}

canMoveRight() {
  return (this.world.keyboard.RIGHT || this.world.keyboard.D) && 
         this.x < this.world.level.level_end_x;
}

canMoveLeft() {
  return (this.world.keyboard.LEFT || this.world.keyboard.A) && 
         this.x > 100;
}

canJump() {
  return !this.isAboveGround() && this.world.keyboard.SPACE;
}
// Animation
handleDeathAnimation() {
  if (!this.isDying) {
    this.isDying = true;
    this.currentImage = 0;
    AudioHub.CHARACTER_DEAD.play();
  }
  this.playDeadAnimation(ImageHub.character.dead);
  this.checkGameOverCondition();
}

checkGameOverCondition() {
  if (this.currentImage === this.lastDeadIndex && this.img === this.imageCache[this.lastPath]) {
    IntervalHub.stopAllIntervals();
    refGameOverScreen.classList.remove("d-none");
    AudioHub.stopAll(AudioHub.CHARACTER_DEAD);
    AudioHub.GAME_OVER.play();
  }
}

handleHurtAnimation() {
  this.playAnimation(ImageHub.character.hurt);
  this.resetSleepTimer();
  AudioHub.CHARACTER_HIT.play();
}

handleMovementOrIdleAnimation() {
  if (this.isAboveGround()) {
    this.playAnimation(ImageHub.character.jumping);
  } else if (this.isWalking()) {
    this.playAnimation(ImageHub.character.walking);
  } else {
    this.handleIdleState();
  }
}

isWalking() {
  return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A;
}

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
