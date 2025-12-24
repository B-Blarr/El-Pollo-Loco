let canvas;
let world;
let keyboard = new Keyboard();
let refWinningScreen = document.getElementById("winning-screen");
let refGameOverScreen = document.getElementById("game-over-screen");
AudioHub.BACKGROUND_LEVEL.loop = true;
const openFullscreen = document.getElementById("enter-fullscreen");
const leaveFullscreen = document.getElementById("exit-fullscreen");
const enterBtn = document.getElementById("enter-fullscreen");
const exitBtn = document.getElementById("exit-fullscreen");

document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function playStartscreenMusic() {
  let music = AudioHub.BACKGROUND_STARTSCREEN;
  music.volume = 0.2;
  music.loop = true;
  music.play();

  document.removeEventListener("click", playStartscreenMusic);
  document.removeEventListener("keydown", playStartscreenMusic);
  document.removeEventListener("touchstart", playStartscreenMusic);
}

document.addEventListener("click", playStartscreenMusic);
document.addEventListener("keydown", playStartscreenMusic);
document.addEventListener("touchstart", playStartscreenMusic);
// (Welches Bild, Koordinate X, Koordinate Y, Breite, Höhe)
// ctx.drawImage(character, 20, 20, 50, 150);

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
  if (AudioHub.muteSound == true) {
    AudioHub.mute();
  } else {
    AudioHub.GAME_START.play();
    AudioHub.BACKGROUND_STARTSCREEN.pause();
    AudioHub.BACKGROUND_LEVEL.play();
    AudioHub.BACKGROUND_LEVEL.volume = 0.2;
  }
}

function updateFullscreenButton() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  if (isFullscreen) {
    enterBtn.classList.add("d-none");
    exitBtn.classList.remove("d-none");
  } else {
    enterBtn.classList.remove("d-none");
    exitBtn.classList.add("d-none");
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
