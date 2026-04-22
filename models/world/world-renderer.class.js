class WorldRenderer {
   /**
    * Creates a renderer for one world instance.
    * @param {World} worldInstance - The world to draw.
    */
   constructor(worldInstance) {
      this.world = worldInstance;
   }

   /**
    * Runs the central drawing loop.
    */
   draw() {
      if (this.world.isDestroyed) {
         return;
      }

      this.clearCanvas();

      if (this.world.isGameStopped) {
         this.drawGameEndScreen();
      } else {
         this.drawCameraLayer();
         this.drawUi();
      }

      requestAnimationFrame(this.draw.bind(this));
   }

   /**
    * Wipes the canvas for the next frame.
    */
   clearCanvas() {
      this.world.ctx.clearRect(
         0,
         0,
         this.world.ctx.canvas.width,
         this.world.ctx.canvas.height,
      );
   }

   /**
    * Draws the win or game-over screen.
    */
   drawGameEndScreen() {
      if (this.world.isEndbossDefeated) {
         return this.drawReplayButtonScreen();
      }

      this.drawGameOverScreen();
   }

   /**
    * Draws the win screen with replay button.
    */
   drawReplayButtonScreen() {
      this.world.gameOverScreen.drawWin(this.world.ctx, this.world.canvas);
   }

   /**
    * Draws the game-over screen.
    */
   drawGameOverScreen() {
      this.world.gameOverScreen.draw(this.world.ctx, this.world.canvas);
   }

   /**
    * Draws all camera-shifted world objects.
    */
   drawCameraLayer() {
      this.world.ctx.translate(Math.round(this.world.cameraX), 0);
      this.drawWorldObjects();
      this.resetCamera();
   }

   /**
    * Draws background, objects, enemies, player and rocks.
    */
   drawWorldObjects() {
      this.world.level.skies.forEach((skyObject) =>
         skyObject.draw(this.world.ctx),
      );
      this.addObjectsToMap(this.world.level.clouds);
      this.addObjectsToMap(this.world.level.groundObjects);
      this.addToMap(this.world.character);
      this.addObjectsToMap(this.world.level.powerUps);
      this.addObjectsToMap(this.world.level.enemies);
      this.drawEnemyHealthbars();
      this.addObjectsToMap(this.world.level.rocks);
   }

   /**
    * Resets the camera transform after world drawing.
    */
   resetCamera() {
      this.world.ctx.translate(-Math.round(this.world.cameraX), 0);
   }

   /**
    * Draws fixed UI elements.
    */
   drawUi() {
      this.drawHealthbar();
      this.world.powerUpCounter.draw(this.world.ctx);
   }

   /**
    * Updates and draws the player healthbar.
    */
   drawHealthbar() {
      this.world.healthbar.setHealth(this.world.character.energy);
      this.world.healthbar.draw(this.world.ctx);
   }

   /**
    * Draws healthbars for active enemies.
    */
   drawEnemyHealthbars() {
      this.world.level.enemies.forEach((enemy) => {
         if (this.shouldDrawEnemyHealthbar(enemy)) {
            this.drawEnemyHealthbar(enemy);
         }
      });
   }

   /**
    * Checks if an enemy healthbar should be visible.
    * @param {Object} enemy - Enemy to check.
    * @returns {boolean}
    */
   shouldDrawEnemyHealthbar(enemy) {
      return !enemy.isRemoved && !enemy.isDying && enemy.energy > 0;
   }

   /**
    * Draws one healthbar above an enemy.
    * @param {Object} enemy - Enemy target.
    */
   drawEnemyHealthbar(enemy) {
      let bar = this.getEnemyHealthbar(enemy);
      bar.followObject(enemy);
      bar.setHealth(enemy.energy);
      bar.draw(this.world.ctx);
   }

   /**
    * Gets or creates an enemy healthbar.
    * @param {Object} enemy - Enemy target.
    * @returns {Healthbar}
    */
   getEnemyHealthbar(enemy) {
      if (!enemy.healthbar) {
         enemy.healthbar = this.createEnemyHealthbar(enemy);
      }

      return enemy.healthbar;
   }

   /**
    * Creates an enemy healthbar.
    * @param {Object} enemy - Enemy target.
    * @returns {Healthbar}
    */
   createEnemyHealthbar(enemy) {
      let width = Math.min(160, Math.max(70, enemy.width * 0.6));
      let maxHealth = enemy.maxEnergy ?? enemy.energy;
      let bar = new Healthbar(enemy.x, enemy.y - 12, width, 8, maxHealth);
      bar.hasSideArrows = enemy instanceof Endboss;
      return bar;
   }

   /**
    * Draws every object in a list.
    * @param {Array} objects - Drawable objects.
    */
   addObjectsToMap(objects) {
      if (!Array.isArray(objects)) {
         return;
      }

      objects.forEach((object) => this.addToMap(object));
   }

   /**
    * Draws one object and mirrors it if needed.
    * @param {Object} movableObject - Object to draw.
    */
   addToMap(movableObject) {
      if (!movableObject?.img || movableObject.isRemoved) {
         return;
      }

      if (movableObject.otherDirection) {
         this.flipImage(movableObject);
      } else {
         this.world.ctx.drawImage(
            movableObject.img,
            movableObject.x,
            movableObject.y,
            movableObject.width,
            movableObject.height,
         );
      }

      this.drawHitboxIfEnabled(movableObject);
   }

   /**
    * Draws an object mirrored horizontally.
    * @param {Object} movableObject - Object to mirror.
    */
   flipImage(movableObject) {
      this.world.ctx.save();
      this.world.ctx.scale(-1, 1);
      this.world.ctx.drawImage(
         movableObject.img,
         -movableObject.x - movableObject.width,
         movableObject.y,
         movableObject.width,
         movableObject.height,
      );
      this.world.ctx.restore();
   }

   /**
    * Draws the debug hitbox if enabled.
    * @param {Object} movableObject - Object to mark.
    */
   drawHitboxIfEnabled(movableObject) {
      if (!this.canDrawHitbox(movableObject)) {
         return;
      }

      this.drawRedFrame(movableObject);
   }

   /**
    * Checks if an object can show a hitbox.
    * @param {Object} movableObject - Object to check.
    * @returns {boolean}
    */
   canDrawHitbox(movableObject) {
      return gameSettings.hitboxShown && this.isHitboxObject(movableObject);
   }

   /**
    * Checks if an object type uses debug hitboxes.
    * @param {Object} movableObject - Object to check.
    * @returns {boolean}
    */
   isHitboxObject(movableObject) {
      return (
         movableObject instanceof Player ||
         movableObject instanceof Golem ||
         movableObject instanceof Reaper ||
         movableObject instanceof Minotaur ||
         movableObject instanceof Endboss
      );
   }

   /**
    * Draws a red debug frame around an object.
    * @param {Object} movableObject - Object to mark.
    */
   drawRedFrame(movableObject) {
      this.world.ctx.save();
      this.world.ctx.strokeStyle = "red";
      this.world.ctx.lineWidth = 2;
      this.world.ctx.strokeRect(
         movableObject.x,
         movableObject.y,
         movableObject.width,
         movableObject.height,
      );
      this.world.ctx.restore();
   }
}
