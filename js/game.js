let canvas;
let world;
let keyboard = new Keyboard();

    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


}
// (Welches Bild, Koordinate X, Koordinate Y, Breite, Höhe)
    // ctx.drawImage(character, 20, 20, 50, 150);


function fullscreen() {
    // toggleButton();
    const fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();        
    }  else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }   else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    // updateToWindowMode();
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }  else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    }
}

function startGame() {
    document.getElementById('start_btn').blur();
    init();
    startRef = document.getElementById("start-screen");
    startRef.classList.add('fade-out');
}

// function toggleButton() {
//     const refFullscreenButton = document.getElementById("fullscreen-toggle-button");
//     const refWindowButton = document.getElementById("window-toggle-button");

//     if (refFullscreenButton.classList.contains("d-none") || !refWindowButton.classList.contains("d-none")) {
//         refFullscreenButton.classList.remove("d-none");
//         refWindowButton.classList.add("d-none");
//     } else{
//         refFullscreenButton.classList.add("d-none");
//         refWindowButton.classList.remove("d-none");
//     }
// }

function updateFullscreenButton() {
    // 1. Die Buttons vom Startscreen holen
    const fullscreenBtn = document.getElementById('fullscreen-toggle-button');
    const windowBtn = document.getElementById('window-toggle-button');

    // 2. Die Buttons vom Ingame holen
    const ingameFullscreenBtn = document.getElementById('ingame-fullscreen-toggle-button');
    const ingameWindowBtn = document.getElementById('ingame-window-toggle-button');
    
    // 3. Den Browser-Status abfragen
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

    if (isFullscreen) {
        // --- Alles auf "Fenster-Modus" Symbol schalten ---
        
        // Startscreen Buttons anpassen
        fullscreenBtn.classList.add('d-none');
        windowBtn.classList.remove('d-none');

        // Ingame Buttons anpassen (Sicherheits-Check: existieren sie überhaupt?)
        if (ingameFullscreenBtn && ingameWindowBtn) {
            ingameFullscreenBtn.classList.add('d-none');
            ingameWindowBtn.classList.remove('d-none');
        }

    } else {
        // --- Alles auf "Fullscreen" Symbol schalten ---

        // Startscreen Buttons anpassen
        fullscreenBtn.classList.remove('d-none');
        windowBtn.classList.add('d-none');

        // Ingame Buttons anpassen
        if (ingameFullscreenBtn && ingameWindowBtn) {
            ingameFullscreenBtn.classList.remove('d-none');
            ingameWindowBtn.classList.add('d-none');
        }
    }
}









//     function toggleButtonIngame() {
//     const refIngameFullscreenButton = document.getElementById("ingame-fullscreen-toggle-button");
//     const refIngameWindowButton = document.getElementById("ingame-window-toggle-button");

//     if (refIngameFullscreenButton.classList.contains("d-none") || !refIngameWindowButton.classList.contains("d-none")) {
//         refIngameFullscreenButton.classList.remove("d-none");
//         refIngameWindowButton.classList.add("d-none");
//     } else{
//         refIngameFullscreenButton.classList.add("d-none");
//         refIngameWindowButton.classList.remove("d-none");
//     }
// }


