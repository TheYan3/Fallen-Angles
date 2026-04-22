class PowerUpCounter extends DrawableObject {
   count = 0;
   x = 20;
   y = 50;
   width = 48;
   height = 48;

   /**
    * Creates the power-up UI counter.
    */
   constructor() {
      super();
      this.loadImage(animationLibrary.powerup.flameFeather[0]);
   }

   /**
    * Adds one collected power-up.
    */
   increment() {
      this.count++;
   }

   /**
    * Draws icon and count.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   draw(ctx) {
      this.drawIcon(ctx);
      this.drawCount(ctx);
   }

   /**
    * Draws the counter icon.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   drawIcon(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   /**
    * Draws the collected amount.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
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
