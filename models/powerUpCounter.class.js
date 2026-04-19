class powerUpCounter extends drawableObjects {
   count = 0;
   x = 20;
   y = 50;
   width = 48;
   height = 48;

   constructor() {
      super();
      this.loadImage(animationLibrary.powerup.flameFeather[0]);
   }

   increment() {
      this.count++;
   }

   draw(ctx) {
      this.drawIcon(ctx);
      this.drawCount(ctx);
   }

   drawIcon(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   drawCount(ctx) {
      ctx.save();
      ctx.font = gameSettings.getCanvasFont(32);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.strokeText(this.count, this.x + this.width + 14, this.y + 36);
      ctx.fillText(this.count, this.x + this.width + 14, this.y + 36);
      ctx.restore();
   }
}
