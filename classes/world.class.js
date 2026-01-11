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
  ground = 350;

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
      let timePassed = actualTime - this.lastThrowTime; 
      
      let hasCooldownPassed = timePassed > 1200; 
      let hasEnoughBottles = this.character.collectedBottles >= 10;
      if (hasCooldownPassed && hasEnoughBottles) {
        this.character.collectedBottles -= 10;
        this.bottleBar.setPercentage(this.character.collectedBottles);
        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 80, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.lastThrowTime = actualTime;
        AudioHub.BOTTLE_THROW.play();
      }
    }
  }

  checkCollisions() {
    let hasJumped = false;
    this.level.enemies.forEach((enemy) => {
      if (this.character.isJumpingOn(enemy)) {
        enemy.hit();
        this.character.jump();
        hasJumped = true;
      } else if (!hasJumped && this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead()) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.hitPoints);
      }
    });
  }

checkThrownBottleCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasHit) {
          enemy.hit();
          if (enemy instanceof Endboss) {
            this.healthBarEndboss.setPercentage(enemy.hitPoints); 
          }
          if (!bottle.hasHit) {
            AudioHub.playSound(AudioHub.BOTTLE_BREAK);
          }
          bottle.bottleExplodes();
        }
      });
      if (bottle.hitGround() && !bottle.hasHit) {
          AudioHub.playSound(AudioHub.BOTTLE_BREAK);
          bottle.bottleExplodes();
      }

    });
  }

  checkCollectableBottleCollisions() {
    this.level.bottlesInAir = this.checkCollisionsForList(this.level.bottlesInAir);
    this.level.bottlesOnGround = this.checkCollisionsForList(this.level.bottlesOnGround);
  }

  checkCollisionsForList(list) {
    return list.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.collectedBottles < 100) {
            this.character.collectedBottles += 10;
            this.bottleBar.setPercentage(this.character.collectedBottles);
            AudioHub.playSound(AudioHub.BOTTLE_COLLECTED);
            return false; 
        } else {
            return true; 
        }
      }
      return true;
    });
  }

  checkCoinCollisions() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectedCoins += 20; 
        this.coinBar.setPercentage(this.character.collectedCoins);
        AudioHub.playSound(AudioHub.COIN_COLLECTED);
        if (this.character.collectedCoins >= 100) {
            this.character.collectedCoins = 0;
            this.coinBar.setPercentage(0);
            this.character.hitPoints += 20;
            if (this.character.hitPoints > 100) {
                this.character.hitPoints = 100;
            }
            this.healthBar.setPercentage(this.character.hitPoints);
        }
        return false; 
      } else {
        return true;
      }
    });
  }

  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawFixedObjects();
    this.drawGameContent();
    this.scheduleNextFrame();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawFixedObjects() {
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.drawEndbossHealthBar();
  }

  drawEndbossHealthBar() {
    if (this.character.x > 16300 || this.hadFirstContact) {
      this.hadFirstContact = true;
      this.addToMap(this.healthBarEndboss);
    }
  }

  drawGameContent() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottlesInAir);
    this.addObjectsToMap(this.level.bottlesOnGround);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
  }

  scheduleNextFrame() {
    requestAnimationFrame(() => this.draw());
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
