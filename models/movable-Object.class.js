class MovableObject extends drawableObjects {
   static nextTimeScaleId = 0;

   timeScaleId = MovableObject.nextTimeScaleId++;
   speed = gameSettings.gameSpeed * 0.3;
   currentImage = 0;
   lastAnimation = null;
   animationTick = 0;
   animationSpeed = 4000 / 60;
   attackAnimationSpeed = 4000 / 60;
   hurtAnimationSteps = 2;
   speedY = 0;
   acceleration = 0.6;
   groundY = gameSettings.canvasHeight - 110;
   isAggro = false;
   isAttacking = false;
   isWalking = false;
   energy = 50;
   maxEnergy = 50;
   damage = 0;
   attackAnimationCompleted = false;
   hasAppliedAttackHit = false;
   isHurt = false;
   isDying = false;
   isRemoved = false;
   Slashdelay = 1500;
   lastAttackTime = Number.NEGATIVE_INFINITY;
   lastHitTime = Number.NEGATIVE_INFINITY;

   /**
    * Starts the gravity physics loop.
    * Continuously calculates the current ground level (rocks or floor)
    * and adjusts the object's vertical position and velocity.
    */
   applyGravity() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-gravity`)) {
            return;
         }

         let floorY = this.getCurrentGroundY();
         if (this.isAboveGround() || this.speedY < 0)
            return this.fallToFloor(floorY);
         this.landOnFloor(floorY);
      }, 1000 / 60);
   }

   /**
    * Checks if the object is currently in the air.
    * @returns {boolean} True if the Y coordinate is less than the current ground Y.
    */
   isAboveGround() {
      return this.y < this.getCurrentGroundY();
   }

   /**
    * Determines the Y coordinate the object should currently stand on.
    * Checks for rock surfaces first, then defaults to the level floor.
    * @returns {number}
    */
   getCurrentGroundY() {
      return this.getRockGroundY() ?? this.groundY;
   }

   /**
    * Queries the world for any rock surface coordinates at the object's position.
    * @returns {number|null}
    */
   getRockGroundY() {
      return this.world?.getRockGroundY(this) ?? null;
   }

   /**
    * Physics logic for falling. Increments position by velocity
    * and velocity by acceleration. Prevents falling through the floor.
    * @param {number} floorY - The target Y coordinate to land on.
    */
   fallToFloor(floorY) {
      this.y += this.speedY;
      this.speedY += this.acceleration;
      if (this.y > floorY) this.landOnFloor(floorY);
   }

   /**
    * Logic for hitting the ground. Triggers landing sound if the player
    * falls at significant speed.
    * @param {number} floorY - The exact Y coordinate to snap to.
    */
   landOnFloor(floorY) {
      if (this.speedY > 0 && this instanceof player) {
         playEffect("audio/Charakter/landing_on_Ground.mp3");
      }
      this.y = floorY;
      this.speedY = 0;
   }

   /**
    * Basic horizontal movement to the right.
    * @param {number} speed - The distance to move.
    */
   moveRight(speed = this.speed) {
      this.x += speed;
      this.otherDirection = false;
   }

   /**
    * Basic horizontal movement to the left.
    * @param {number} speed - The distance to move.
    */
   moveLeft(speed = this.speed) {
      this.x -= speed;
      this.otherDirection = true;
   }

   /**
    * Helper to determine speed based on whether the object is running.
    * @param {boolean} isRunning - Whether the RUN key/state is active.
    * @param {number} runSpeed - The speed to use when running.
    * @returns {number} The calculated movement speed.
    */
   getMovementSpeed(isRunning = false, runSpeed = this.speed) {
      return isRunning ? runSpeed : this.speed;
   }

   /**
    * Plays a simple repeating animation cycle.
    * @param {string[]} images - Array of image paths for the animation.
    */
   playAnimation(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage = (this.currentImage + 1) % images.length;
   }

   /**
    * Plays an animation with a frame delay to slow down the playback
    * relative to the game's tick rate.
    * @param {string[]} images - Array of image paths.
    * @param {number} frameDelay - Number of ticks to stay on one frame.
    */
   playAnimationWithDelay(images, frameDelay = 1) {
      this.showCurrentAnimationFrame(images);
      this.animationTick++;
      if (this.shouldKeepAnimationFrame(frameDelay)) return;
      this.advanceDelayedAnimation(images);
   }

   showCurrentAnimationFrame(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
   }

   shouldKeepAnimationFrame(frameDelay) {
      return this.animationTick < frameDelay;
   }

   advanceDelayedAnimation(images) {
      this.currentImage = (this.currentImage + 1) % images.length;
      this.markFinishedAttackCycle(images);
      this.animationTick = 0;
   }

   getEnemyAnimationImages(waitingImages) {
      if (this.isHurt) return this.IMAGES_HURT;
      if (this.isAttacking) return this.IMAGES_ATTACKING;
      if (this.isAggro && this.isWalking) return this.IMAGES_WALKING;
      return waitingImages;
   }

   /**
    * Higher-level logic to play the correct enemy animation.
    * Handles death and hurt overrides automatically.
    * @param {string[]} waitingImages - Default idle images.
    */
   playEnemyStateAnimation(waitingImages) {
      if (this.isRemoved) return;
      if (this.isDying) return this.playDyingAnimation();
      if (this.isHurt) return this.playHurtAnimation();
      let images = this.getEnemyAnimationImages(waitingImages);
      this.updateAnimationState(images);
      this.playAnimationWithDelay(
         images,
         this.isAttacking ? this.attackFrameDelay : 1,
      );
   }

   /**
    * Plays a sequence of images exactly once.
    * @param {string[]} images - Sequence paths.
    * @returns {boolean} True if the sequence has completed.
    */
   playAnimationOnce(images) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;

      if (this.currentImage >= images.length) {
         this.currentImage = 0;
         return true;
      }

      return false;
   }

   /**
    * Detects if an animation set has changed and resets currentImage
    * to ensure animations start at frame 0.
    * @param {string[]} images - The animation set to check.
    */
   updateAnimationState(images) {
      if (this.lastAnimation !== images) {
         this.currentImage = 0;
         this.lastAnimation = images;
         this.animationTick = 0;
         this.resetAttackCycle(images);
      }
   }

   /**
    * Flags when an attack animation has completed a full cycle.
    * Used to allow re-triggering of damage application.
    * @param {string[]} images - The currently playing set.
    */
   markFinishedAttackCycle(images) {
      if (
         this.isAttacking &&
         images === this.IMAGES_ATTACKING &&
         this.currentImage === 0
      ) {
         this.attackAnimationCompleted = true;
      }
   }

   /**
    * Resets the attack completion flag if the current animation
    * is no longer an attack animation.
    * @param {string[]} images - Currently playing set.
    */
   resetAttackCycle(images) {
      if (images !== this.IMAGES_ATTACKING) {
         this.attackAnimationCompleted = false;
      }
   }

   /**
    * Basic AABB collision check. Triggers combat damage application if a hit occurs.
    * @param {Object} otherObject - Object to check against.
    * @param {number} overlap - Margin to subtract from hitbox for precision.
    */
   isColliding(otherObject, overlap = 0) {
      if (!otherObject) {
         return false;
      }

      let isColliding = this.isTouchingHitbox(otherObject, overlap);
      this.applyCombatDamage(otherObject, isColliding);
      return isColliding;
   }

   /**
    * Checks if damage should be dealt between two colliding objects.
    * Respects status effects like Fear which disable physical combat.
    * @param {Object} otherObject - Colliding object.
    * @param {boolean} isColliding - Whether hitboxes overlap.
    */
   applyCombatDamage(otherObject, isColliding) {
      if (this.hasDisabledFearCollision(otherObject)) {
         return;
      }

      this.applyEnemyAttackDamage(otherObject, isColliding);
      this.applyPlayerAttackDamage(otherObject, isColliding);
   }

   /**
    * Checks if either object has fear collision disabled.
    * @returns {boolean}
    */
   hasDisabledFearCollision(otherObject) {
      return (
         this.isFearCollisionDisabled?.() ||
         otherObject.isFearCollisionDisabled?.()
      );
   }

   /**
    * Mathematical check for AABB intersection.
    * @returns {boolean}
    */
   isTouchingHitbox(otherObject, overlap) {
      return (
         this.x + overlap < otherObject.x + otherObject.width &&
         this.x + this.width - overlap > otherObject.x &&
         this.y < otherObject.y + otherObject.height &&
         this.y + this.height > otherObject.y
      );
   }

   /**
    * Logic for enemies hitting the player.
    * Applies damage if collision is true and attacker is in attack state.
    * @param {Object} otherObject - Potential target.
    */
   applyEnemyAttackDamage(otherObject, isColliding) {
      if (!isColliding || !otherObject.canHitEnemy()) {
         return;
      }

      this.receiveDamage(otherObject.damage);
      otherObject.hasAppliedAttackHit = true;
   }

   /**
    * Logic for player hitting an enemy.
    * Applies damage and marks the hit as applied for this cycle.
    */
   applyPlayerAttackDamage(otherObject, isColliding) {
      if (!isColliding || !this.canHitEnemy()) {
         return;
      }

      otherObject.receiveDamage(this.damage);
      this.hasAppliedAttackHit = true;
   }

   /**
    * State check to see if an object is currently capable of dealing damage.
    * Prevents damage spamming during a single frame.
    */
   canHitEnemy() {
      return this.isAttacking && !this.hasAppliedAttackHit && !this.isDying;
   }

   /**
    * Monitors energy and initiates the dying process if health reaches zero.
    */
   checkDeath() {
      if (this.energy > 0 || this.isDying || this.isRemoved) {
         return;
      }

      this.startDying();
   }

   /**
    * Initializes death state: stops movement, clears flags,
    * and plays death-specific audio.
    */
   startDying() {
      this.whousDeath();
      this.isDying = true;
      this.isHurt = false;
      this.isAttacking = false;
      this.isWalking = false;
      this.attackAnimationCompleted = false;
      this.hasAppliedAttackHit = false;
      this.currentImage = 0;
      this.lastAnimation = null;
      this.animationTick = 0;
      this.world?.handleObjectStartedDying?.(this);
   }

   /**
    * Plays the dying animation sequence exactly once.
    * Triggers the final removal of the object from the world
    * once the animation finishes.
    */
   playDyingAnimation() {
      this.updateAnimationState(this.IMAGES_DYING);
      let isFinished = this.playAnimationOnce(this.IMAGES_DYING);
      if (isFinished) {
         this.world?.handleObjectFinishedDying?.(this);
         this.isRemoved = true;
      }
   }

   /**
    * Deducts health from the object. Implements invincibility frames
    * (i-frames) of 0.5s to prevent instant death from multi-hit collisions.
    * @param {number} amount - Damage to subtract.
    */
   receiveDamage(amount) {
      if (this.isDying || this.isRemoved || this.isInvincible()) {
         return;
      }

      this.energy = Math.max(0, this.energy - amount);
      this.lastHitTime = gameSettings.getGameTime();
      if (this.energy > 0) {
         this.startHurt();
      }
   }

   /**
    * Checks if the object is still in its invincibility period after a hit.
    * @returns {boolean}
    */
   isInvincible() {
      let timePassed = gameSettings.getGameTime() - this.lastHitTime;
      return timePassed < 500; // 0,5 Sekunden in Millisekunden
   }

   /**
    * Transitions the object into the hurt state.
    * Resets animation parameters to play the hurt sequence from the start.
    */
   startHurt() {
      if (!this.IMAGES_HURT?.length) {
         return;
      }
      this.whousHit();
      this.isHurt = true;
      this.isAttacking = false;
      this.isWalking = false;
      this.currentImage = 0;
      this.lastAnimation = null;
      this.animationTick = 0;
   }

   /**
    * Plays the correct 'get hit' audio effect based on the class instance type
    * (Player, Minotaur, etc.).
    */
   whousHit() {
      playEffect("audio/Charakter/SuccesHit.mp3");
      if (this instanceof minotaur) {
         playEffect("audio/Minotaur/Minotaur_get_Hit.mp3");
      }
      if (this instanceof reaper) {
         playEffect("audio/Reaper/Reaper_Hit.mp3");
      }
      if (this instanceof golem) {
         playEffect("audio/Golem/Golem_Hurt.mp3");
      }
      if (this instanceof endboss) {
         playEffect("audio/Boss/Boss_hurt.mp3");
      }
      if (this instanceof player) {
         playEffect("audio/Charakter/get_hit.mp3");
      }
   }

   /**
    * Plays the correct 'dying' audio effect based on the class instance type.
    */
   whousDeath() {
      if (this instanceof minotaur) {
         playEffect("audio/Minotaur/Minotaur_death.mp3");
      }
      if (this instanceof reaper) {
         playEffect("audio/Reaper/Reaper_death.mp3");
      }
      if (this instanceof golem) {
         playEffect("audio/Golem/golem_death.mp3");
      }
      if (this instanceof endboss) {
         playEffect("audio/Boss/Boss_death.mp3");
      }
      if (this instanceof player) {
         playEffect("audio/Charakter/Dying_Charakter.mp3");
      }
   }

   /**
    * Higher-level logic to play the hurt animation sequence.
    * Automatically resets the hurt state once finished.
    */
   playHurtAnimation() {
      this.updateAnimationState(this.IMAGES_HURT);
      let isFinished = this.playAnimationSteps(
         this.IMAGES_HURT,
         this.hurtAnimationSteps,
      );
      if (isFinished) {
         this.isHurt = false;
      }
   }

   /**
    * Plays an animation for a specific number of loop iterations.
    * @param {string[]} images - Sequence paths.
    * @param {number} steps - How many times to repeat the animation.
    */
   playAnimationSteps(images, steps) {
      let isFinished = false;

      for (let i = 0; i < steps; i++) {
         isFinished = this.playAnimationOnce(images);
         if (isFinished) {
            return true;
         }
      }

      return isFinished;
   }
}
