class MovableObject {
   x = 100;
   y = gameSettings.canvasHeight - 110;
   img;
   height = 100;
   width = 100;
   imageCache = {};
   otherDirection = false;
   speed = gameSettings.gameSpeed * 0.3;
   currentImage = 0;
   lastAnimation = null;
   animationTick = 0;
   animationSpeed = 4000 / 60;
   attackAnimationSpeed = 4000 / 60;
   speedY = 0;
   acceleration = 0.9;
   groundY = gameSettings.canvasHeight - 110;

   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY < 0) {
            this.y += this.speedY;
            this.speedY += this.acceleration;

            if (this.y > this.groundY) {
               this.y = this.groundY;
               this.speedY = 0;
            }
         } else {
            this.y = this.groundY;
            this.speedY = 0;
         }
      }, 1000 / 60);
   }

   isAboveGround() {
      return this.y < this.groundY;
   }

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

   moveRight(speed = this.speed) {
      this.x += speed;
      this.otherDirection = false;
   }

   moveLeft(speed = this.speed) {
      this.x -= speed;
      this.otherDirection = true;
   }

   getMovementSpeed(isRunning = false, runSpeed = this.speed) {
      return isRunning ? runSpeed : this.speed;
   }

   playAnimation(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage = (this.currentImage + 1) % images.length;
   }

   playAnimationWithDelay(images, frameDelay = 1) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];

      this.animationTick++;

      if (this.animationTick < frameDelay) {
         return;
      }

      this.currentImage = (this.currentImage + 1) % images.length;
      this.animationTick = 0;
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

   updateAnimationState(images) {
      if (this.lastAnimation !== images) {
         this.currentImage = 0;
         this.lastAnimation = images;
         this.animationTick = 0;
      }
   }

   isColliding(otherObject) {
      if (!otherObject) {
         return false;
      }

      return (
         this.x < otherObject.x + otherObject.width &&
         this.x + this.width > otherObject.x &&
         this.y < otherObject.y + otherObject.height &&
         this.y + this.height > otherObject.y
      );
   }
}
