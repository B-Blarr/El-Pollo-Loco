let level1;


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

function initLevel() {
level1 = new Level(
  [...Array.from({ length: 9 }, () => new Chicken()), new Endboss(), ...Array.from({ length: 12 }, () => new BabyChicken())],
  [new Cloud()],

  createBackgrounds([0, 1, 0, 1, 0, 1, 0, 1, 0]),
  Array.from({ length: 3 }, () => new BottleInAir()),
  Array.from({ length: 9 }, () => new BottleOnGround()),
  Array.from({ length: 10 }, () => new Coin())
);
}
