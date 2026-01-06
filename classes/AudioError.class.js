class AudioError {
    static LONG = new Audio('');

    static playOne(sound) {
        setInterval(() => {  // Wiederholt die Überprüfung alle 200ms
            if (sound.readyState == 4) {  // Überprüft, ob die Audiodatei vollständig geladen ist, wenn man die if abfrage rausnehmen würde, würde es bei start & drücken auf den stopp Knopf einen Fehler werfen. (am besten low-tier throttling nutzen!)
                console.log("Sound ready"); 
                sound.volume = 0.5; 
                sound.play();  // Spielt das übergebene Sound-Objekt ab
            } else {
                console.log("Sound not ready"); 
            }
        }, 200);
    }

    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }
}
