class gameover extends drawableObjects {
   x = 0;
   y = 0;
   width = 720;
   height = 480;

   constructor() {
      super();
      this.loadImage("img/Menü/Window_Frame.png");
   }

   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }
}
