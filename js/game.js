let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

    console.log('My Character is', world.character);
    

// (Welches Bild, Koordinate X, Koordinate Y, Breite, Höhe)
    // ctx.drawImage(character, 20, 20, 50, 150);
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 32) { 
        keyboard.SPACE = true;
    }
    if (event.keyCode == 37) { 
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) { 
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 70) { 
        keyboard.F = true;
    }
    if (event.keyCode == 65) { 
        keyboard.A = true;
    }
    if (event.keyCode == 68) { 
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 32) { 
        keyboard.SPACE = false;
    }
    if (event.keyCode == 37) { 
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) { 
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 70) { 
        keyboard.F = false;
    }
    if (event.keyCode == 65) { 
        keyboard.A = false;
    }
    if (event.keyCode == 68) { 
        keyboard.D = false;
    }

});