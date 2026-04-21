class Level {
   enemies;
   clouds;
   skies;
   groundObjects;
   rocks;
   powerUps;
   playerEndX = 2700;
   cameraEndX = 2800;

   /**
    * Stores all objects for one level.
    * @param {MovableObject[]} enemies - Level enemies.
    * @param {cloud[]} clouds - Moving clouds.
    * @param {sky[]} skies - Background sky layers.
    * @param {groundObjects[]} groundObjects - Ground layers.
    * @param {rock[]} rocks - Rock obstacles.
    * @param {powerUp[]} powerUps - Collectible power-ups.
    */
   constructor(enemies, clouds, skies, groundObjects, rocks = [], powerUps = []) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.skies = skies;
      this.groundObjects = groundObjects;
      this.rocks = rocks;
      this.powerUps = powerUps;
   }
}
