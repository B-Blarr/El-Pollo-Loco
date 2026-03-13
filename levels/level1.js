let level1;

/**
 * Builds an array of layered BackgroundObjects for a given sequence of background IDs.
 * Each index in the order array produces 4 stacked image layers at the corresponding x position.
 * @param {number[]} order - Array of background variant IDs (0-based) defining the tile sequence.
 * @returns {BackgroundObject[]} Flat array of background objects ready to be added to a level.
 */
function createBackgrounds(order) {
  let backgrounds = [];
  const imageWidth = 1440;

  order.forEach((id, index) => {
    let x = imageWidth * index;
    let imgNumber = id + 1;

    backgrounds.push(
      new BackgroundObject("./assets/img/5_background/layers/air.png", x),
      new BackgroundObject(`./assets/img/5_background/layers/3_third_layer/${imgNumber}.png`, x),
      new BackgroundObject(`./assets/img/5_background/layers/2_second_layer/${imgNumber}.png`, x),
      new BackgroundObject(`./assets/img/5_background/layers/1_first_layer/${imgNumber}.png`, x)
    );
  });

  return backgrounds;
}

/**
 * Initialises the global {@link level1} with all enemies, clouds, backgrounds,
 * collectables, and coins for the first (and only) level.
 */
function initLevel() {
  level1 = new Level(
    [...Array.from({ length: 25 }, () => new Chicken()), new Endboss(), ...Array.from({ length: 30 }, () => new BabyChicken())],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],

    createBackgrounds([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]),
    Array.from({ length: 0 }, () => new BottleInAir()),
    Array.from({ length: 15 }, () => new BottleOnGround()),
    Array.from({ length: 20 }, () => new Coin())
  );
}
