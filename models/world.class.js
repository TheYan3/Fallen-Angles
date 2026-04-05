class world {
   character = new player();
   enemies = [new golem(), new minotaur(), new reaper()];
   sky = new sky();
   movingCloudPaths = [
      "img/Background/PNG/game_background_1/layers/clouds_2.png",
      "img/Background/PNG/game_background_1/layers/clouds_3.png",
      "img/Background/PNG/game_background_1/layers/clouds_4.png",
   ].sort(() => Math.random() - 0.5);
   clouds = [
      new cloud("img/Background/PNG/game_background_1/layers/clouds_1.png", false),
      new cloud(this.movingCloudPaths[0]),
      new cloud(this.movingCloudPaths[1]),
      new cloud(this.movingCloudPaths[2]),
   ];
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
      this.addObjectsToMap(this.groundObjects);
      this.addObjectsToMap(this.clouds);
      this.addToMap(this.character);
      this.addObjectsToMap(this.enemies);

      requestAnimationFrame(this.draw.bind(this));
   }

   setCloudPosition() {
      this.clouds[0].x = 0;
      this.clouds[0].y = 0;
      this.clouds[0].width = gameSettings.canvasWidth;
   }
   addObjectsToMap(object) {
      object.forEach((o) => {
         this.addToMap(o);
      });
   }

   addToMap(mo) {
      if (mo.otherDirection) {
         this.ctx.save();
         this.ctx.scale(-1, 1);
         this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
         this.ctx.restore();
      } else {
         this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
      }
   }
}
