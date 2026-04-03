class cloud extends MovableObject {
   width = 500;
   height = 300;

   constructor(imagePath, index, cloudCount) {
      super();
      this.loadImage(imagePath);
      this.cloudCount = cloudCount;
      this.index = index;
      this.shouldMove = index !== 0;
      this.randomizePosition();
      this.animation();
   }

   animation() {
      setInterval(() => {
         if (this.shouldMove) {
            this.x -= 0.2;
         }
         if (this.x < -this.width) {
            this.randomizePosition();
            this.x = gameSettings.canvasWidth;
         }
      }, 1000 / 60);
   }

   randomizePosition() {
      this.x = this.index + Math.random();
      this.y = Math.random() * (gameSettings.canvasHeight / 2 - this.height);
   }
}
