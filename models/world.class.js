class world {
   character;
   level = createLevel1();
   ctx;
   canvas;
   keyboardInput;
   cameraX = 0;
   enemyActivationDistance = 390;
   enemyStopDistance = 30;
   isGameStopped = false;
   isEndbossDefeated = false;
   powerUpCounter = new powerUpCounter();
   healthbar = new healthbar();
   gameOverScreen = new gameover();
   enemyMoveInterval;
   gameStateInterval;
   gameOverClickHandler;
   isDestroyed = false;
   drawTickKey = "world-draw";

   /**
    * Initializes the game world, set up the character, and starts the game loops.
    * @param {HTMLCanvasElement} canvas - The drawing area.
    * @param {Object} keyboardInput - The keyboard state tracker.
    */
   constructor(canvas, keyboardInput) {
      gameSettings.resetTimeScale();
      this.ctx = canvas.getContext("2d");
      this.keyboardInput = keyboardInput;
      this.canvas = canvas;
      this.character = new player(keyboardInput);
      this.setWorld();
      this.registerGameOverClick();
      this.draw();
      this.moveEnemiesTowardsPlayer();
      this.updateGameState();
   }

   /**
    * Injects the world reference into the character and all enemies
    * for coordinate and collision context.
    */
   setWorld() {
      this.character.world = this;
      this.level.enemies.forEach((enemy) => {
         enemy.world = this;
      });
   }

   /**
    * Starts the interval for the game state logic (collisions, death checks, etc.).
    * Runs at 60 FPS but respects gameSettings time scaling.
    */
   updateGameState() {
      this.gameStateInterval = setInterval(() => {
         if (
            this.isGameStopped ||
            !gameSettings.shouldRunTick("world-game-state")
         ) {
            return;
         }

         this.runGameStateTick();
      }, 1000 / 60);
   }

   /**
    * Main logic tick. Orchestrates collision detection, enemy state updates,
    * and object cleanup.
    */
   runGameStateTick() {
      this.checkPowerUpCollisions();
      this.character.checkDeath();
      this.updateEnemyStates();
      this.removeRemovedEnemies();
      this.removeCollectedPowerUps();
      this.stopGameIfPlayerIsRemoved();
   }

   /**
    * Iterates through all power-ups in the level to check for player contact.
    * Skips checks if the player is currently under certain status effects
    * (like Fear).
    */
   checkPowerUpCollisions() {
      if (this.shouldSkipPowerUpCollisions()) {
         return;
      }

      this.level.powerUps.forEach((powerUpItem) =>
         this.checkPowerUpCollision(powerUpItem),
      );
   }

   /**
    * Checks for a collision between the player and a specific power-up.
    * @param {Object} powerUpItem - The power-up item to check.
    */
   checkPowerUpCollision(powerUpItem) {
      if (!powerUpItem.isRemoved && this.character.isColliding(powerUpItem)) {
         this.collectPowerUp(powerUpItem);
      }
   }

   /**
    * Determines if power-up collisions should be ignored (e.g., during Fear).
    * @returns {boolean}
    */
   shouldSkipPowerUpCollisions() {
      return this.character.isFearCollisionDisabled?.();
   }

   /**
    * Processes the collection of a power-up: applies effects and plays sound.
    * @param {Object} powerUpItem - The collected item.
    */
   collectPowerUp(powerUpItem) {
      this.applyPowerUpEffect(powerUpItem);
      this.powerUpCounter.increment();
      playEffect("audio/World/Collect_Feather.mp3");
      powerUpItem.collect();
   }

   /**
    * Directly modifies character stats based on power-up properties.
    * @param {Object} powerUpItem - The item containing energy values.
    */
   applyPowerUpEffect(powerUpItem) {
      this.character.energy += powerUpItem.lifeAmount;
      this.healthbar.increaseMaxHealth(powerUpItem.lifeAmount);
   }

   /**
    * Checks if a specific enemy is close enough to the player to initiate an attack.
    * @param {Object} enemy - The enemy instance.
    * @returns {boolean} True if the player is within the enemy's stop distance.
    */
   isEnemyInAttackRange(enemy) {
      if (this.character.isFearCollisionDisabled?.()) {
         return false;
      }

      if (!enemy || enemy.isDying || enemy.isRemoved) {
         return false;
      }

      return this.character.isColliding(enemy, this.enemyStopDistance);
   }

   /**
    * Updates status for all enemies: checks for health, triggers
    * attack states based on range, and resets hit flags if animations
    * finished.
    */
   updateEnemyStates() {
      this.level.enemies.forEach((enemy) => {
         enemy.checkDeath();
         enemy.isAttacking = this.isEnemyInAttackRange(enemy);
         this.resetEnemyHit(enemy);
      });
   }

   /**
    * Resets internal attack flags for enemies so they can strike
    * multiple times across different animation cycles.
    * @param {Object} enemy - The enemy instance.
    */
   resetEnemyHit(enemy) {
      if (enemy.attackAnimationCompleted) {
         enemy.hasAppliedAttackHit = false;
         enemy.attackAnimationCompleted = false;
      }

      if (!enemy.isAttacking) {
         enemy.hasAppliedAttackHit = false;
      }
   }

   /**
    * Filters out enemies that have been marked for removal (after death).
    */
   removeRemovedEnemies() {
      this.level.enemies = this.level.enemies.filter(
         (enemy) => !enemy.isRemoved,
      );
   }

   /**
    * Filters out power-ups that have already been collected by the player.
    */
   removeCollectedPowerUps() {
      this.level.powerUps = this.level.powerUps.filter(
         (powerUpItem) => !powerUpItem.isRemoved,
      );
   }

   /**
    * Stops the game loop and triggers the Game Over sequence if the
    * character has been removed from the game.
    */
   stopGameIfPlayerIsRemoved() {
      if (this.character.isRemoved && !this.isGameStopped) {
         this.isGameStopped = true;
         Music.pause();
         playEffect("audio/World/Gamover.wav");
      }
   }

   /**
    * Starts the interval responsible for enemy movement AI.
    */
   moveEnemiesTowardsPlayer() {
      this.enemyMoveInterval = setInterval(() => {
         this.runEnemyMovementTick();
      }, 1000 / 60);
   }

   /**
    * Executes one step of enemy movement.
    * Respects time scaling and checks if the game is active.
    */
   runEnemyMovementTick() {
      if (this.shouldSkipEnemyMovement()) {
         return;
      }

      this.level.enemies.forEach((enemy) => this.moveEnemy(enemy));
   }

   /**
    * Checks if enemy movement should be frozen (Game Over or Slow Motion).
    * @returns {boolean}
    */
   shouldSkipEnemyMovement() {
      return (
         this.isGameStopped ||
         !gameSettings.shouldRunTick("world-enemy-movement")
      );
   }

   /**
    * AI logic for a single enemy. Moves toward the player if aggro is active
    * and respects the stop distance for attacking.
    * Handles rock collision during movement.
    * @param {Object} enemy - The enemy instance.
    */
   moveEnemy(enemy) {
      if (enemy.isDying || enemy.isRemoved) return this.stopEnemy(enemy);
      this.updateEnemyAggro(enemy);
      if (!enemy.isAggro || enemy.isAttacking) return this.stopEnemy(enemy);
      if (enemy.x - this.character.x > this.enemyStopDistance)
         return this.walkEnemyLeft(enemy);
      if (this.character.x - enemy.x > this.enemyStopDistance)
         return this.walkEnemyRight(enemy);
      this.stopEnemy(enemy);
   }

   /**
    * Checks if an enemy should become aggressive based on player proximity.
    * Triggers boss-specific music if the endboss is activated.
    * @param {Object} enemy - The enemy instance.
    */
   updateEnemyAggro(enemy) {
      if (!enemy.isAggro) {
         enemy.isAggro =
            this.character.x >= enemy.x - this.enemyActivationDistance;
         if (enemy.isAggro && enemy instanceof endboss) {
            Music.pause();
            Music = new Audio("audio/Boss/Bossfight_Musik.mp3");
            Music.muted = isMuted;
            Music.volume = 0.5;
            Music.loop = true;
            Music.play();
         }
      }
   }

   /**
    * Initiates walking left for an enemy, checking for terrain obstacles.
    * @param {Object} enemy - The enemy instance.
    */
   walkEnemyLeft(enemy) {
      enemy.isWalking = true;
      if (!this.isBlockedByRock(enemy, -enemy.speed)) {
         enemy.moveLeft();
      }
   }

   /**
    * Initiates walking right for an enemy, checking for terrain obstacles.
    * @param {Object} enemy - The enemy instance.
    */
   walkEnemyRight(enemy) {
      enemy.isWalking = true;
      if (!this.isBlockedByRock(enemy, enemy.speed)) {
         enemy.moveRight();
      }
   }

   /**
    * Stops the walking animation and movement for an enemy.
    * @param {Object} enemy - The enemy instance.
    */
   stopEnemy(enemy) {
      enemy.isWalking = false;
   }

   /**
    * Triggers visual effects (like Slow Motion) when an object (e.g., boss)
    * begins its death sequence.
    */
   handleObjectStartedDying(object) {
      if (object instanceof endboss) {
         gameSettings.startSlowMotion();
      }
   }

   /**
    * Triggers win conditions and music when the endboss finishes its death animation.
    */
   handleObjectFinishedDying(object) {
      if (object instanceof endboss) {
         this.isEndbossDefeated = true;
         this.isGameStopped = true;
         Music.pause();
         Music = new Audio("audio/World/GameWin.mp3");
         Music.muted = isMuted;
         Music.volume = 0.5;
         Music.play();
      }
   }

   /**
    * Checks if a movable object would hit a rock at its next position.
    * Rocks block horizontal movement but allow standing on top.
    * @param {Object} mo - The movable object.
    * @param {number} speed - The intended movement delta.
    * @returns {boolean} True if blocked.
    */
   isBlockedByRock(mo, speed) {
      if (this.ignoresRockCollision(mo)) {
         return false;
      }

      let nextX = mo.x + speed;
      return this.level.rocks.some((rock) =>
         this.wouldCollideWithRock(mo, rock, nextX),
      );
   }

   /**
    * Checks if an object is exempt from rock collision (e.g., Boss or Feared player).
    * @param {Object} mo - The movable object.
    * @returns {boolean}
    */
   ignoresRockCollision(mo) {
      return mo.isFearCollisionDisabled?.() || mo instanceof endboss;
   }

   /**
    * Detailed collision math for rocks.
    * Ignores collisions if the object is high enough to be on the surface.
    * @param {Object} mo - Movable object.
    * @param {Object} rock - Rock object.
    * @param {number} nextX - The X coordinate to test.
    * @returns {boolean}
    */
   wouldCollideWithRock(mo, rock, nextX) {
      if (mo.y + mo.height <= rock.getSurfaceY() + 1) {
         return false;
      }

      return (
         rock.overlapsX(mo, nextX) &&
         mo.y < rock.getHitboxBottom() &&
         mo.y + mo.height > rock.getHitboxY()
      );
   }

   /**
    * Calculates the Y coordinate of the highest rock surface beneath
    * a movable object. Used for gravity/landing logic.
    * @param {Object} mo - The movable object.
    * @returns {number|null} The lowest Y value (highest point) or null if no rock.
    */
   getRockGroundY(mo) {
      let rockYs = this.level.rocks
         .filter((rock) => this.canLandOnRock(mo, rock))
         .map((rock) => rock.getTopYFor(mo));
      return rockYs.length ? Math.min(...rockYs) : null;
   }

   /**
    * Checks if a movable object can land on or is already standing on a rock.
    * @param {Object} mo - The movable object.
    * @param {Object} rock - The rock instance.
    * @returns {boolean}
    */
   canLandOnRock(mo, rock) {
      if (!rock.overlapsX(mo)) {
         return false;
      }

      let surfaceY = rock.getSurfaceY();
      let nextBottom = mo.y + mo.height + mo.speedY;
      let isStanding = Math.abs(mo.y - rock.getTopYFor(mo)) < 1;
      let isLanding = mo.y + mo.height <= surfaceY && nextBottom >= surfaceY;
      return isStanding || isLanding;
   }

   /**
    * Central drawing loop using requestAnimationFrame.
    * Clears canvas and renders layers depending on game state.
    */
   draw() {
      if (this.isDestroyed) {
         return;
      }

      this.clearCanvas();

      if (this.isGameStopped) {
         this.drawGameEndScreen();
      } else {
         this.drawCameraLayer();
         this.drawUi();
      }

      requestAnimationFrame(this.draw.bind(this));
   }

   /**
    * Determines which end screen to show based on whether the
    * boss was defeated or the player died.
    */
   drawGameEndScreen() {
      if (this.isEndbossDefeated) {
         return this.drawReplayButtonScreen();
      }

      this.drawGameOverScreen();
   }

   /**
    * Draws the world frozen in place with the replay button on top.
    */
   drawReplayButtonScreen() {
      this.drawCameraLayer();
      this.drawUi();
      this.gameOverScreen.drawRepeatButton(this.ctx, this.canvas);
   }

   /**
    * Renders the dedicated Game Over screen (black background).
    */
   drawGameOverScreen() {
      this.gameOverScreen.draw(this.ctx, this.canvas);
   }

   /**
    * Attaches a click listener to the canvas to handle UI interactions
    * at the end of the game.
    */
   registerGameOverClick() {
      this.gameOverClickHandler = this.handleGameOverClick.bind(this);
      this.canvas.addEventListener("click", this.gameOverClickHandler);
   }

   /**
    * Checks if a click on the canvas was on the repeat/restart button.
    */
   handleGameOverClick(event) {
      if (!this.isGameStopped) {
         return;
      }

      let point = this.getCanvasClickPoint(event);
      if (this.gameOverScreen.handleClick(point.x, point.y)) {
         restartGame();
      }
   }

   /**
    * Maps global mouse coordinates to coordinates relative to the
    * canvas internal resolution.
    */
   getCanvasClickPoint(event) {
      let rect = this.canvas.getBoundingClientRect();
      return {
         x: ((event.clientX - rect.left) * this.canvas.width) / rect.width,
         y: ((event.clientY - rect.top) * this.canvas.height) / rect.height,
      };
   }

   /**
    * Wipes the canvas for the next frame.
    */
   clearCanvas() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
   }

   /**
    * Applies camera translation, draws the world, and then resets
    * the transformation for UI rendering.
    */
   drawCameraLayer() {
      this.ctx.translate(Math.round(this.cameraX), 0);
      this.drawWorldObjects();
      this.resetCamera();
   }

   /**
    * Renders all game world entities (Background, Enemies, Rocks, Player).
    */
   drawWorldObjects() {
      this.level.skies.forEach((skyObject) => skyObject.draw(this.ctx));
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.groundObjects);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.powerUps);
      this.addObjectsToMap(this.level.enemies);
      this.drawEnemyHealthbars();
      this.addObjectsToMap(this.level.rocks);
   }

   /**
    * Reverses the camera translation to align the coordinate system
    * with the screen for UI elements.
    */
   resetCamera() {
      this.ctx.translate(-Math.round(this.cameraX), 0);
   }

   /**
    * Draws non-moving UI components like the healthbar and power-up count.
    */
   drawUi() {
      this.drawHealthbar();
      this.powerUpCounter.draw(this.ctx);
   }

   /**
    * Synchronizes the UI healthbar with the character's energy and draws it.
    */
   drawHealthbar() {
      this.healthbar.setHealth(this.character.energy);
      this.healthbar.draw(this.ctx);
   }

   /**
    * Renders individual healthbars for all active enemies
    * to show damage progress.
    */
   drawEnemyHealthbars() {
      this.level.enemies.forEach((enemy) => {
         if (this.shouldDrawEnemyHealthbar(enemy)) {
            this.drawEnemyHealthbar(enemy);
         }
      });
   }

   /**
    * Logic to decide if an enemy bar should be rendered (not dead/removed).
    * @returns {boolean}
    */
   shouldDrawEnemyHealthbar(enemy) {
      return !enemy.isRemoved && !enemy.isDying && enemy.energy > 0;
   }

   /**
    * Draws a healthbar that follows an enemy's position.
    * @param {Object} enemy - The enemy target.
    */
   drawEnemyHealthbar(enemy) {
      let bar = this.getEnemyHealthbar(enemy);
      bar.followObject(enemy);
      bar.setHealth(enemy.energy);
      bar.draw(this.ctx);
   }

   /**
    * Retrieves an existing healthbar instance from an enemy or creates
    * a new one if it's the first time it's being hit.
    * @returns {Object} The healthbar instance.
    */
   getEnemyHealthbar(enemy) {
      if (!enemy.healthbar) {
         enemy.healthbar = this.createEnemyHealthbar(enemy);
      }

      return enemy.healthbar;
   }

   /**
    * Factory method for enemy healthbars. Adjusts size based on enemy scale.
    * Adds side arrow decorations for the endboss.
    * @returns {Object} A new healthbar.
    */
   createEnemyHealthbar(enemy) {
      let width = Math.min(160, Math.max(70, enemy.width * 0.6));
      let maxHealth = enemy.maxEnergy ?? enemy.energy;
      let bar = new healthbar(enemy.x, enemy.y - 12, width, 8, maxHealth);
      bar.hasSideArrows = enemy instanceof endboss;
      return bar;
   }

   /**
    * Helper to batch-process a collection of objects for drawing.
    * @param {Array} objects - Collection of drawable objects.
    */
   addObjectsToMap(objects) {
      if (!Array.isArray(objects)) {
         return;
      }

      objects.forEach((o) => {
         this.addToMap(o);
      });
   }

   /**
    * Draws a single movable object. Handles flipping the image
    * based on the 'otherDirection' state.
    */
   addToMap(mo) {
      if (!mo?.img || mo.isRemoved) {
         return;
      }

      if (mo.otherDirection) {
         this.flipImage(mo);
      } else {
         this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
      }

      this.drawHitboxIfEnabled(mo);
   }

   /**
    * Mirror-renders an image horizontally for left-facing movement.
    */
   flipImage(mo) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
      this.ctx.restore();
   }

   /**
    * Debug tool: Draws a red frame around objects if hitbox
    * visualization is enabled in settings.
    */
   drawHitboxIfEnabled(mo) {
      if (!this.canDrawHitbox(mo)) {
         return;
      }

      this.drawRedFrame(mo);
   }

   /**
    * Checks settings and object type for hitbox visibility.
    */
   canDrawHitbox(mo) {
      return gameSettings.hitboxShown && this.isHitboxObject(mo);
   }

   /**
    * Filters objects that should have visible hitboxes (Main entities).
    */
   isHitboxObject(mo) {
      return (
         mo instanceof player ||
         mo instanceof golem ||
         mo instanceof reaper ||
         mo instanceof minotaur ||
         mo instanceof endboss
      );
   }

   /**
    * Actually draws the red debug rectangle.
    * @param {Object} mo - Movable object.
    */
   drawRedFrame(mo) {
      this.ctx.save();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(mo.x, mo.y, mo.width, mo.height);
      this.ctx.restore();
   }

   /**
    * Properly shuts down game world intervals and event listeners
    * to prevent memory leaks and background execution.
    */
   destroy() {
      this.isDestroyed = true;
      clearInterval(this.enemyMoveInterval);
      clearInterval(this.gameStateInterval);
      this.canvas.removeEventListener("click", this.gameOverClickHandler);
   }
}
