let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
}
// (Welches Bild, Koordinate X, Koordinate Y, Breite, Höhe)
    // ctx.drawImage(character, 20, 20, 50, 150);


function fullscreen() {
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
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }  else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    }
}

