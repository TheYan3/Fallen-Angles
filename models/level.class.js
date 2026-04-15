class Level {
   enemies;
   clouds;
   skies;
   groundObjects;
   rocks;
   powerUps;
   player_end_x = 2700;
   camera_end_x = 2200;

   constructor(enemies, clouds, skies, groundObjects, rocks = [], powerUps = []) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.skies = skies;
      this.groundObjects = groundObjects;
      this.rocks = rocks;
      this.powerUps = powerUps;
   }
}
