class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  healthBarEndboss = new EndbossHealthBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  counter = 0;
  throwableObjects = [];
  lastThrowTime = 0;
  hadFirstContact = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    IntervalHub.startInterval(this.startCounter, 1000);
    this.run();
  }

  startCounter = () => {
    this.counter++;
  };

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
            enemy.world = this; 
        }
    });
  }

  run() {
    IntervalHub.startInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkThrownBottleCollisions();
      this.checkEnemyCleanup();
      this.checkThrowableObjectsCleanup();
      this.checkCollectableBottleCollisions();
      this.checkCoinCollisions();
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.F) {
      let actualTime = new Date().getTime();
      if (actualTime - this.lastThrowTime > 200 && this.character.collectedBottles >= 20) {
        // let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 80, this.character.otherDirection);
        this.character.collectedBottles -= 20;
        this.bottleBar.setPercentage(this.character.collectedBottles);

        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 80, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.lastThrowTime = actualTime;
        AudioHub.BOTTLE_THROW.play();
      }
    }
  }
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isJumpingOn(enemy)) {
        enemy.hit();
        this.character.jump();
      } else if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead()) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.hitPoints);
      }
    });
  }

  checkThrownBottleCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();

          if (enemy instanceof Endboss) {
            this.healthBarEndboss.setPercentage(enemy.hitPoints / 4);
          }
           if (!bottle.hasHit) {
            AudioHub.playSound(AudioHub.BOTTLE_BREAK);
          }
          bottle.bottleExplodes();
        }
      });
    });
  }

  checkCollectableBottleCollisions() {
    this.level.bottlesInAir = this.checkCollisionsForList(this.level.bottlesInAir);
    this.level.bottlesOnGround = this.checkCollisionsForList(this.level.bottlesOnGround);
  }

  checkCollisionsForList(list) {
    return list.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        // Treffer!
        this.character.collectedBottles += 20;
        this.bottleBar.setPercentage(this.character.collectedBottles);
        AudioHub.playSound(AudioHub.BOTTLE_COLLECTED);
        return false;
      }
      return true;
    });
  }

  // checkCollectableBottleCollisions() {
  //   this.level.bottlesInAir = this.level.bottlesInAir.filter((bottle) => {
  //     if (this.character.isColliding(bottle) || this.character.isColliding(bottle)) {
  //       this.character.collectedBottles += 20;
  //       this.bottleBar.setPercentage(this.character.collectedBottles);
  //       Evtl. Flaschen-Sound abspielen
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  // }

  checkCoinCollisions() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectedCoins += 10;
        this.coinBar.setPercentage(this.character.collectedCoins);
        AudioHub.playSound(AudioHub.COIN_COLLECTED);
        return false;
      } else {
        return true;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    // Space for fixed Objects
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.character.x > 11350 || this.hadFirstContact == true) {
      this.hadFirstContact = true;
      this.addToMap(this.healthBarEndboss);
    }
    this.ctx.translate(this.camera_x, 0);
    try {
      this.addToMap(this.character);
      // if (this.character.x > 4000) {
      // this.ctx.translate(-this.camera_x, 600);
      // this.addToMap(this.healthBarEndboss);
      // this.ctx.translate(this.camera_x, 600);
      // }
      // this.addToMap(this.healthBarEndboss);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.bottlesInAir);
      this.addObjectsToMap(this.level.bottlesOnGround);
      this.addObjectsToMap(this.level.coins);
    } catch (error) {
      console.warn("Error loading image", error);
      console.log("Could not load image,", this.flipImage.src);
    }

    this.ctx.translate(-this.camera_x, 0);
    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    // moveableObject.drawFrame(this.ctx);

    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }

  checkEnemyCleanup() {
    let remainingEnemies = [];
    this.level.enemies.forEach((enemy) => {
      if (!enemy.objectDisappears(500)) {
        remainingEnemies.push(enemy);
      }
    });
    this.level.enemies = remainingEnemies;
  }

  checkThrowableObjectsCleanup() {
    let remainingBottles = [];
    this.throwableObjects.forEach((bottle) => {
      if (!bottle.objectDisappears(200)) {
        remainingBottles.push(bottle);
      }
    });
    this.throwableObjects = remainingBottles;
  }
}
