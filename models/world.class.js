class world {
   character = new player();
   enemies = [new golem(), new minotaur(), new reaper()];
   clouds = [
      new cloud(
         "img/Background/PNG/game_background_1/layers/clouds_1.png",
         0,
         4,
      ),
      new cloud(
         "img/Background/PNG/game_background_1/layers/clouds_2.png",
         1,
         4,
      ),
      new cloud(
         "img/Background/PNG/game_background_1/layers/clouds_3.png",
         2,
         4,
      ),
      new cloud(
         "img/Background/PNG/game_background_1/layers/clouds_4.png",
         3,
         4,
      ),
   ];
   sky = new sky();
   groundObjects = [
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_1.png",
      ),
      new groundObjects(
         "img/Background/PNG/game_background_1/layers/rocks_2.png",
      ),
   ];
   ctx;

   constructor(canvas) {
      this.ctx = canvas.getContext("2d");
      this.setCloudPosition();
      this.draw();
   }

   draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.addToMap(this.sky);
      this.addObjectsToMap(this.clouds);
      this.addObjectsToMap(this.groundObjects);
      this.addToMap(this.character);
      this.drawMirroredEnemies();

      requestAnimationFrame(this.draw.bind(this));
   }

   setCloudPosition() {
      this.clouds[0].x = 0;
      this.clouds[0].y = 0;
      this.clouds[0].width = 720;
   }
   addObjectsToMap(object) {
      object.forEach((o) => {
         this.addToMap(o);
      });
   }

   drawMirroredEnemies() {
      this.enemies.forEach((enemy) => {
         //enemys had to look at the player
         this.ctx.save();
         this.ctx.scale(-1, 1);
         this.ctx.drawImage(
            enemy.img,
            -enemy.x - enemy.width,
            enemy.y,
            enemy.width,
            enemy.height,
         );
         this.ctx.restore();
      });
   }

   addToMap(mo) {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
   }
}
