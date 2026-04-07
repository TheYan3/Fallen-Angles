class world {
   character;
   level = level1;
   enemies = this.level.enemies;
   skies = this.level.skies;
   clouds = this.level.clouds;
   groundObjects = this.level.groundObjects;
   ctx;
   canvas;
   keyboardInput;
   camara_x = 0;

   constructor(canvas, keyboardInput) {
      this.ctx = canvas.getContext("2d");
      this.keyboardInput = keyboardInput;
      this.canvas = canvas;
      this.character = new player(keyboardInput);
      this.draw();
      this.setWorld();
   }

   setWorld() {
      this.character.world = this;
   }

   draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.ctx.translate(Math.round(this.camara_x), 0);

      this.skies.forEach((skyObject) => skyObject.draw(this.ctx));
      this.addObjectsToMap(this.groundObjects);
      this.addObjectsToMap(this.clouds);
      this.addToMap(this.character);
      this.addObjectsToMap(this.enemies);

      this.ctx.translate(-Math.round(this.camara_x), 0);

      requestAnimationFrame(this.draw.bind(this));
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
         this.ctx.drawImage(
            mo.img,
            -mo.x - mo.width,
            mo.y,
            mo.width,
            mo.height,
         );
         this.ctx.restore();
      } else {
         this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
      }
   }
}
