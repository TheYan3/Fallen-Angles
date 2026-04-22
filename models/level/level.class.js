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
    * @param {Cloud[]} clouds - Moving clouds.
    * @param {Sky[]} skies - Background sky layers.
    * @param {GroundObject[]} groundObjects - Ground layers.
    * @param {Rock[]} rocks - Rock obstacles.
    * @param {PowerUp[]} powerUps - Collectible power-ups.
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
