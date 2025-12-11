let canvas;
let ctx;
let character = new Character();
let world = new World();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

// (Welches Bild, Koordinate X, Koordinate Y, Breite, Höhe)
    ctx.drawImage(character, 20, 20, 50, 150);
}