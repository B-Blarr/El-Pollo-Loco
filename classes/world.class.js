/**
 * The main game world that orchestrates rendering, collision detection,
 * object management, and the game loop.
 */
class World {
  /** @type {Character} The player character instance. */
  character = new Character();
  /** @type {Level} The active level containing all game objects. */
  level = level1;
  /** @type {HTMLCanvasElement} The canvas element used for rendering. */
  canvas;
  /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
  ctx;
  /** @type {Keyboard} Reference to the keyboard input handler. */
  keyboard;
  /** @type {number} Horizontal camera offset applied during rendering. */
  camera_x = 0;
  /** @type {HealthBar} HUD element showing the character's health. */
  healthBar = new HealthBar();
  /** @type {EndbossHealthBar} HUD element showing the endboss's health. */
  healthBarEndboss = new EndbossHealthBar();
  /** @type {BottleBar} HUD element showing collected bottles. */
  bottleBar = new BottleBar();
  /** @type {CoinBar} HUD element showing collected coins. */
  coinBar = new CoinBar();
  /** @type {number} General-purpose frame counter incremented every second. */
  counter = 0;
  /** @type {ThrowableObject[]} Array of bottles currently in flight. */
  throwableObjects = [];
  /** @type {number} Timestamp (ms) of the last bottle throw, used for throw cooldown. */
  lastThrowTime = 0;
  /** @type {boolean} Whether the character has entered the endboss zone at least once. */
  hadFirstContact = false;

  /**
   * Creates the game world, sets up the canvas context, starts the game loop and rendering.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
   * @param {Keyboard} keyboard - The keyboard input handler instance.
   */
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

  /**
   * Arrow function interval callback that increments the frame counter by 1 each second.
   * @type {function(): void}
   */
  startCounter = () => {
    this.counter++;
  };

  /**
   * Injects a reference to this World into the character and all Endboss enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  /**
   * Starts the main game loop at 60 fps, running all per-frame game logic checks.
   */
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

  /**
   * Handles bottle throwing when the throw key is pressed.
   * Enforces a 1200 ms cooldown and requires at least 10 collected bottles.
   */
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

  /**
   * Checks collisions between the character and all enemies.
   * Handles stomp kills (character jumps on enemy) and damage (enemy touches character).
   */
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

  /**
   * Checks collisions between thrown bottles and enemies, and detects ground impacts.
   * Triggers bottle explosion and plays a break sound on hit.
   */
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

  /**
   * Checks whether the character collects any bottles from both the air and ground lists.
   */
  checkCollectableBottleCollisions() {
    this.level.bottlesInAir = this.checkCollisionsForList(this.level.bottlesInAir);
    this.level.bottlesOnGround = this.checkCollisionsForList(this.level.bottlesOnGround);
  }

  /**
   * Filters a list of collectable bottles, removing those the character has picked up.
   * Bottles are only collected if the character has fewer than 100 bottles.
   * @param {CollectableObject[]} list - The list of collectable bottles to check.
   * @returns {CollectableObject[]} The remaining (uncollected) bottles.
   */
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

  /**
   * Checks whether the character collects any coins.
   * Every 100 coins are converted into 20 hit points (capped at 100).
   */
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

  /**
   * Main render method: clears the canvas, draws all game layers, then schedules the next frame.
   */
  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawFixedObjects();
    this.drawGameContent();
    this.scheduleNextFrame();
  }

  /**
   * Clears the entire canvas to prepare for the next frame.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws scrolling background layers and clouds using the camera offset.
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws fixed HUD elements (health bar, bottle bar, coin bar) that do not scroll.
   */
  drawFixedObjects() {
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.drawEndbossHealthBar();
  }

  /**
   * Draws the endboss health bar once the character has entered the endboss zone.
   */
  drawEndbossHealthBar() {
    if (this.character.x > 16300 || this.hadFirstContact) {
      this.hadFirstContact = true;
      this.addToMap(this.healthBarEndboss);
    }
  }

  /**
   * Draws all world-space game objects (character, enemies, throwables, collectables, coins).
   */
  drawGameContent() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.bottlesInAir);
    this.addObjectsToMap(this.level.bottlesOnGround);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Requests the next animation frame to keep the render loop running.
   */
  scheduleNextFrame() {
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws a single moveable object, flipping the canvas context horizontally if needed.
   * @param {MoveableObject} moveableObject - The object to draw.
   */
  addToMap(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
    // moveableObject.drawFrame(this.ctx);
  }

  /**
   * Draws each object in an array onto the canvas.
   * @param {MoveableObject[]} objects - Array of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Applies a horizontal canvas flip transformation so a mirrored sprite renders correctly.
   * The object's x coordinate is negated to compensate for the translation.
   * @param {MoveableObject} moveableObject - The object whose image should be flipped.
   */
  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  /**
   * Restores the canvas state after a horizontal flip, un-negating the object's x coordinate.
   * @param {MoveableObject} moveableObject - The object whose flip should be reversed.
   */
  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }

  /**
   * Removes dead enemies from the level after their disappear delay has elapsed.
   */
  checkEnemyCleanup() {
    let remainingEnemies = [];
    this.level.enemies.forEach((enemy) => {
      if (!enemy.objectDisappears(500)) {
        remainingEnemies.push(enemy);
      }
    });
    this.level.enemies = remainingEnemies;
  }

  /**
   * Removes exploded throwable bottles from the scene after their disappear delay has elapsed.
   */
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
