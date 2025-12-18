class Level {
enemies;
clouds;
backgroundObjects;
collectableObjects;
coins;
level_end_x = 4200;

    constructor(enemies, clouds, backgroundObjects, collectableObjects, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.coins = coins;
        
    }
}