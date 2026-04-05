class MovableObject {
   x = 100;
   y = 360;
   img;
   height = 100;
   width = 100;
   imageCache = {};
   otherDirection = false;
   speed = gameSettings.gameSpeed * 0.2;

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
}
