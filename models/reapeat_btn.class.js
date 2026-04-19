class reapeatBtn extends drawableObjects {
   width = 220;
   height = 150;

   constructor() {
      super();
      this.loadImage("img/Menü/Buttons/Repeat_Button.png");
   }

   draw(ctx, x, y) {
      this.setPosition(x, y);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   setPosition(x, y) {
      this.x = x;
      this.y = y;
   }

   containsPoint(x, y) {
      return x >= this.x && x <= this.x + this.width && this.isInsideY(y);
   }

   isInsideY(y) {
      return y >= this.y && y <= this.y + this.height;
   }

   isImageReady() {
      return this.img?.complete && this.img.naturalWidth > 0;
   }
}
