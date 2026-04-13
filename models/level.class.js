class Level {
   enemies;
   clouds;
   skies;
   groundObjects;
   level_end_x = 1400;

   constructor(enemies, clouds, skies, groundObjects) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.skies = skies;
      this.groundObjects = groundObjects;
   }
}
