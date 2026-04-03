class cloud extends MovableObject {
   constructor(imagePath, index, cloudCount) {
      super();
      this.loadImage(imagePath);
      this.width = 500;
      this.height = 300;

      let sectionWidth = gameSettings.canvasWidth / cloudCount;
      this.x = index * sectionWidth + Math.random() * sectionWidth;
      this.y = Math.random() * (gameSettings.canvasHeight / 2 - this.height);
   }
}
