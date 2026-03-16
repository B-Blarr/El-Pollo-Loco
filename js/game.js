/** @type {HTMLCanvasElement} The main game canvas element. */
let canvas;
/** @type {World} The active World instance managing the game loop. */
let world;
/** @type {Keyboard} Global keyboard input handler shared across the codebase. */
let keyboard = new Keyboard();
/** @type {HTMLElement} Reference to the winning-screen overlay element. */
let refWinningScreen = document.getElementById("winning-screen");
/** @type {HTMLElement} Reference to the game-over-screen overlay element. */
let refGameOverScreen = document.getElementById("game-over-screen");
AudioHub.BACKGROUND_LEVEL.loop = true;
AudioHub.BACKGROUND_ENDBOSS.loop = true;
/** @type {HTMLElement} Button that enters fullscreen mode. */
const enterButton = document.getElementById("enter-fullscreen");
/** @type {HTMLElement} Button that exits fullscreen mode. */
const exitButton = document.getElementById("exit-fullscreen");
/** @type {boolean} Whether a game session has been started at least once. */
let gameStarted = false;
/** @type {boolean|undefined} Tracks the mute state for external use. */
let isMuted;
/** @type {HTMLImageElement} The mute/unmute toggle button image element. */
let muteButton = document.getElementById("mute-button");
AudioHub.loadMuteState();

document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

/**
 * Initialises and starts a new game session.
 * Creates the level, canvas, and World instance; starts touch controls;
 * and automatically enters fullscreen on narrow screens.
 */
function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  AudioHub.BACKGROUND_STARTSCREEN.pause();
  startTouchControls();
  hideAddressBar();
  if (window.innerWidth <= 920) {
    fullscreen();
  }
}

/**
 * Attempts to hide the browser address bar on mobile by scrolling the page.
 */
function hideAddressBar() {
  window.scrollTo(0, 1);

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}

/**
 * Plays the start-screen background music on the first user interaction.
 * Removes all three event listeners after playing to avoid duplicate calls.
 */
function playStartscreenMusic() {
  if (gameStarted) {
    return;
  }
  let music = AudioHub.BACKGROUND_STARTSCREEN;
  music.loop = true;
  music.play().then(() => {
    if (!AudioHub.muteSound) {
      AudioHub.changeMusicVolume();
    }
    document.removeEventListener("click", playStartscreenMusic);
    document.removeEventListener("keydown", playStartscreenMusic);
    document.removeEventListener("touchstart", playStartscreenMusic);
  }).catch(() => {});
}

document.addEventListener("click", playStartscreenMusic);
document.addEventListener("keydown", playStartscreenMusic);
document.addEventListener("touchstart", playStartscreenMusic);

/**
 * Requests fullscreen on the main game container element.
 */
function fullscreen() {
  const fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen on the given element, using vendor-prefixed APIs as fallbacks.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode, using a vendor-prefixed API as fallback.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Starts a new game: initialises the world, updates UI screens, and plays start sounds.
 */
function startGame() {
  gameStarted = true;
  document.getElementById("pause-btn").src = "assets/icons/pause.png";
  init();
  updateGameScreens();
  playStartSounds();
  syncAudioAndButtons();
}

/**
 * Fades out the start screen and hides win/game-over overlays when a game begins.
 */
function updateGameScreens() {
  let startRef = document.getElementById("start-screen");
  startRef.classList.add("fade-out");
  startRef.classList.remove("fade-in");
  refWinningScreen.classList.add("d-none");
  refGameOverScreen.classList.add("d-none");
}

/**
 * Plays the game-start jingle and begins the level background music.
 */
function playStartSounds() {
  AudioHub.GAME_START.play();
  AudioHub.BACKGROUND_LEVEL.play();
}

/**
 * Syncs the mute button icon with the current audio state and applies saved volume levels.
 */
function syncAudioAndButtons() {
  if (AudioHub.muteSound) {
    muteButton.src = "assets/icons/mute.png";
  } else {
    AudioHub.changeMusicVolume();
    AudioHub.changeSfxVolume();
    muteButton.src = "assets/icons/unmute.png";
  }
}

/**
 * Updates the enter/exit fullscreen button visibility based on the current fullscreen state.
 */
function updateFullscreenButton() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  if (isFullscreen) {
    enterButton.classList.add("d-none");
    exitButton.classList.remove("d-none");
  } else {
    enterButton.classList.remove("d-none");
    exitButton.classList.add("d-none");
  }
}

/**
 * Shows the keyboard controls overlay.
 */
function openControls() {
  document.getElementById("controls-overlay").classList.remove("d-none");
}

/**
 * Hides the keyboard controls overlay.
 */
function closeControls() {
  document.getElementById("controls-overlay").classList.add("d-none");
}

/**
 * Shows the options overlay.
 */
