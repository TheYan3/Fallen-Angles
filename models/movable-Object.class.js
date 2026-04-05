class MovableObject {
   x = 100;
   y = 360;
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

   moveRight() {
      console.log("Moving right");
   }

   moveLeft() {
      this.x -= 0.15;
   }
}
