class Level {
   enemies;
   clouds;
   skies;
   groundObjects;
   level_end_x = 2200;

   constructor(enemies, clouds, skies, groundObjects) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.skies = skies;
      this.groundObjects = groundObjects;
   }
}
