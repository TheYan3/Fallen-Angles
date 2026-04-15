class rock extends MovableObject {
   width = 200;
   height = 130;
   hitboxWidth = 50;
   hitboxHeight = 50;

   constructor(imagePath, x = 0, y = null, ro = false) {
      super();
      this.loadImage(imagePath);
      this.x = x;
      this.y = y ?? gameSettings.canvasHeight - this.height - 10;
      this.otherDirection = ro;
   }

   getSurfaceY() {
      return this.getHitboxY();
   }

   getTopYFor(mo) {
      return this.getSurfaceY() - mo.height;
   }

   overlapsX(mo, nextX = mo.x) {
      return (
         nextX < this.getHitboxRight() && nextX + mo.width > this.getHitboxX()
      );
   }

   getHitboxX() {
      return this.x + (this.width - this.hitboxWidth) / 2;
   }

   getHitboxY() {
      return this.y + (this.height - this.hitboxHeight) / 2;
   }

   getHitboxRight() {
      return this.getHitboxX() + this.hitboxWidth;
   }

   getHitboxBottom() {
      return this.getHitboxY() + this.hitboxHeight;
   }
}
