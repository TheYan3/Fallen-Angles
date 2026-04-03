class groundObjects extends MovableObject {
   width = 720; //gleich wie canvas
   height = 480; //gleich wie canvas

   constructor(imagePath) {
      super();
      this.loadImage(imagePath);
      this.y = 480 - this.height; // Position at the bottom of the canvas
      this.x = 0;
   }
}
