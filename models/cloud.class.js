class cloud extends MovableObject {
   constructor(imagePath) {
      super();
      this.loadImage(imagePath);
      this.width = 500;
      this.height = 300;
   }
}
