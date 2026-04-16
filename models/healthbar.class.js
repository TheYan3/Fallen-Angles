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

   constructor(x = 20, y = 20, width = 200, height = 20, maxHealth = 100) {
      super();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.baseWidth = width;
      this.maxHealth = maxHealth;
   }

   setHealth(health) {
      this.health = Math.max(0, health);
      this.maxHealth = Math.max(this.maxHealth, this.health);
   }

   setPosition(x, y) {
      this.x = x;
      this.y = y;
   }

   followObject(mo, offsetY = -12) {
      this.x = mo.x + mo.width / 2 - this.width / 2;
      this.y = mo.y + offsetY;
   }

   increaseMaxHealth(amount) {
      this.maxHealth += amount;
      this.updateWidth();
   }

   updateWidth() {
      this.width = (this.baseWidth * this.maxHealth) / this.baseMaxHealth;
   }

   draw(ctx) {
      this.drawBackground(ctx);
      this.drawHealth(ctx);
      this.drawBorder(ctx);
      this.drawSideArrows(ctx);
   }

   drawBackground(ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   drawHealth(ctx) {
      let fillWidth = (this.width * this.health) / this.getSafeMaxHealth();
      ctx.fillStyle = this.getHealthColor();
      ctx.fillRect(this.x, this.y, fillWidth, this.height);
   }

   getSafeMaxHealth() {
      return Math.max(1, this.maxHealth);
   }

   drawBorder(ctx) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
   }

   drawSideArrows(ctx) {
      if (!this.hasSideArrows) {
         return;
      }

      ctx.font = gameSettings.getCanvasFont(22);
      ctx.fillStyle = "red";
      ctx.fillText(">>", this.x - 26, this.y + this.height);
      ctx.fillText("<<", this.x + this.width + 2, this.y + this.height);
   }

   getHealthColor() {
      let percentage = (this.health / this.getSafeMaxHealth()) * 100;
      if (percentage > 50) return "yellow";
      if (percentage > 20) return "orange";
      return "red";
   }
}
