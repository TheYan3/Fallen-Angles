class Rock extends MovableObject {
   width = 200;
   height = 130;
   hitboxWidth = 50;
   hitboxHeight = 50;

   /**
    * Creates a rock obstacle.
    * @param {string} imagePath - Rock image path.
    * @param {number} x - Horizontal position.
    * @param {number|null} y - Optional vertical position.
    * @param {boolean} ro - Whether the image is mirrored.
    */
   constructor(imagePath, x = 0, y = null, ro = false) {
      super();
      this.loadImage(imagePath);
      this.x = x;
      this.y = y ?? gameSettings.canvasHeight - this.height - 10;
      this.otherDirection = ro;
   }

   /**
    * Returns the y position characters can stand on.
    * @returns {number}
    */
   getSurfaceY() {
      return this.getHitboxY();
   }

   /**
    * Returns the top y position for a moving object.
    * @param {MovableObject} mo - Object standing on the rock.
    * @returns {number}
    */
   getTopYFor(mo) {
      return this.getSurfaceY() - mo.height;
   }

   /**
    * Checks horizontal overlap with another object.
    * @param {MovableObject} mo - Object to test.
    * @param {number} nextX - Tested x position.
    * @returns {boolean}
    */
   overlapsX(mo, nextX = mo.x) {
      return (
         nextX < this.getHitboxRight() && nextX + mo.width > this.getHitboxX()
      );
   }

   /**
    * Returns the hitbox x position.
    * @returns {number}
    */
   getHitboxX() {
      return this.x + (this.width - this.hitboxWidth) / 2;
   }

   /**
    * Returns the hitbox y position.
    * @returns {number}
    */
   getHitboxY() {
      return this.y + (this.height - this.hitboxHeight) / 2;
   }

   /**
    * Returns the right edge of the hitbox.
    * @returns {number}
    */
   getHitboxRight() {
      return this.getHitboxX() + this.hitboxWidth;
   }

   /**
    * Returns the bottom edge of the hitbox.
    * @returns {number}
    */
   getHitboxBottom() {
      return this.getHitboxY() + this.hitboxHeight;
   }
}
