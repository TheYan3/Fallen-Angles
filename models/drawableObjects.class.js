class drawableObjects {
   x = 100;
   y = gameSettings.canvasHeight - 110;
   img;
   height = 100;
   width = 100;
   imageCache = {};
   otherDirection = false;

   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   loadImages(paths) {
      paths.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }

   draw(ctx) {
      if (!this.img) {
         return;
      }

      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   isImageReady() {
      return this.img?.complete && this.img.naturalWidth > 0;
   }
}
