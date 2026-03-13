/**
 * Utility class for playing audio with readiness checks.
 * Polls the audio element until it is fully loaded before playing.
 */
class AudioError {
  /** @type {HTMLAudioElement} Placeholder audio element (unused). */
  static LONG = new Audio('');

  /**
   * Repeatedly checks every 200 ms until the audio is ready (readyState === 4),
   * then sets its volume to 0.5 and plays it.
   * @param {HTMLAudioElement} sound - The audio element to play.
   */
  static playOne(sound) {
    setInterval(() => {
      if (sound.readyState == 4) {
        console.log("Sound ready");
        sound.volume = 0.5;
        sound.play();
      } else {
        console.log("Sound not ready");
      }
    }, 200);
  }

  /**
   * Pauses the given audio element.
   * @param {HTMLAudioElement} sound - The audio element to stop.
   */
  static stopOne(sound) {
    sound.pause();
  }
}
