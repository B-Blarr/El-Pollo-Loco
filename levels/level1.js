const level1 = new Level(
[...Array.from({ length: 4 }, () => new Chicken()),
  new Endboss(),
...Array.from({ length: 5 }, () => new BabyChicken()), ],
[new Cloud()],

// [new Endboss()],
[
    new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("./assets/img/5_background/layers/air.png", 1440),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 1440),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 1440),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 1440),

    new BackgroundObject("./assets/img/5_background/layers/air.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 2880),
    new BackgroundObject("./assets/img/5_background/layers/air.png", 4320),
    new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 4320),
    new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 4320),
    new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 4320),
  ],
Array.from({ length: 2 }, () => new BottleInAir()),
Array.from({ length: 3 }, () => new BottleOnGround()),
Array.from({ length: 10 }, () => new Coin()),
);

