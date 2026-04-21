class EnemyController {
   enemyMoveInterval;

   /**
    * Creates enemy logic for one world instance.
    * @param {world} worldInstance - The world that owns the enemies.
    */
   constructor(worldInstance) {
      this.world = worldInstance;
   }

   /**
    * Starts enemy movement updates.
    */
   moveEnemiesTowardsPlayer() {
      this.enemyMoveInterval = setInterval(() => {
         this.runEnemyMovementTick();
      }, 1000 / 60);
   }

   /**
    * Runs one enemy movement tick.
    */
   runEnemyMovementTick() {
      if (this.shouldSkipEnemyMovement()) {
         return;
      }

      this.world.level.enemies.forEach((enemy) => this.moveEnemy(enemy));
   }

   /**
    * Checks if enemy movement should pause.
    * @returns {boolean}
    */
   shouldSkipEnemyMovement() {
      return (
         this.world.isGameStopped ||
         !gameSettings.shouldRunTick("world-enemy-movement")
      );
   }

   /**
    * Moves one enemy toward the player.
    * @param {Object} enemy - Enemy to update.
    */
   moveEnemy(enemy) {
      if (enemy.isDying || enemy.isRemoved) return this.stopEnemy(enemy);
      this.updateEnemyAggro(enemy);
      if (!enemy.isAggro || enemy.isAttacking) return this.stopEnemy(enemy);
      if (enemy.x - this.world.character.x > this.world.enemyStopDistance)
         return this.walkEnemyLeft(enemy);
      if (this.world.character.x - enemy.x > this.world.enemyStopDistance)
         return this.walkEnemyRight(enemy);
      this.stopEnemy(enemy);
   }

   /**
    * Activates an enemy when the player is close enough.
    * @param {Object} enemy - Enemy to check.
    */
   updateEnemyAggro(enemy) {
      if (enemy.isAggro) return;
      enemy.isAggro =
         this.world.character.x >=
         enemy.x - this.world.enemyActivationDistance;
      if (enemy.isAggro && enemy instanceof endboss) {
         this.startBossFightAudio();
      }
   }

   /**
    * Starts the boss sound and boss music.
    */
   startBossFightAudio() {
      playEffect(audioLibrary.effects.boss.aggro);
      Music.pause();
      Music = new Audio(audioLibrary.music.bossFight);
      Music.muted = isMuted;
      Music.volume = gameSettings.audioVolume;
      Music.loop = true;
      Music.play();
   }

   /**
    * Moves an enemy left if no rock blocks it.
    * @param {Object} enemy - Enemy to move.
    */
   walkEnemyLeft(enemy) {
      enemy.isWalking = true;
      if (!this.world.isBlockedByRock(enemy, -enemy.speed)) {
         enemy.moveLeft();
      }
   }

   /**
    * Moves an enemy right if no rock blocks it.
    * @param {Object} enemy - Enemy to move.
    */
   walkEnemyRight(enemy) {
      enemy.isWalking = true;
      if (!this.world.isBlockedByRock(enemy, enemy.speed)) {
         enemy.moveRight();
      }
   }

   /**
    * Stops enemy walking.
    * @param {Object} enemy - Enemy to stop.
    */
   stopEnemy(enemy) {
      enemy.isWalking = false;
   }

   /**
    * Updates enemy death, attack and hit state.
    */
   updateEnemyStates() {
      this.world.level.enemies.forEach((enemy) => {
         enemy.checkDeath();
         enemy.isAttacking = this.isEnemyInAttackRange(enemy);
         this.resetEnemyHit(enemy);
      });
   }

   /**
    * Checks if an enemy can attack the player.
    * @param {Object} enemy - Enemy to check.
    * @returns {boolean}
    */
   isEnemyInAttackRange(enemy) {
      if (this.world.character.isFearCollisionDisabled?.()) {
         return false;
      }

      if (!enemy || enemy.isDying || enemy.isRemoved) {
         return false;
      }

      return this.world.character.isColliding(
         enemy,
         this.world.enemyStopDistance,
      );
   }

   /**
    * Resets attack hit flags after an animation cycle.
    * @param {Object} enemy - Enemy to update.
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
    * Removes enemies that finished their death cleanup.
    */
   removeRemovedEnemies() {
      this.world.level.enemies = this.world.level.enemies.filter(
         (enemy) => !enemy.isRemoved,
      );
   }

   /**
    * Stops enemy intervals.
    */
   destroy() {
      clearInterval(this.enemyMoveInterval);
   }
}
