class Endboss extends MoveableObject {
  y = 260;
  height = 640;
  width = 620;
  isDeadAnimationPlaying = false;
  isAttacking = false;

  offset = {
    top: 150,
    right: 100,
    bottom: 100,
    left: 50,
  };

  constructor() {
    super().loadImage("./assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 4250;
    this.loadImages(ImageHub.endboss.walking);
    this.loadImages(ImageHub.endboss.alert);
    this.loadImages(ImageHub.endboss.dead);
    this.loadImages(ImageHub.endboss.hurt);
    this.loadImages(ImageHub.endboss.attacking);
    this.speed = 5;
    this.hitPoints = 400;
    this.animate();
  }

  animate() {
    // 1. Intervall: Bewegung & Logik (Schnell: 60 FPS)
    // Hier prüfen wir die Position und bewegen das Objekt.
    IntervalHub.startInterval(() => {
      // Sicherheits-Check: Gibt es die Welt schon?
      if (this.world && this.world.hadFirstContact && !this.isDead() && !this.isAttacking) {
        this.moveLeft(this.speed); // Bewegung gehört hier hin!
        this.getRealFrame(); // Hitbox update
      }
    }, 1000 / 60);

    // 2. Intervall: Animation (Langsam: ca. 150-200ms)
    // Hier entscheiden wir NUR, welches Bild gezeigt wird.
    IntervalHub.startInterval(() => {
      if (this.isDead()) {
        // ... deine Dead Logic ...
        if (!this.isDeadAnimationPlaying) {
          this.currentImage = 0;
          this.isDeadAnimationPlaying = true;
        }
        this.playDeadAnimation(ImageHub.endboss.dead);
      } else if (this.isHurt()) {
        this.playAnimation(ImageHub.endboss.hurt);
      } else if (this.isAttacking) {
        this.playAnimation(ImageHub.endboss.attacking);
      } else if (this.world && this.world.hadFirstContact) {
        // WENN Kontakt war: Laufen
        this.playAnimation(ImageHub.endboss.walking);
      } else {
        // WENN NOCH KEIN Kontakt war: Wachsam sein
        this.playAnimation(ImageHub.endboss.alert);
      }
    }, 200);

    // Wir wollen z.B. alle 3 Sekunden einen Angriff starten
    IntervalHub.startInterval(() => {
      if (this.world && this.world.hadFirstContact && !this.isDead()) {
        this.isAttacking = true;
        setTimeout(() => {
          this.isAttacking = false;
          this.currentImage = 0;
          this.speed += 2;
        }, 1500); // Dauer des Angriffs in ms
      }
    }, 4000); // Alle 4 Sekunden passiert das
  }
}
