class Endboss extends MoveableObject {
  y = 260;
  height = 640;
  width = 620;
  isDeadAnimationPlaying = false;
  isAttacking = false;
  alarmSoundPlayed = false;
  deadSoundPlayed = false;
  hitSoundPlayed = false;
  moveDirection = 'stand'; 
  speed = 0;

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
    this.hitPoints = 400;
    this.animate();
  }

animate() {
  this.startMovementInterval();
  this.startAnimationInterval();
  // this.startAttackLogicInterval();
  this.startBattleLogic();
}

// startMovementInterval() {
//   IntervalHub.startInterval(() => {
//     if (this.canMove()) {
//       this.playAlarmOnce();
//       this.moveLeft(this.speed);
//       this.getRealFrame();
//     }
//   }, 1000 / 60);
// }

// startAnimationInterval() {
//   IntervalHub.startInterval(() => {
//     if (this.isDead()) {
//       this.handleDeadAnimation();
//     } else if (this.isHurt()) {
//       this.handleHurtAnimation();
//     } else {
//       this.handleActiveAnimation();
//     }
//   }, 200);
// }

startAnimationInterval() {
    // Wir nutzen eine Variable für die Geschwindigkeit
    let animationSpeed = 200; 

    IntervalHub.startInterval(() => {
        // Wenn wütend, spielen wir die Bilder schneller ab (z.B. 100ms statt 200ms)
        // Das lässt ihn hektischer wirken.
        if (this.hitPoints < 200) {
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
    }, animationSpeed); // Achtung: IntervalHub unterstützt variable Zeiten oft nicht direkt im laufenden Interval. 
    // Falls deine IntervalHub-Klasse feste Zeiten braucht, lass diesen Schritt weg 
    // und bleib bei der Logik in Schritt 1. Das reicht für den Anfang!
}

startMovementInterval() {
    IntervalHub.startInterval(() => {
      if (this.canMove()) {
        this.playAlarmOnce();
        if (this.moveDirection === 'left') {
            this.moveLeft();
            this.otherDirection = false;
        } else if (this.moveDirection === 'right' && this.x < 17900) {
            this.moveRight();
            this.otherDirection = true; 
        } 
        this.getRealFrame();
      }
    }, 1000 / 60);
  }

  // startBattleLogic() {
  //   IntervalHub.startInterval(() => {
  //       if (this.canStartAttack()) {
  //           let action = Math.random(); 
  //           if (action < 0.5) {

  //               this.moveDirection = 'left';
  //               this.speed = 8 + Math.random() * 5; 
  //               this.isAttacking = true;
  //           } 
  //           else if (action < 0.8) {
  //               this.moveDirection = 'right';
  //               this.speed = 4; 
  //               this.isAttacking = false;
  //           } 
  //           else {
  //               this.moveDirection = 'stand';
  //               this.speed = 0;
  //               this.isAttacking = false;
  //           }
  //       }
  //   }, 1500); 
  // }

  startBattleLogic() {
    IntervalHub.startInterval(() => {
        if (this.canStartAttack()) {
            // 1. Prüfen: Ist der Boss wütend? (Unter 50% Leben)
            let isEnraged = this.hitPoints < 200; 
            let action = Math.random(); 
            if (isEnraged) {
                if (action < 0.7) {
                    this.moveDirection = 'left';
                    this.speed = 10 + Math.random() * 5; 
                    this.isAttacking = true;
                } else {
                    this.moveDirection = 'right';
                    this.speed = 9; 
                    this.isAttacking = false;
                }
            } 
            else {
                if (action < 0.5) {
                    this.moveDirection = 'left';
                    this.speed = 8 + Math.random() * 5; 
                    this.isAttacking = true;
                } 
                else if (action < 0.8) {
                    this.moveDirection = 'right';
                    this.speed = 4; 
                    this.isAttacking = false;
                } 
                else {
                    this.moveDirection = 'stand';
                    this.speed = 0;
                    this.isAttacking = false;
                }
            }
        }
    }, 1500); 
  }

startAttackLogicInterval() {
  IntervalHub.startInterval(() => {
    if (this.canStartAttack()) {
      this.triggerAttack();
    }
  }, 4000);
}

canMove() {
  return this.world && 
         this.world.hadFirstContact && 
         !this.isDead();
        //  !this.isAttacking;
}

playAlarmOnce() {
  if (!this.alarmSoundPlayed) {
    AudioHub.BACKGROUND_LEVEL.volume = 0;
    AudioHub.ENDBOSS_START.volume = 1;
    AudioHub.ENDBOSS_START.play();
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
         this.moveDirection = 'right';
         this.speed = 10; 
         this.isAttacking = false;
      } else {
         this.moveDirection = 'left';
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
    if (this.moveDirection === 'stand') {
        this.playAnimation(ImageHub.endboss.alert);
    } 
    else {
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
  this.speed += 5; // Boss wird schneller nach jedem Angriff
}

  draw(ctx) {
    if (this.hitPoints < 200) {
        ctx.filter = 'sepia(1) hue-rotate(-50deg) saturate(5)'; 
    }
    super.draw(ctx);
    ctx.filter = 'none';
  }

}


