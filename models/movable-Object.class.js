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
      console.log("Moving right");
   }

   moveLeft() {
      setInterval(() => {
         this.x -= this.speed;
      }, 1000 / 60);
   }

   animation() {
      setInterval(() => {
         let path = this.IMAGES_WAITING[this.currentImage];
         this.img = this.imageCache[path];
         this.currentImage =
            (this.currentImage + 1) % this.IMAGES_WAITING.length;
      }, this.animationSpeed);
   }

   attackAnimation() {
      setInterval(() => {
         let path = this.IMAGES_ATTACKING[this.currentImage];
         this.img = this.imageCache[path];
         this.currentImage =
            (this.currentImage + 1) % this.IMAGES_ATTACKING.length;
      }, this.attackAnimationSpeed);
   }
}
