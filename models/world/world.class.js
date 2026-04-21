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
   gameStateInterval;
   gameOverClickHandler;
   isDestroyed = false;
   drawTickKey = "world-draw";

   /**
    * Sets up the game world, helpers and game loops.
    * @param {HTMLCanvasElement} canvas - The drawing area.
    * @param {Object} keyboardInput - The keyboard state tracker.
    */
   constructor(canvas, keyboardInput) {
      gameSettings.resetTimeScale();
      this.ctx = canvas.getContext("2d");
      this.keyboardInput = keyboardInput;
      this.canvas = canvas;
      this.character = new player(keyboardInput);
      this.renderer = new WorldRenderer(this);
      this.enemyController = new EnemyController(this);
      this.collision = new WorldCollision(this);
      this.setWorld();
      this.registerGameOverClick();
      this.renderer.draw();
      this.enemyController.moveEnemiesTowardsPlayer();
      this.updateGameState();
   }

   /**
    * Gives the player and enemies access to this world.
    */
   setWorld() {
      this.character.world = this;
      this.level.enemies.forEach((enemy) => {
         enemy.world = this;
      });
   }

   /**
    * Starts the logic loop for collisions, deaths and cleanup.
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
    * Runs one world logic tick.
    */
   runGameStateTick() {
      this.checkPowerUpCollisions();
      this.character.checkDeath();
      this.enemyController.updateEnemyStates();
      this.enemyController.removeRemovedEnemies();
      this.removeCollectedPowerUps();
      this.stopGameIfPlayerIsRemoved();
   }

   /**
    * Checks if the player collects a power-up.
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
    * Checks one power-up against the player.
    * @param {Object} powerUpItem - Power-up to check.
    */
   checkPowerUpCollision(powerUpItem) {
      if (!powerUpItem.isRemoved && this.character.isColliding(powerUpItem)) {
         this.collectPowerUp(powerUpItem);
      }
   }

   /**
    * Checks if power-up collisions should be skipped.
    * @returns {boolean}
    */
   shouldSkipPowerUpCollisions() {
      return this.character.isFearCollisionDisabled?.();
   }

   /**
    * Applies and removes a collected power-up.
    * @param {Object} powerUpItem - Collected power-up.
    */
   collectPowerUp(powerUpItem) {
      this.applyPowerUpEffect(powerUpItem);
      this.powerUpCounter.increment();
      playEffect(audioLibrary.effects.world.collectFeather);
      powerUpItem.collect();
   }

   /**
    * Applies a power-up effect to the player.
    * @param {Object} powerUpItem - Power-up with effect values.
    */
   applyPowerUpEffect(powerUpItem) {
      this.character.energy += powerUpItem.lifeAmount;
      this.healthbar.increaseMaxHealth(powerUpItem.lifeAmount);
   }

   /**
    * Removes collected power-ups from the level.
    */
   removeCollectedPowerUps() {
      this.level.powerUps = this.level.powerUps.filter(
         (powerUpItem) => !powerUpItem.isRemoved,
      );
   }

   /**
    * Ends the game if the player is removed.
    */
   stopGameIfPlayerIsRemoved() {
      if (this.character.isRemoved && !this.isGameStopped) {
         this.isGameStopped = true;
         Music.pause();
         playEffect(audioLibrary.effects.world.gameOver);
      }
   }

   /**
    * Starts slow motion when the endboss starts dying.
    * @param {Object} object - Object that started dying.
    */
   handleObjectStartedDying(object) {
      if (object instanceof endboss) {
         gameSettings.startSlowMotion();
      }
   }

   /**
    * Starts the win state when the endboss finished dying.
    * @param {Object} object - Object that finished dying.
    */
   handleObjectFinishedDying(object) {
      if (object instanceof endboss) {
         this.isEndbossDefeated = true;
         this.isGameStopped = true;
         Music.pause();
         Music = new Audio(audioLibrary.music.win);
         Music.muted = isMuted;
         Music.volume = gameSettings.audioVolume;
         Music.play();
      }
   }

   /**
    * Checks if a rock blocks horizontal movement.
    * @param {Object} movableObject - Moving object.
    * @param {number} speed - Intended horizontal movement.
    * @returns {boolean}
    */
   isBlockedByRock(movableObject, speed) {
      return this.collision.isBlockedByRock(movableObject, speed);
   }

   /**
    * Gets the rock ground Y for a movable object.
    * @param {Object} movableObject - Object to check.
    * @returns {number|null}
    */
   getRockGroundY(movableObject) {
      return this.collision.getRockGroundY(movableObject);
   }

   /**
    * Updates camera position for a character.
    * @param {Object} character - Character to follow.
    */
   updateCameraFor(character) {
      let cameraX = this.getCenteredCameraX(character);
      this.cameraX = Math.min(0, Math.max(cameraX, this.getCameraStopX()));
   }

   /**
    * Calculates camera offset for horizontal centering.
    * @param {Object} character - Character to center.
    * @returns {number}
    */
   getCenteredCameraX(character) {
      let playerCenterX = character.x + character.width / 2;
      return this.canvas.width / 2 - playerCenterX;
   }

   /**
    * Returns the maximum leftward camera limit.
    * @returns {number}
    */
   getCameraStopX() {
      return this.canvas.width - this.level.cameraEndX;
   }

   /**
    * Adds the canvas click listener for the end screen.
    */
   registerGameOverClick() {
      this.gameOverClickHandler = this.handleGameOverClick.bind(this);
      this.canvas.addEventListener("click", this.gameOverClickHandler);
   }

   /**
    * Handles replay clicks on the end screen.
    * @param {MouseEvent} event - Canvas click event.
    */
   handleGameOverClick(event) {
      if (!this.isGameStopped) {
         return;
      }

      let point = this.getCanvasClickPoint(event);
      if (this.gameOverScreen.handleClick(point.x, point.y)) {
         startIngameMusic();
         restartGame();
      }
   }

   /**
    * Converts browser click coordinates to canvas coordinates.
    * @param {MouseEvent} event - Canvas click event.
    * @returns {{x: number, y: number}}
    */
   getCanvasClickPoint(event) {
      let rect = this.canvas.getBoundingClientRect();
      return {
         x: ((event.clientX - rect.left) * this.canvas.width) / rect.width,
         y: ((event.clientY - rect.top) * this.canvas.height) / rect.height,
      };
   }

   /**
    * Stops intervals and event listeners.
    */
   destroy() {
      this.isDestroyed = true;
      this.enemyController.destroy();
      clearInterval(this.gameStateInterval);
      this.canvas.removeEventListener("click", this.gameOverClickHandler);
   }
}
