class IntervalHub {
  static allIntervals = [];
  static isGamePaused = false;

  static startInterval(func, timer) {
    const wrapperFunction = () => {
      if (!IntervalHub.isGamePaused) {
        func();
      }
    };
    const newInterval = setInterval(wrapperFunction, timer);
    IntervalHub.allIntervals.push(newInterval);
  }

  static stopAllIntervals() {
    IntervalHub.allIntervals.forEach(clearInterval);
    IntervalHub.allIntervals = [];
  }
}
