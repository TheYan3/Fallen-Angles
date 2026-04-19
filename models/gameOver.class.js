class gameover extends drawableObjects {
   x = 0;
   y = 0;
   width = 500;
   height = 170;
   buttonGap = 12;
   repeatButton = new reapeatBtn();

   constructor() {
      super();
      this.loadImage("img/gameover.png");
   }

   draw(ctx, canvas) {
      this.drawBlackScreen(ctx, canvas);
      this.drawCenteredImage(ctx, canvas);
      this.drawRepeatButton(ctx, canvas);
   }

   drawBlackScreen(ctx, canvas) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   drawCenteredImage(ctx, canvas) {
      let x = (canvas.width - this.width) / 2;
      let y = this.getImageY(canvas);
      ctx.drawImage(this.img, x, y, this.width, this.height);
   }

   drawRepeatButton(ctx, canvas) {
      let x = (canvas.width - this.repeatButton.width) / 2;
      let y = this.getButtonY(canvas);
      this.repeatButton.draw(ctx, x, y);
   }

   getButtonY(canvas) {
      return this.getImageY(canvas) + this.height + this.buttonGap;
   }

   getImageY(canvas) {
      let contentHeight = this.height + this.buttonGap;
      contentHeight += this.repeatButton.height;
      return (canvas.height - contentHeight) / 2;
   }

   isImageReady() {
      return super.isImageReady() && this.repeatButton.isImageReady();
   }

   handleClick(x, y) {
      return this.repeatButton.containsPoint(x, y);
   }
}
