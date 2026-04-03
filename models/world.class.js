class world {
   character = new player();
   enemies = [new golem(), new minotaur(), new reaper()];
   clouds = [
      new cloud("img/Background/PNG/game_background_1/layers/clouds_1.png"),
      new cloud("img/Background/PNG/game_background_1/layers/clouds_2.png"),
      new cloud("img/Background/PNG/game_background_1/layers/clouds_3.png"),
      new cloud("img/Background/PNG/game_background_1/layers/clouds_4.png"),
   ];
   ctx;
   //canvas;

   constructor(canvas) {
      this.ctx = canvas.getContext("2d");
      //this.canvas = canvas;
      this.clouds.forEach((cloud, index) => {
         let sectionWidth = this.ctx.canvas.width / this.clouds.length;
         cloud.x = index * sectionWidth + Math.random() * sectionWidth;
         cloud.y =
            Math.random() *
            (this.ctx.canvas.height / 2 - this.clouds[0].height);

         this.clouds[0].x = 0;
         this.clouds[0].y = 0;
         this.clouds[0].width = 720;
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

      this.clouds.forEach((cloud) => {
         this.ctx.drawImage(
            cloud.img,
            cloud.x,
            cloud.y,
            cloud.width,
            cloud.height,
         );
      });

      requestAnimationFrame(this.draw.bind(this));
   }
}
