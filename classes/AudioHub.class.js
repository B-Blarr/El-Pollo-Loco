class AudioHub {
    // Audiodateien für Piano, Guitar, DRUMS
    static CHARACTER_RUN = new Audio('audio/sounds/character/characterRun.mp3');
    static CHARACTER_HIT = new Audio('audio/sounds/character/characterDamage.mp3');
    static CHARACTER_DEAD = new Audio('audio/sounds/character/characterDead.wav');
    static CHARACTER_JUMP = new Audio('audio/sounds/character/characterJump.wav');
    static CHARACTER_SLEEP = new Audio('audio/sounds/character/characterSnoring.mp3');
    static BOTTLE_COLLECTED = new Audio('audio/sounds/collectibles/bottleCollectSound.wav');
    static COIN_COLLECTED = new Audio('audio/sounds/collectibles/collectSound.wav');
    static BABY_CHICKEN_DEAD = new Audio('audio/sounds/chicken/babyChickenDied.mp3');
    static CHICKEN_DEAD = new Audio('audio/sounds/chicken/chickenDead2.mp3');
    static ENDBOSS_START = new Audio('audio/sounds/endboss/endbossApproach.wav');
    static ENDBOSS_DEAD = new Audio('audio/sounds/endboss/endbossDied.mp3');
    static ENDBOSS_HIT = new Audio('audio/sounds/endboss/endbossHit.mp3');
    static BOTTLE_BREAK = new Audio('audio/sounds/throwable/bottleBreak.mp3');
    static GAME_START = new Audio('audio/sounds/game/gameStart.mp3');
    static BACKGROUND_STARTSCREEN = new Audio('audio/sounds/game/backgroundStart.mp3');
    static BACKGROUND_LEVEL = new Audio('audio/sounds/game/background5.mp3');


    // Array, das alle definierten Audio-Dateien enthält
    static allSounds = [AudioHub.CHARACTER_RUN, AudioHub.CHARACTER_HIT, AudioHub.CHARACTER_DEAD, AudioHub.CHARACTER_JUMP, AudioHub.CHARACTER_SLEEP,
                        AudioHub.BOTTLE_COLLECTED, AudioHub.COIN_COLLECTED, AudioHub.BABY_CHICKEN_DEAD, AudioHub.CHICKEN_DEAD, AudioHub.ENDBOSS_START,
                        AudioHub.ENDBOSS_DEAD, AudioHub.ENDBOSS_HIT, AudioHub.BOTTLE_BREAK, AudioHub.GAME_START, AudioHub.BACKGROUND_STARTSCREEN, 
                        AudioHub.BACKGROUND_LEVEL,
    ];


static playSound(audio) {
        let clone = audio.cloneNode(); // Erstellt eine Kopie der Audiodatei
        clone.volume = audio.volume;   // Übernimmt die Lautstärke vom Original
        clone.play();
    }


    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {  // instrumentId nur wichtig für die Visualisierung
        sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
        sound.play();  // Spielt das übergebene Sound-Objekt ab
    }

    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
        document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
    }

    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }

    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume-slider-menu').value;  // Holt den aktuellen Lautstärkewert aus dem Inputfeld
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue;  // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
        });
    }

static mute(){
AudioHub.allSounds.forEach(sound => {
            sound.volume = 0;
            });
}

static unmute(){
    AudioHub.allSounds.forEach(sound => {
            sound.volume = 0.2;
            });
}
}