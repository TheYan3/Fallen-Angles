class powerUpCounter extends drawableObjects {
   count = 0;
   x = -90;
   y = 18;
   width = 48;
   height = 48;

   constructor() {
      super();
      this.loadImage(animationLibrary.powerup.flameFeather[0]);
   }

   increment() {
      this.count++;
   }

   draw(ctx, canvasWidth) {
      this.drawIcon(ctx, canvasWidth);
      this.drawCount(ctx, canvasWidth);
   }

   drawIcon(ctx, canvasWidth) {
      ctx.drawImage(this.img, canvasWidth + this.x, this.y, this.width, this.height);
   }

   drawCount(ctx, canvasWidth) {
      ctx.save();
      ctx.font = gameSettings.getCanvasFont(32);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.strokeText(this.count, canvasWidth - 120, 58);
      ctx.fillText(this.count, canvasWidth - 120, 58);
      ctx.restore();
   }
}
