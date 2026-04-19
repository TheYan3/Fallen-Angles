class repeatButton extends drawableObjects {
   width = 220;
   height = 150;

   /**
    * Initializes the repeat/restart button and loads its graphic.
    */
   constructor() {
      super();
      this.loadImage("img/Menü/Buttons/Repeat_Button.png");
   }

   /**
    * Draws the button at specified coordinates.
    */
   draw(ctx, x, y) {
      this.setPosition(x, y);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   /**
    * Updates internal coordinates for click detection.
    */
   setPosition(x, y) {
      this.x = x;
      this.y = y;
   }

   /**
    * Checks if a mouse coordinate falls within the button's boundaries.
    * @returns {boolean}
    */
   containsPoint(x, y) {
      return x >= this.x && x <= this.x + this.width && this.isInsideY(y);
   }

   /**
    * Checks if Y coordinate is within height range.
    */
   isInsideY(y) {
      return y >= this.y && y <= this.y + this.height;
   }

   /**
    * Checks if the button image is fully loaded and ready to be drawn.
    */
   isImageReady() {
      return this.img?.complete && this.img.naturalWidth > 0;
   }
}
