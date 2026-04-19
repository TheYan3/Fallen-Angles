class Level {
   enemies;
   clouds;
   skies;
   groundObjects;
   rocks;
   powerUps;
   playerEndX = 2700;
   cameraEndX = 2800;

   constructor(enemies, clouds, skies, groundObjects, rocks = [], powerUps = []) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.skies = skies;
      this.groundObjects = groundObjects;
      this.rocks = rocks;
      this.powerUps = powerUps;
   }
}
