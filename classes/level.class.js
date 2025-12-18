class Level {
enemies;
clouds;
backgroundObjects;
bottlesInAir;
coins;
level_end_x = 4200;

    constructor(enemies, clouds, backgroundObjects, bottlesInAir, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottlesInAir = bottlesInAir;
        this.coins = coins;
        
    }
}