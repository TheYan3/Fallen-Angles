class gameover extends drawableObjects {
   x = 0;
   y = 0;
   width = 500;
   height = 300;
   buttonGap = 12;
   repeatButton = new repeatButton();
   winImage;

   /**
    * Initializes the gameover screen and loads the result screen images.
    */
   constructor() {
      super();
      this.loadImage("img/gameover.png");
      this.loadWinImage();
   }

   /**
    * Loads the win screen image separately from the game over image.
    */
   loadWinImage() {
      this.winImage = new Image();
      this.winImage.src = "img/YOU_WIn.png";
   }

   /**
    * Renders the game over sequence: black overlay, centered text,
    * and restart button.
    */
   draw(ctx, canvas) {
      this.drawBlackScreen(ctx, canvas);
      this.drawCenteredImage(ctx, canvas, this.img);
      this.drawRepeatButton(ctx, canvas);
   }

   /**
    * Renders the win sequence with the same layout as the game over screen.
    */
   drawWin(ctx, canvas) {
      this.drawBlackScreen(ctx, canvas);
      this.drawCenteredImage(ctx, canvas, this.winImage);
      this.drawRepeatButton(ctx, canvas);
   }

   /**
    * Draws a solid black rectangle covering the entire canvas.
    */
   drawBlackScreen(ctx, canvas) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   /**
    * Renders a result image in the center of the screen.
    */
   drawCenteredImage(ctx, canvas, image) {
      let x = (canvas.width - this.width) / 2;
      let y = this.getImageY(canvas);
      ctx.drawImage(image, x, y, this.width, this.height);
   }

   /**
    * Renders the restart button below the game over image.
    */
   drawRepeatButton(ctx, canvas) {
      let x = (canvas.width - this.repeatButton.width) / 2;
      let y = this.getButtonY(canvas);
      this.repeatButton.draw(ctx, x, y);
   }

   /**
    * Calculates the vertical start position for the button.
    * @returns {number}
    */
   getButtonY(canvas) {
      return this.getImageY(canvas) + this.height + this.buttonGap;
   }

   /**
    * Calculates the vertical start position for the centered content
    * to ensure the total block (image + button) is centered.
    * @returns {number}
    */
   getImageY(canvas) {
      let contentHeight = this.height + this.buttonGap;
      contentHeight += this.repeatButton.height;
      return (canvas.height - contentHeight) / 2;
   }

   /**
    * Checks if all required image assets for the screen are loaded.
    */
   isImageReady() {
      return (
         super.isImageReady() &&
         this.winImage?.complete &&
         this.winImage.naturalWidth > 0 &&
         this.repeatButton.isImageReady()
      );
   }

   /**
    * Logic for processing clicks: delegates check to the button instance.
    */
   handleClick(x, y) {
      return this.repeatButton.containsPoint(x, y);
   }
}
