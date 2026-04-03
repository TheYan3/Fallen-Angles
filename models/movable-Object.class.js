class MovableObject {
   x = 100;
   y = 360;
   img;
   height = 100;
   width = 100;

   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   moveRight() {
      console.log("Moving right");
   }

   moveLeft() {
      this.x -= 0.15;
   }
}
