class Sky {
   x = 0;
   y = 0;
   width = gameSettings.canvasWidth;
   height = gameSettings.canvasHeight;
   img;
   staticCloudImg;

   /**
    * Creates a sky background at the given x position.
    * @param {number} x - Horizontal draw position.
    */
   constructor(x = 0) {
      this.x = x;
      this.img = new Image();
      this.img.src = "img/Background/PNG/game_background_1/layers/sky.png";

      this.staticCloudImg = new Image();
      this.staticCloudImg.src =
         "img/Background/PNG/game_background_1/layers/clouds_1.png";
   }

   /**
    * Draws the sky and fixed cloud layer.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
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
