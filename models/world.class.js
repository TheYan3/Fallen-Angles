class world {
   character = new player();
   enemies = [new golem(), new minotaur(), new reaper()];
   ctx;
   //canvas;

   constructor(canvas) {
      this.ctx = canvas.getContext("2d");
      //this.canvas = canvas;
      this.enemies.forEach((enemy) => {
         enemy.x = 300 + Math.random() * 500;
      });
      this.draw();
   }

   draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(
         this.character.img,
         this.character.x,
         this.character.y,
         this.character.width,
         this.character.height,
      );
      this.enemies.forEach((enemy) => {
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
      requestAnimationFrame(this.draw.bind(this));
   }
}
