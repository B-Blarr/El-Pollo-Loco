/**
 * Central audio manager for the game.
 * All sound assets are stored as static properties.
 * Provides static methods for volume control, muting, and playing sounds.
 */
class AudioHub {
  /** @type {HTMLAudioElement} Character running footstep loop. */
  static CHARACTER_RUN = new Audio("audio/sounds/character/characterRun.mp3");
  /** @type {HTMLAudioElement} Sound played when the character is hit. */
  static CHARACTER_HIT = new Audio("audio/sounds/character/charakterHit5.mp3");
  /** @type {HTMLAudioElement} Sound played when the character dies. */
  static CHARACTER_DEAD = new Audio("audio/sounds/character/characterDead.wav");
  /** @type {HTMLAudioElement} Sound played when the character jumps. */
  static CHARACTER_JUMP = new Audio("audio/sounds/character/jump4.mp3");
  /** @type {HTMLAudioElement} Snoring sound played while the character sleeps. */
  static CHARACTER_SLEEP = new Audio("audio/sounds/character/characterSnoring.mp3");
  /** @type {HTMLAudioElement} Sound played when a bottle is collected. */
  static BOTTLE_COLLECTED = new Audio("audio/sounds/collectibles/bottleCollectSound.wav");
  /** @type {HTMLAudioElement} Sound played when a coin is collected. */
  static COIN_COLLECTED = new Audio("audio/sounds/collectibles/collectSound.wav");
  /** @type {HTMLAudioElement} Sound played when a baby chicken dies. */
  static BABY_CHICKEN_DEAD = new Audio("audio/sounds/chicken/babyChickenDied.mp3");
  /** @type {HTMLAudioElement} Sound played when a regular chicken dies. */
  static CHICKEN_DEAD = new Audio("audio/sounds/chicken/chickenDead2.mp3");
  /** @type {HTMLAudioElement} Endboss approach/alarm sound. */
  static ENDBOSS_START = new Audio("audio/sounds/endboss/endbossApproach.wav");
  /** @type {HTMLAudioElement} Sound played when the endboss dies. */
  static ENDBOSS_DEAD = new Audio("audio/sounds/endboss/endbossDied.mp3");
  /** @type {HTMLAudioElement} Sound played when the endboss is hit. */
  static ENDBOSS_HIT = new Audio("audio/sounds/endboss/endbossHit.mp3");
  /** @type {HTMLAudioElement} Sound played when a thrown bottle breaks. */
  static BOTTLE_BREAK = new Audio("audio/sounds/throwable/bottleBreak.mp3");
  /** @type {HTMLAudioElement} Jingle played at the start of a game. */
  static GAME_START = new Audio("audio/sounds/game/gameStart.mp3");
  /** @type {HTMLAudioElement} Background music loop for the start screen. */
  static BACKGROUND_STARTSCREEN = new Audio("audio/sounds/game/backgroundStart.mp3");
  /** @type {HTMLAudioElement} Background music loop for the main level. */
  static BACKGROUND_LEVEL = new Audio("audio/sounds/game/background5.mp3");
  /** @type {HTMLAudioElement} Sound played when a bottle is thrown. */
  static BOTTLE_THROW = new Audio("audio/sounds/throwable/bottleThrow.mp3");
  /** @type {HTMLAudioElement} Victory jingle played when the player wins. */
  static WINNING = new Audio("audio/sounds/game/Winning.mp3");
  /** @type {HTMLAudioElement} Game-over jingle played when the player loses. */
  static GAME_OVER = new Audio("audio/sounds/game/gameOver.mp3");
  /** @type {HTMLAudioElement} Sound played when the endboss throws a minion. */
  static ENDBOSS_SHOOT = new Audio("audio/sounds/endboss/babyChickenThrow.mp3");
  /** @type {HTMLAudioElement} Background music loop for the endboss fight. */
  static BACKGROUND_ENDBOSS = new Audio("audio/sounds/game/endboss_music.mp3");

  /** @type {boolean} Global mute flag; when true all sounds have volume 0. */
  static muteSound = false;

  /**
   * Array containing every managed sound, used for bulk operations like stopAll and mute.
   * @type {HTMLAudioElement[]}
   */
  static allSounds = [
    AudioHub.CHARACTER_RUN,
    AudioHub.CHARACTER_HIT,
    AudioHub.CHARACTER_DEAD,
    AudioHub.CHARACTER_JUMP,
    AudioHub.CHARACTER_SLEEP,
    AudioHub.BOTTLE_COLLECTED,
    AudioHub.COIN_COLLECTED,
    AudioHub.BABY_CHICKEN_DEAD,
    AudioHub.CHICKEN_DEAD,
    AudioHub.ENDBOSS_START,
    AudioHub.ENDBOSS_DEAD,
    AudioHub.ENDBOSS_HIT,
    AudioHub.BOTTLE_BREAK,
    AudioHub.GAME_START,
    AudioHub.BACKGROUND_STARTSCREEN,
    AudioHub.BACKGROUND_LEVEL,
    AudioHub.BOTTLE_THROW,
    AudioHub.WINNING,
    AudioHub.GAME_OVER,
    AudioHub.ENDBOSS_SHOOT,
    AudioHub.BACKGROUND_ENDBOSS,
  ];

