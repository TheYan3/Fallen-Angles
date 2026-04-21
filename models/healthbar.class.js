class healthbar extends drawableObjects {
   health = 100;
   maxHealth = 100;
   baseMaxHealth = 100;
   baseWidth = 200;
   x = 20;
   y = 20;
   width = 100;
   height = 20;
   hasSideArrows = false;

   /**
    * Creates a healthbar.
    * @param {number} x - Horizontal position.
    * @param {number} y - Vertical position.
    * @param {number} width - Bar width.
    * @param {number} height - Bar height.
    * @param {number} maxHealth - Maximum health.
    */
   constructor(x = 20, y = 20, width = 200, height = 20, maxHealth = 100) {
      super();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.baseWidth = width;
      this.maxHealth = maxHealth;
   }

   /**
    * Updates current health.
    * @param {number} health - New health value.
    */
   setHealth(health) {
      this.health = Math.max(0, health);
      this.maxHealth = Math.max(this.maxHealth, this.health);
   }

   /**
    * Sets the bar position.
    * @param {number} x - Horizontal position.
    * @param {number} y - Vertical position.
    */
   setPosition(x, y) {
      this.x = x;
      this.y = y;
   }

   /**
    * Positions the bar above an object.
    * @param {MovableObject} mo - Object to follow.
    * @param {number} offsetY - Vertical offset.
    */
   followObject(mo, offsetY = -12) {
      this.x = mo.x + mo.width / 2 - this.width / 2;
      this.y = mo.y + offsetY;
   }

   /**
    * Increases max health and bar width.
    * @param {number} amount - Health increase.
    */
   increaseMaxHealth(amount) {
      this.maxHealth += amount;
      this.updateWidth();
   }

   /**
    * Scales width to max health.
    */
   updateWidth() {
      this.width = (this.baseWidth * this.maxHealth) / this.baseMaxHealth;
   }

   /**
    * Draws the full healthbar.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   draw(ctx) {
      this.drawBackground(ctx);
      this.drawHealth(ctx);
      this.drawBorder(ctx);
      this.drawSideArrows(ctx);
   }

   /**
    * Draws the dark background.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   drawBackground(ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   /**
    * Draws the colored health fill.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   drawHealth(ctx) {
      let fillWidth = (this.width * this.health) / this.getSafeMaxHealth();
      ctx.fillStyle = this.getHealthColor();
      ctx.fillRect(this.x, this.y, fillWidth, this.height);
   }

   /**
    * Returns a safe max health value.
    * @returns {number}
    */
   getSafeMaxHealth() {
      return Math.max(1, this.maxHealth);
   }

   /**
    * Draws the bar border.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   drawBorder(ctx) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
   }

   /**
    * Draws optional side arrows.
    * @param {CanvasRenderingContext2D} ctx - Canvas context.
    */
   drawSideArrows(ctx) {
      if (!this.hasSideArrows) {
         return;
      }

      ctx.font = gameSettings.getCanvasFont(22);
      ctx.fillStyle = "red";
      ctx.fillText(">>", this.x - 26, this.y + this.height);
      ctx.fillText("<<", this.x + this.width + 2, this.y + this.height);
   }

   /**
    * Returns the fill color for current health.
    * @returns {string}
    */
   getHealthColor() {
      let percentage = (this.health / this.getSafeMaxHealth()) * 100;
      if (percentage > 50) return "yellow";
      if (percentage > 20) return "orange";
      return "red";
   }
}
