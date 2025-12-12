let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    // character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

    console.log('My Character is', world.character);
    

// (Welches Bild, Koordinate X, Koordinate Y, Breite, Höhe)
    // ctx.drawImage(character, 20, 20, 50, 150);
}