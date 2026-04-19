class world {
   character;
   level = createLevel1();
   ctx;
   canvas;
   keyboardInput;
   camara_x = 0;
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
   drawTickKey = "world-draw";

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

   setWorld() {
      this.character.world = this;
      this.level.enemies.forEach((enemy) => {
         enemy.world = this;
      });
   }

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

   runGameStateTick() {
      this.checkPowerUpCollisions();
      this.character.checkDeath();
      this.updateEnemyStates();
      this.removeRemovedEnemies();
      this.removeCollectedPowerUps();
      this.stopGameIfPlayerIsRemoved();
   }

   checkPowerUpCollisions() {
      if (this.shouldSkipPowerUpCollisions()) {
         return;
      }

      this.level.powerUps.forEach((powerUpItem) =>
         this.checkPowerUpCollision(powerUpItem),
      );
   }

   checkPowerUpCollision(powerUpItem) {
      if (!powerUpItem.isRemoved && this.character.isColliding(powerUpItem)) {
         this.collectPowerUp(powerUpItem);
      }
   }

   shouldSkipPowerUpCollisions() {
      return this.character.isFearCollisionDisabled?.();
   }

   collectPowerUp(powerUpItem) {
      this.applyPowerUpEffect(powerUpItem);
      this.powerUpCounter.increment();
      powerUpItem.collect();
   }

   applyPowerUpEffect(powerUpItem) {
      this.character.energy += powerUpItem.lifeAmount;
      this.healthbar.increaseMaxHealth(powerUpItem.lifeAmount);
   }

   isEnemyInAttackRange(enemy) {
      if (this.character.isFearCollisionDisabled?.()) {
         return false;
      }

      if (!enemy || enemy.isDying || enemy.isRemoved) {
         return false;
      }

      return this.character.isColliding(enemy, this.enemyStopDistance);
   }

   updateEnemyStates() {
      this.level.enemies.forEach((enemy) => {
         enemy.checkDeath();
         enemy.isAttacking = this.isEnemyInAttackRange(enemy);
         this.resetEnemyHit(enemy);
      });
   }

   resetEnemyHit(enemy) {
      if (enemy.attackAnimationCompleted) {
         enemy.hasAppliedAttackHit = false;
         enemy.attackAnimationCompleted = false;
      }

      if (!enemy.isAttacking) {
         enemy.hasAppliedAttackHit = false;
      }
   }

   removeRemovedEnemies() {
      this.level.enemies = this.level.enemies.filter(
         (enemy) => !enemy.isRemoved,
      );
   }

   removeCollectedPowerUps() {
      this.level.powerUps = this.level.powerUps.filter(
         (powerUpItem) => !powerUpItem.isRemoved,
      );
   }

   stopGameIfPlayerIsRemoved() {
      if (this.character.isRemoved) {
         this.isGameStopped = true;
      }
   }

   moveEnemiesTowardsPlayer() {
      this.enemyMoveInterval = setInterval(() => {
         if (
            this.isGameStopped ||
            !gameSettings.shouldRunTick("world-enemy-movement")
         ) {
            return;
         }

         this.level.enemies.forEach((enemy) => {
            this.moveEnemy(enemy);
         });
      }, 1000 / 60);
   }

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

   updateEnemyAggro(enemy) {
      if (!enemy.isAggro) {
         enemy.isAggro =
            this.character.x >= enemy.x - this.enemyActivationDistance;
      }
   }

   walkEnemyLeft(enemy) {
      enemy.isWalking = true;
      if (!this.isBlockedByRock(enemy, -enemy.speed)) {
         enemy.moveLeft();
      }
   }

   walkEnemyRight(enemy) {
      enemy.isWalking = true;
      if (!this.isBlockedByRock(enemy, enemy.speed)) {
         enemy.moveRight();
      }
   }

   stopEnemy(enemy) {
      enemy.isWalking = false;
   }

   handleObjectStartedDying(object) {
      if (object instanceof endboss) {
         gameSettings.startSlowMotion();
      }
   }

   handleObjectFinishedDying(object) {
      if (object instanceof endboss) {
         this.isEndbossDefeated = true;
         this.isGameStopped = true;
      }
   }

   isBlockedByRock(mo, speed) {
      if (this.ignoresRockCollision(mo)) {
         return false;
      }

      let nextX = mo.x + speed;
      return this.level.rocks.some((rock) =>
         this.wouldCollideWithRock(mo, rock, nextX),
      );
   }

   ignoresRockCollision(mo) {
      return mo.isFearCollisionDisabled?.() || mo instanceof endboss;
   }

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

   getRockGroundY(mo) {
      let rockYs = this.level.rocks
         .filter((rock) => this.canLandOnRock(mo, rock))
         .map((rock) => rock.getTopYFor(mo));
      return rockYs.length ? Math.min(...rockYs) : null;
   }

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

   draw() {
      if (this.isGameStopped) {
         return this.drawGameEndScreen();
      }

      if (gameSettings.shouldRunTick(this.drawTickKey)) {
         this.clearCanvas();
         this.drawCameraLayer();
         this.drawUi();
      }

      requestAnimationFrame(this.draw.bind(this));
   }

   drawGameEndScreen() {
      if (this.isEndbossDefeated) {
         return this.drawReplayButtonScreen();
      }

      this.drawGameOverScreen();
   }

   drawReplayButtonScreen() {
      this.clearCanvas();
      this.drawCameraLayer();
      this.drawUi();
      this.gameOverScreen.drawRepeatButton(this.ctx, this.canvas);
   }

   drawGameOverScreen() {
      this.clearCanvas();
      this.gameOverScreen.draw(this.ctx, this.canvas);

      if (!this.gameOverScreen.isImageReady()) {
         requestAnimationFrame(this.draw.bind(this));
      }
   }

   registerGameOverClick() {
      this.gameOverClickHandler = this.handleGameOverClick.bind(this);
      this.canvas.addEventListener("click", this.gameOverClickHandler);
   }

   handleGameOverClick(event) {
      if (!this.isGameStopped) {
         return;
      }

      let point = this.getCanvasClickPoint(event);
      if (this.gameOverScreen.handleClick(point.x, point.y)) {
         restartGame();
      }
   }

   getCanvasClickPoint(event) {
      let rect = this.canvas.getBoundingClientRect();
      return {
         x: ((event.clientX - rect.left) * this.canvas.width) / rect.width,
         y: ((event.clientY - rect.top) * this.canvas.height) / rect.height,
      };
   }

   clearCanvas() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
   }

   drawCameraLayer() {
      this.ctx.translate(Math.round(this.camara_x), 0);
      this.drawWorldObjects();
      this.resetCamera();
   }

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

   resetCamera() {
      this.ctx.translate(-Math.round(this.camara_x), 0);
   }

   drawUi() {
      this.drawHealthbar();
      this.powerUpCounter.draw(this.ctx);
   }

   drawHealthbar() {
      this.healthbar.setHealth(this.character.energy);
      this.healthbar.draw(this.ctx);
   }

   drawEnemyHealthbars() {
      this.level.enemies.forEach((enemy) => {
         if (this.shouldDrawEnemyHealthbar(enemy)) {
            this.drawEnemyHealthbar(enemy);
         }
      });
   }

   shouldDrawEnemyHealthbar(enemy) {
      return !enemy.isRemoved && !enemy.isDying && enemy.energy > 0;
   }

   drawEnemyHealthbar(enemy) {
      let bar = this.getEnemyHealthbar(enemy);
      bar.followObject(enemy);
      bar.setHealth(enemy.energy);
      bar.draw(this.ctx);
   }

   getEnemyHealthbar(enemy) {
      if (!enemy.healthbar) {
         enemy.healthbar = this.createEnemyHealthbar(enemy);
      }

      return enemy.healthbar;
   }

   createEnemyHealthbar(enemy) {
      let width = Math.min(160, Math.max(70, enemy.width * 0.6));
      let maxHealth = enemy.maxEnergy ?? enemy.energy;
      let bar = new healthbar(enemy.x, enemy.y - 12, width, 8, maxHealth);
      bar.hasSideArrows = enemy instanceof endboss;
      return bar;
   }

   addObjectsToMap(objects) {
      if (!Array.isArray(objects)) {
         return;
      }

      objects.forEach((o) => {
         this.addToMap(o);
      });
   }

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

   flipImage(mo) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
      this.ctx.restore();
   }

   drawHitboxIfEnabled(mo) {
      if (!this.canDrawHitbox(mo)) {
         return;
      }

      this.drawRedFrame(mo);
   }

   canDrawHitbox(mo) {
      return gameSettings.hitboxShown && this.isHitboxObject(mo);
   }

   isHitboxObject(mo) {
      return (
         mo instanceof player ||
         mo instanceof golem ||
         mo instanceof reaper ||
         mo instanceof minotaur ||
         mo instanceof endboss
      );
   }

   drawRedFrame(mo) {
      this.ctx.save();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(mo.x, mo.y, mo.width, mo.height);
      this.ctx.restore();
   }

   destroy() {
      clearInterval(this.enemyMoveInterval);
      clearInterval(this.gameStateInterval);
      this.canvas.removeEventListener("click", this.gameOverClickHandler);
   }
}
