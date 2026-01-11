let canvas;
let world;
let keyboard = new Keyboard();
let refWinningScreen = document.getElementById("winning-screen");
let refGameOverScreen = document.getElementById("game-over-screen");
AudioHub.BACKGROUND_LEVEL.loop = true;
const openFullscreen = document.getElementById("enter-fullscreen");
const leaveFullscreen = document.getElementById("exit-fullscreen");
const enterButton = document.getElementById("enter-fullscreen");
const exitButton = document.getElementById("exit-fullscreen");
let gameStarted = false;
let isMuted;
let muteButton = document.getElementById("mute-button");
AudioHub.loadMuteState();

document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  AudioHub.BACKGROUND_STARTSCREEN.pause();
  startTouchControls();
}

function playStartscreenMusic() {
  if (gameStarted) {
    return;
  }
  let music = AudioHub.BACKGROUND_STARTSCREEN;
  music.loop = true;
  music.play();
  if (!AudioHub.muteSound) {
    AudioHub.changeMusicVolume();
  }
  document.removeEventListener("click", playStartscreenMusic);
  document.removeEventListener("keydown", playStartscreenMusic);
  document.removeEventListener("touchstart", playStartscreenMusic);
}

document.addEventListener("click", playStartscreenMusic);
document.addEventListener("keydown", playStartscreenMusic);
document.addEventListener("touchstart", playStartscreenMusic);

function fullscreen() {
  const fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function startGame() {
  init();
  updateGameScreens();
  playStartSounds();
  syncAudioAndButtons();
  gameStarted = true;
}

function updateGameScreens() {
  let startRef = document.getElementById("start-screen");
  startRef.classList.add("fade-out");
  startRef.classList.remove("fade-in");
  refWinningScreen.classList.add("d-none");
  refGameOverScreen.classList.add("d-none");
}

function playStartSounds() {
  AudioHub.GAME_START.play();
  AudioHub.BACKGROUND_LEVEL.play();
}

function syncAudioAndButtons() {
  if (AudioHub.muteSound) {
    muteButton.src = "assets/icons/mute.png";
  } else {
    AudioHub.changeMusicVolume();
    AudioHub.changeSfxVolume();
    muteButton.src = "assets/icons/unmute.png";
  }
}

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

function openControls() {
  document.getElementById("controls-overlay").classList.remove("d-none");
}

function closeControls() {
  document.getElementById("controls-overlay").classList.add("d-none");
}

/* --- Menü Navigation --- */
function openOptions() {
  document.getElementById("options-overlay").classList.remove("d-none");
}

function closeOptions() {
  document.getElementById("options-overlay").classList.add("d-none");
}

function openImpressum() {
  document.getElementById("options-overlay").classList.add("d-none");
  document.getElementById("impressum-overlay").classList.remove("d-none");
}

function closeImpressum() {
  document.getElementById("impressum-overlay").classList.add("d-none");
  document.getElementById("options-overlay").classList.remove("d-none");
}

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

function togglePause() {
  IntervalHub.isGamePaused = !IntervalHub.isGamePaused;
  let pauseBtn = document.getElementById('pause-btn');
  if (IntervalHub.isGamePaused) {
    pauseBtn.src = 'assets/icons/play.png'; 
    AudioHub.BACKGROUND_LEVEL.pause();
    AudioHub.stopAll(); 
  } else {
    pauseBtn.src = 'assets/icons/pause.png'; 
    if (!AudioHub.muteSound) {
      AudioHub.BACKGROUND_LEVEL.play();
    }
  }
}

  function addTouchLogic(buttonId, key) {
    let button = document.getElementById(buttonId);

    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });

    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

function startTouchControls() {
    addTouchLogic('btnLeft', 'LEFT');
    addTouchLogic('btnRight', 'RIGHT');
    addTouchLogic('btnJump', 'SPACE');
    addTouchLogic('btnThrow', 'F');
}

function returnToHome() {
    IntervalHub.stopAllIntervals(); 
    AudioHub.stopAll();
    openStartscreen(); 
}


