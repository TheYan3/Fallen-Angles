class MovableObject {
   x = 100;
   y = 360;
   img;
   height = 100;
   width = 100;
   imageCache = {};
   otherDirection = false;
   speed = gameSettings.gameSpeed * 0.2;
   currentImage = 0;
   animationSpeed = 4000 / 60;
   attackAnimationSpeed = 4000 / 60;

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

   moveRight() {
      this.x += this.speed;
   }

   moveLeft() {
      this.x -= this.speed;
   }

   playAnimation(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage = (this.currentImage + 1) % images.length;
   }

   playAnimationOnce(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;

      if (this.currentImage >= images.length) {
         this.currentImage = 0;
         return true;
      }

      return false;
   }
}
