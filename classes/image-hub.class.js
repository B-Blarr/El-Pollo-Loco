/**
 * Central repository of all image path arrays used by the game.
 * All properties are static; no instance of this class needs to be created.
 */
class ImageHub {
  /**
   * Background layer image paths organised by tile variant.
   * Each variant is a four-element array: [air, third layer, second layer, first layer].
   * @type {{first: string[], second: string[]}}
   */
  static backgroundObjects = {
    first: [
      "./assets/img/5_background/layers/air.png",
      "./assets/img/5_background/layers/3_third_layer/1.png",
      "./assets/img/5_background/layers/2_second_layer/1.png",
      "./assets/img/5_background/layers/1_first_layer/1.png",
    ],

    second: [
      "./assets/img/5_background/layers/air.png",
      "./assets/img/5_background/layers/3_third_layer/2.png",
      "./assets/img/5_background/layers/2_second_layer/2.png",
      "./assets/img/5_background/layers/1_first_layer/2.png",
    ],
  };

  /**
   * Character (Pepe) animation frame paths grouped by state.
   * @type {{walking: string[], sleeping: string[], idle: string[], jumping: string[], hurt: string[], dead: string[]}}
   */
  static character = {
    walking: [
      "./assets/img/2_character_pepe/2_walk/W-21.png",
      "./assets/img/2_character_pepe/2_walk/W-22.png",
      "./assets/img/2_character_pepe/2_walk/W-23.png",
      "./assets/img/2_character_pepe/2_walk/W-24.png",
      "./assets/img/2_character_pepe/2_walk/W-25.png",
      "./assets/img/2_character_pepe/2_walk/W-26.png",
    ],

    sleeping: [
      "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
      "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ],

    idle: [
      "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
      "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ],

    jumping: [
      "./assets/img/2_character_pepe/3_jump/J-31.png",
      "./assets/img/2_character_pepe/3_jump/J-32.png",
      "./assets/img/2_character_pepe/3_jump/J-33.png",
      "./assets/img/2_character_pepe/3_jump/J-34.png",
      "./assets/img/2_character_pepe/3_jump/J-35.png",
      "./assets/img/2_character_pepe/3_jump/J-36.png",
      "./assets/img/2_character_pepe/3_jump/J-37.png",
      "./assets/img/2_character_pepe/3_jump/J-38.png",
      "./assets/img/2_character_pepe/3_jump/J-39.png",
    ],

    hurt: [
      "./assets/img/2_character_pepe/4_hurt/H-41.png",
      "./assets/img/2_character_pepe/4_hurt/H-42.png",
      "./assets/img/2_character_pepe/4_hurt/H-43.png",
    ],

    dead: [
      "./assets/img/2_character_pepe/5_dead/D-51.png",
      "./assets/img/2_character_pepe/5_dead/D-52.png",
      "./assets/img/2_character_pepe/5_dead/D-53.png",
      "./assets/img/2_character_pepe/5_dead/D-54.png",
      "./assets/img/2_character_pepe/5_dead/D-55.png",
      "./assets/img/2_character_pepe/5_dead/D-56.png",
      "./assets/img/2_character_pepe/5_dead/D-57.png",
    ],
  };

  /**
   * Regular chicken animation frame paths grouped by state.
   * @type {{walking: string[], dead: string[]}}
   */
  static chicken = {
    walking: [
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ],

    dead: ["./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"],
  };

  /**
   * Baby chicken animation frame paths grouped by state.
   * @type {{walking: string[], dead: string[]}}
   */
  static babyChicken = {
    walking: [
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ],

    dead: ["./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"],
  };

  /**
   * Endboss animation frame paths grouped by state.
   * @type {{walking: string[], alert: string[], attacking: string[], hurt: string[], dead: string[]}}
   */
  static endboss = {
    walking: [
      "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
      "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
      "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
      "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ],

    alert: [
      "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
      "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ],

    attacking: [
      "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
      "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ],

    hurt: [
      "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
      "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
      "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ],

    dead: [
      "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
      "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
      "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ],
  };

  /**
   * Status bar image paths grouped by bar type.
   * Each array contains six images ordered from full (index 0) to empty (index 5).
   * @type {{healthBar: string[], healthBarEndboss: string[], bottleBar: string[], coinBar: string[]}}
   */
  static statusBar = {
    healthBar: [
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
      "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    ],

    healthBarEndboss: [
      "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
      "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
      "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
      "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
      "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
      "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    ],

    bottleBar: [
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
      "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    ],

    coinBar: [
      "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
      "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
      "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
      "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
      "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
      "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    ],
  };

  /**
   * Single-image icon paths used as still images throughout the UI.
   * @type {{coin: string[], health: string[], bottle: string[], bottleOnGround: string[]}}
   */
  static icon = {
    coin: ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"],

    health: ["./assets/img/7_statusbars/3_icons/icon_health.png"],

    bottle: ["./assets/img/6_salsa_bottle/salsa_bottle.png"],

    bottleOnGround: ["./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"],
  };

  /**
   * Thrown bottle animation frame paths grouped by animation phase.
   * @type {{bottleRotation: string[], bottleSplash: string[]}}
   */
  static bottle = {
    bottleRotation: [
      "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ],

    bottleSplash: [
      "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ],
  };
}
