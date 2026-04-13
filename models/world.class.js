class world {
   character;
   level = level1;
   ctx;
   canvas;
   keyboardInput;
   camara_x = 0;

   constructor(canvas, keyboardInput) {
      this.ctx = canvas.getContext("2d");
      this.keyboardInput = keyboardInput;
      this.canvas = canvas;
      this.character = new player(keyboardInput);
      this.setWorld();
      this.draw();
   }

   setWorld() {
      this.character.world = this;
   }

   draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.ctx.translate(Math.round(this.camara_x), 0);

      this.level.skies.forEach((skyObject) => skyObject.draw(this.ctx));
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.groundObjects);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);

      this.ctx.translate(-Math.round(this.camara_x), 0);

      requestAnimationFrame(this.draw.bind(this));
   }

   addObjectsToMap(objects) {
      if (!Array.isArray(objects)) {
         return;
      }

      objects.forEach((o) => {
         this.addToMap(o);
      });
   }

   addToMap(mo) {
      if (!mo?.img) {
         return;
      }

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
