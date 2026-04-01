class MovableObject {
   x;
   y;
   img;
   height;
   width;

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