function openOptions() {
  document.getElementById("options-overlay").classList.remove("d-none");
}

/**
 * Hides the options overlay.
 */
function closeOptions() {
  document.getElementById("options-overlay").classList.add("d-none");
}

/**
 * Hides the options overlay and shows the impressum (legal notice) overlay.
 */
function openImpressum() {
  document.getElementById("options-overlay").classList.add("d-none");
  document.getElementById("impressum-overlay").classList.remove("d-none");
}

/**
 * Hides the impressum overlay and returns to the options overlay.
 */
function closeImpressum() {
  document.getElementById("impressum-overlay").classList.add("d-none");
  document.getElementById("options-overlay").classList.remove("d-none");
}

/**
 * Fades the start screen back in, hides result overlays, and restarts the start-screen music.
 * Resets {@link gameStarted} so the music listener can fire again.
 */
function openStartscreen() {
  let startRef = document.getElementById("start-screen");
  startRef.classList.add("fade-in");
  startRef.classList.remove("fade-out");
  refWinningScreen.classList.add("d-none");
  refGameOverScreen.classList.add("d-none");
  AudioHub.BACKGROUND_STARTSCREEN.loop = true;
  AudioHub.BACKGROUND_STARTSCREEN.play();
  gameStarted = false;
}

/**
 * Toggles the global mute state and updates the mute button icon accordingly.
 * If unmuting during an active unpaused game, the level music is resumed.
 */
function toggleMute() {
  if (AudioHub.muteSound) {
    AudioHub.unmute();
    muteButton.src = "assets/icons/unmute.png";
    if (gameStarted && !IntervalHub.isGamePaused) {
      AudioHub.BACKGROUND_LEVEL.play();
    }
  } else {
    AudioHub.mute();
    muteButton.src = "assets/icons/mute.png";
  }
}

/**
 * Toggles the game pause state and updates the pause button icon.
 * Pausing stops all sounds; resuming restarts the level music if not muted.
 */
function togglePause() {
  IntervalHub.isGamePaused = !IntervalHub.isGamePaused;
  let pauseBtn = document.getElementById("pause-btn");
  if (IntervalHub.isGamePaused) {
    pauseBtn.src = "assets/icons/play.png";
    AudioHub.BACKGROUND_LEVEL.pause();
    AudioHub.stopAll();
  } else {
    pauseBtn.src = "assets/icons/pause.png";
    if (!AudioHub.muteSound) {
      AudioHub.BACKGROUND_LEVEL.play();
    }
  }
}

/**
 * Attaches touchstart, touchend, mousedown, mouseup, and mouseleave listeners to a button
 * so it can set a keyboard key flag for both touch and mouse input.
 * @param {string} buttonId - The id of the HTML button element.
 * @param {string} key - The property name on the {@link keyboard} object to toggle (e.g. "LEFT").
 */
function addTouchLogic(buttonId, key) {
  let button = document.getElementById(buttonId);
  button.addEventListener("touchstart", (e) => {
    if (e.cancelable) e.preventDefault();
    keyboard[key] = true;
  }, { passive: false });
  button.addEventListener("touchend", (e) => {
    if (e.cancelable) e.preventDefault();
    keyboard[key] = false;
  }, { passive: false });
  button.addEventListener("mousedown", () => { keyboard[key] = true; });
  button.addEventListener("mouseup", () => { keyboard[key] = false; });
  button.addEventListener("mouseleave", () => { keyboard[key] = false; });
}

/**
 * Binds all four on-screen control buttons (left, right, jump, throw) to their keyboard keys.
 * Also suppresses the context menu on the mobile button container.
 */
function startTouchControls() {
  addTouchLogic("btnLeft", "LEFT");
  addTouchLogic("btnRight", "RIGHT");
  addTouchLogic("btnJump", "SPACE");
  addTouchLogic("btnThrow", "F");
  document.getElementById("mobile-buttons").addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

/**
 * Stops all intervals and audio, then returns to the start screen.
 */
function returnToHome() {
  IntervalHub.stopAllIntervals();
  AudioHub.stopAll();
  openStartscreen();
}

/**
 * Toggles the visibility of the on-screen mobile control buttons.
 */
function toggleTouchControls() {
  let mobileButtons = document.getElementById("mobile-buttons");
  if (window.getComputedStyle(mobileButtons).display === "none") {
    mobileButtons.style.display = "flex";
    mobileButtons.classList.remove("d-none");
  } else {
    mobileButtons.style.display = "none";
    mobileButtons.classList.add("d-none");
  }
}

/**
 * Toggles fullscreen mode: enters fullscreen if not currently active, exits if it is.
 */
function toggleFullscreen() {
  let fullscreenContainer = document.getElementById("fullscreen");
  if (!document.fullscreenElement) {
    enterFullscreen(fullscreenContainer);
  } else {
    exitFullscreen();
  }
}