  /**
   * Subset of {@link allSounds} containing only background music tracks.
   * Used for independent music volume control.
   * @type {HTMLAudioElement[]}
   */
  static musicSounds = [
    AudioHub.BACKGROUND_LEVEL,
    AudioHub.BACKGROUND_STARTSCREEN,
    AudioHub.WINNING,
    AudioHub.GAME_OVER,
    AudioHub.GAME_START,
    AudioHub.BACKGROUND_ENDBOSS,
  ];

  /**
   * Subset of {@link allSounds} containing only sound-effect tracks.
   * Used for independent SFX volume control.
   * @type {HTMLAudioElement[]}
   */
  static sfxSounds = [
    AudioHub.CHARACTER_RUN,
    AudioHub.CHARACTER_HIT,
    AudioHub.CHARACTER_DEAD,
    AudioHub.CHARACTER_JUMP,
    AudioHub.CHARACTER_SLEEP,
    AudioHub.BOTTLE_COLLECTED,
    AudioHub.COIN_COLLECTED,
    AudioHub.BABY_CHICKEN_DEAD,
    AudioHub.CHICKEN_DEAD,
    AudioHub.ENDBOSS_START,
    AudioHub.ENDBOSS_DEAD,
    AudioHub.ENDBOSS_HIT,
    AudioHub.BOTTLE_BREAK,
    AudioHub.BOTTLE_THROW,
    AudioHub.ENDBOSS_SHOOT,
  ];

  /**
   * Reads the music volume slider and applies it to all {@link musicSounds}.
   * Persists the chosen volume to localStorage.
   */
  static changeMusicVolume() {
    let volume = document.getElementById("music-volume").value;
    AudioHub.musicSounds.forEach((sound) => {
      sound.volume = volume;
    });
    localStorage.setItem("musicVolume", volume);
  }

  /**
   * Reads the SFX volume slider and applies it to all {@link sfxSounds}.
   * Persists the chosen volume to localStorage.
   */
  static changeSfxVolume() {
    let volume = document.getElementById("sfx-volume").value;
    AudioHub.sfxSounds.forEach((sound) => {
      sound.volume = volume;
    });
    localStorage.setItem("sfxVolume", volume);
  }

  /**
   * Plays a one-shot clone of the given audio element at the same volume.
   * Cloning avoids interrupting the same sound if it is already playing.
   * @param {HTMLAudioElement} audio - The audio element to clone and play.
   */
  static playSound(audio) {
    let clone = audio.cloneNode();
    clone.volume = audio.volume;
    clone.play();
  }

  /**
   * Pauses all sounds except an optional excluded one.
   * @param {HTMLAudioElement|null} [exception=null] - A sound to leave untouched.
   */
  static stopAll(exception = null) {
    AudioHub.allSounds.forEach((sound) => {
      if (sound !== exception) {
        sound.pause();
      }
    });
  }

  /**
   * Sets the volume of every sound to 0 and marks the audio as muted.
   * Persists the mute state to localStorage.
   */
  static mute() {
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = 0;
    });
    AudioHub.muteSound = true;
    AudioHub.saveMuteState();
  }

  /**
   * Persists the current {@link muteSound} flag to localStorage.
   */
  static saveMuteState() {
    localStorage.setItem("soundMuted", AudioHub.muteSound);
  }

  /**
   * Restores volume settings from localStorage on page load.
   * Applies saved music and SFX volumes, or re-mutes all sounds if the mute flag was saved.
   */
  static loadMuteState() {
    let savedMusicVol = localStorage.getItem("musicVolume");
    let savedSfxVol = localStorage.getItem("sfxVolume");
    if (savedMusicVol !== null) {
      let musicSlider = document.getElementById("music-volume");
      if (musicSlider) musicSlider.value = savedMusicVol;
    }
    if (savedSfxVol !== null) {
      let sfxSlider = document.getElementById("sfx-volume");
      if (sfxSlider) sfxSlider.value = savedSfxVol;
    }
    let savedSound = localStorage.getItem("soundMuted");
    if (savedSound === "true") {
      AudioHub.muteSound = true;
      AudioHub.allSounds.forEach((s) => (s.volume = 0));
    } else {
      AudioHub.muteSound = false;
      AudioHub.changeMusicVolume();
      AudioHub.changeSfxVolume();
    }
  }

  /**
   * Restores volume to the slider-defined levels and clears the mute flag.
   * Persists the updated mute state to localStorage.
   */
  static unmute() {
    AudioHub.changeMusicVolume();
    AudioHub.changeSfxVolume();

    AudioHub.muteSound = false;
    AudioHub.saveMuteState();
  }
}
