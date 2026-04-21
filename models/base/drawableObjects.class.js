class drawableObjects {
   x = 100;
   y = gameSettings.canvasHeight - 110;
   img;
   height = 100;
   width = 100;
   imageCache = {};
   otherDirection = false;

   /**
    * Loads one image as the current sprite.
    * @param {string} path - Image path.
    */
   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   /**
    * Preloads multiple images into the cache.
    * @param {string[]} paths - Image paths.
    */
   loadImages(paths) {
      paths.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }

   /**
    * Draws the current sprite.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   draw(ctx) {
      if (!this.img) {
         return;
      }

      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   /**
    * Checks if the current image is loaded.
    * @returns {boolean}
    */
   isImageReady() {
      return this.img?.complete && this.img.naturalWidth > 0;
   }
}
