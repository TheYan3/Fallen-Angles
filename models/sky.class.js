class sky {
   x = 0;
   y = 0;
   width = gameSettings.canvasWidth;
   height = gameSettings.canvasHeight;
   img;
   staticCloudImg;

   constructor(x = 0) {
      this.x = x;
      this.img = new Image();
      this.img.src = "img/Background/PNG/game_background_1/layers/sky.png";

      this.staticCloudImg = new Image();
      this.staticCloudImg.src =
         "img/Background/PNG/game_background_1/layers/clouds_1.png";
   }

   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(
         this.staticCloudImg,
         this.x,
         this.y,
         this.width,
         this.height,
      );
   }
}
