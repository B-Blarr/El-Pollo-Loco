/**
 * Central manager for all game intervals.
 * Stores every active interval so they can all be stopped at once (e.g. on game over).
 * Also supports a global pause flag that suppresses callback execution without clearing intervals.
 */
class IntervalHub {
  /** @type {number[]} Array of all active interval IDs created via {@link startInterval}. */
  static allIntervals = [];
  /** @type {boolean} When true, all managed interval callbacks are suppressed. */
  static isGamePaused = false;

  /**
   * Creates a managed interval that respects the global pause state.
   * @param {function(): void} func - The callback to execute on each tick.
   * @param {number} timer - Interval delay in milliseconds.
   */
  static startInterval(func, timer) {
    const wrapperFunction = () => {
      if (!IntervalHub.isGamePaused) {
        func();
      }
    };
    const newInterval = setInterval(wrapperFunction, timer);
    IntervalHub.allIntervals.push(newInterval);
  }

  /**
   * Clears all active intervals and empties the tracking array.
   */
  static stopAllIntervals() {
    IntervalHub.allIntervals.forEach(clearInterval);
    IntervalHub.allIntervals = [];
    IntervalHub.isGamePaused = false;
  }
}
