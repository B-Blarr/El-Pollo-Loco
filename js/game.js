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
  let startRef = document.getElementById("start-screen");
  startRef.classList.add("fade-out");
  startRef.classList.remove("fade-in");
  AudioHub.GAME_START.play();
  AudioHub.BACKGROUND_LEVEL.play();

  if (AudioHub.muteSound) {
    muteButton.src = "assets/icons/mute.png";
  } else {
    AudioHub.changeMusicVolume();
    AudioHub.changeSfxVolume();
    muteButton.src = "assets/icons/unmute.png";
  }
  gameStarted = true;
  refWinningScreen.classList.add("d-none");
  refGameOverScreen.classList.add("d-none");
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
  AudioHub.BACKGROUND_STARTSCREEN.play();
}

function toggleMute() {
  if (AudioHub.muteSound) {
    AudioHub.unmute();
    muteButton.src = "assets/icons/unmute.png";
  } else {
    AudioHub.mute();
    muteButton.src = "assets/icons/mute.png";
  }
}

