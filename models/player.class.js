class player extends MovableObject {
   DEFAULT_SKIN = "Fallen_Angels_1";
   hitSound = audioLibrary.effects.character.hit;
   deathSound = audioLibrary.effects.character.death;

   y = -100;
   world;
   keyboard;
   isAttacking = false;
   attackKeyHandled = false;
   currentAttackAnimation = null;
   jumpCooldown = 800;
   jumpCooldownEndsAt = 0;
   runSpeed = gameSettings.gameSpeed * 1.3;
   airSpeedMultiplier = 1.2;
   isFeared = false;
   fearSpeedMultiplier = 1;
   fearEndsAt = 0;

   /**
    * Initializes the player, loads all animations from the library
    * and starts the movement/physics systems.
    * @param {Object} keyboard - Keyboard input state object.
    */
   constructor(keyboard) {
      super();
      this.keyboard = keyboard;
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.startSystems();
   }

   /**
    * Maps animation arrays from the animationLibrary to the player instance.
    */
   setAnimations() {
      let animations = animationLibrary.player[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.slashing;
      this.IMAGES_RUN_ATTACKING = animations.runSlashing;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = animations.running;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_JUMPING = animations.jumpStart;
      this.IMAGES_FALLING = animations.fallingDown;
      this.IMAGES_DYING = animations.dying;
   }

   /**
    * Configures starting health and damage for the player.
    */
   setupStats() {
      this.energy = 100;
      this.maxEnergy = 100;
      this.damage = 25;
   }

   /**
    * Preloads all image frames for the character into memory.
    */
   loadAnimationImages() {
      this.loadImage(this.IMAGES_WAITING[0]);
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_RUN_ATTACKING);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUN);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_FALLING);
      this.loadImages(this.IMAGES_DYING);
   }

   /**
    * Triggers gravity, animation, and movement intervals.
    */
   startSystems() {
      this.applyGravity();
      this.animation();
      this.handleMovement();
   }

   /**
    * Starts the 60fps movement loop.
    */
   handleMovement() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-movement`)) {
            return;
         }

         this.updateMovement();
      }, 1000 / 60);
   }

   /**
    * Starts the animation loop.
    * Checks attack states and selects images based on movement/priority.
    */
   animation() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-animation`)) {
            return;
         }

         this.handleAttackState();

         let images = this.getCurrentAnimationImages();
         this.updateAnimationState(images);
         this.playCurrentAnimation(images);
      }, this.animationSpeed);
   }

   /**
    * Logic to initiate an attack.
    * Implements a 2s cooldown (Slashdelay) and prevents multi-triggering
    * on a single key press.
    */
   handleAttackState() {
      if (this.isControlBlocked()) {
         return;
      }

      let timeSinceLastAttack = gameSettings.getGameTime() - this.lastAttackTime;
      if (
         this.keyboard.UP &&
         !this.attackKeyHandled &&
         !this.isAttacking &&
         timeSinceLastAttack >= this.Slashdelay
      ) {
         this.startAttack();
      }

      if (!this.keyboard.UP) {
         this.attackKeyHandled = false;
      }
   }

   /**
    * Determines the correct animation set based on a hierarchy.
    * Priority: Death/Hurt/Fear > Air State (Jump/Fall) > Ground State (Walk/Run/Idle).
    * @returns {string[]} Selected animation frame paths.
    */
   getCurrentAnimationImages() {
      let priorityImages = this.getPriorityAnimationImages();
      if (priorityImages) return priorityImages;

      if (this.isAboveGround()) {
         return this.getAirAnimationImages();
      }

      return this.getGroundAnimationImages();
   }

   /**
    * Handles high-priority state animations.
    * @returns {string[]|null}
    */
   getPriorityAnimationImages() {
      if (this.isDying) return this.IMAGES_DYING;
      if (this.isHurt) return this.IMAGES_HURT;
      if (this.isFeared) return this.IMAGES_RUN;
      if (this.isAttacking) return this.getActiveAttackImages();
      return null;
   }

   /**
    * Returns current attacking images, either stationary or running.
    */
   getActiveAttackImages() {
      return this.currentAttackAnimation || this.IMAGES_ATTACKING;
   }

   /**
    * Selects the correct attack set (Normal vs Running) based on input.
    * @returns {string[]}
    */
   getAttackAnimationImages() {
      let isMoving = this.keyboard.LEFT || this.keyboard.RIGHT;

      if (isMoving && this.keyboard.RUN) {
         return this.IMAGES_RUN_ATTACKING;
      }

      return this.IMAGES_ATTACKING;
   }

   /**
    * Physics logic for jumping.
    * Implements a cooldown and vertical force application.
    * Only allowed if the player is touching the ground.
    */
   jump() {
      if (!this.isAboveGround() && !this.isJumpOnCooldown()) {
         playEffect(audioLibrary.effects.character.jump);
         this.jumpCooldownEndsAt =
            gameSettings.getGameTime() + this.jumpCooldown;
         this.speedY = -17;
      }
   }

   /**
    * Checks if the game-time jump cooldown is still active.
    * @returns {boolean}
    */
   isJumpOnCooldown() {
      return gameSettings.getGameTime() < this.jumpCooldownEndsAt;
   }

   /**
    * Check if the player is currently unable to interact (Hurt/Dying).
    * @returns {boolean}
    */
   isInactive() {
      return this.isHurt || this.isDying || this.isRemoved;
   }

   /**
    * Check if input should be ignored (Inactive or under Fear effect).
    * @returns {boolean}
    */
   isControlBlocked() {
      return this.isInactive() || this.isFeared;
   }

   /**
    * Starts the attack sequence: resets frames and picks the correct animation set.
    */
   startAttack() {
      this.lastAttackTime = gameSettings.getGameTime();
      playEffect(audioLibrary.effects.character.attack);
      this.isAttacking = true;
      this.attackKeyHandled = true;
      this.hasAppliedAttackHit = false;
      this.currentImage = 0;
      this.currentAttackAnimation = this.getAttackAnimationImages();
      this.lastAnimation = this.currentAttackAnimation;
   }

   /**
    * Resets attack-related flags once the animation finishes.
    */
   finishAttack() {
      this.isAttacking = false;
      this.hasAppliedAttackHit = false;
      this.currentAttackAnimation = null;
      this.lastAnimation = null;
   }

   /**
    * Plays the attack animation exactly once.
    */
   playAttackAnimation(images) {
      let animationFinished = this.playAnimationOnce(images);
      if (animationFinished) {
         this.finishAttack();
      }
   }

   /**
    * Main animation router: Handles Dying, Hurt, Attack and normal states.
    */
   playCurrentAnimation(images) {
      if (this.isRemoved) return;
      if (this.isDying) return this.playDyingAnimation();
      if (this.isHurt) return this.playHurtAnimation();
      if (this.isAttacking) return this.playAttackAnimation(images);
      this.playAnimation(images);
   }

   /**
    * Updates world coordinates based on player input or status effects.
    * Updates camera following logic.
    */
   updateMovement() {
      this.updateFearState();

      if (this.isFeared) {
         return this.moveFeared();
      }

      if (this.isInactive()) {
         return;
      }

      this.handleControlledMovement();
      this.updateCamera();
   }

   /**
    * Logic for manual movement (Arrows/WASD).
    * Checks for level boundaries and terrain collisions (rocks).
    */
   handleControlledMovement() {
      let speed = this.getAirMovementSpeed();
      if (this.canMoveRight() && !this.world.isBlockedByRock(this, speed)) {
         this.moveRight(speed);
      }
      if (this.canMoveLeft() && !this.world.isBlockedByRock(this, -speed)) {
         this.moveLeft(speed);
      }
      if (this.canJump()) this.jump();
   }

   /**
    * Initiates the Fear status effect.
    * Forces player movement in the opposite direction and blocks manual control.
    * Automatically stops after the specified duration.
    * @param {number} duration - Effect length in ms.
    * @param {number} speedMultiplier - How much faster the player runs away.
    */
   startFear(duration, speedMultiplier) {
      if (this.isInactive()) return;
      playEffect(audioLibrary.effects.abilities.fear);
      this.isFeared = true;
      this.fearSpeedMultiplier = speedMultiplier;
      this.fearEndsAt = gameSettings.getGameTime() + duration;
      this.finishAttack();
   }

   /**
    * Ends the Fear effect once its game-time duration is over.
    */
   updateFearState() {
      if (this.isFeared && gameSettings.getGameTime() >= this.fearEndsAt) {
         this.stopFear();
      }
   }

   /**
    * Resets the Fear status effect variables.
    */
   stopFear() {
      this.isFeared = false;
      this.fearSpeedMultiplier = 1;
      this.fearEndsAt = 0;
   }

   /**
    * Automatic movement logic while under the Fear effect.
    * Forces the player toward the left edge of the map.
    */
   moveFeared() {
      this.x = Math.max(0, this.x - this.runSpeed * this.fearSpeedMultiplier);
      this.otherDirection = true;
      this.updateCamera();
   }

   /**
    * Movement boundary check for the right side.
    */
   canMoveRight() {
      return (
         !this.isNormalAttackLocked() &&
         this.keyboard.RIGHT &&
         this.x < this.world.level.playerEndX
      );
   }

   /**
    * Movement boundary check for the left side.
    */
   canMoveLeft() {
      return !this.isNormalAttackLocked() && this.keyboard.LEFT && this.x > 0;
   }

   /**
    * Input check for jumping.
    */
   canJump() {
      return (
         this.keyboard.SPACE &&
         !this.isAboveGround() &&
         !this.isJumpOnCooldown()
      );
   }

   /**
    * Logic to disable collisions while feared (player phases through enemies).
    */
   isFearCollisionDisabled() {
      return this.isFeared;
   }

   /**
    * Prevents horizontal movement while performing the stationary
    * slashing attack to make the animation look grounded.
    */
   isNormalAttackLocked() {
      return (
         this.isAttacking &&
         this.currentAttackAnimation === this.IMAGES_ATTACKING
      );
   }

   /**
    * Selects jump-start or falling images based on vertical velocity.
    * @returns {string[]}
    */
   getAirAnimationImages() {
      if (this.speedY < 0) {
         return this.IMAGES_JUMPING;
      }

      return this.IMAGES_FALLING;
   }

   /**
    * Selects walk, run, or idle sets based on horizontal movement keys.
    */
   getGroundAnimationImages() {
      if (this.keyboard.RIGHT && this.keyboard.LEFT) return this.IMAGES_WAITING;
      if ((this.keyboard.RIGHT || this.keyboard.LEFT) && this.keyboard.RUN)
         return this.IMAGES_RUN;
      if (this.keyboard.LEFT || this.keyboard.RIGHT) return this.IMAGES_WALKING;
      return this.IMAGES_WAITING;
   }

   /**
    * Calculates current speed, applying air multipliers if jumping.
    */
   getAirMovementSpeed() {
      let speed = this.getMovementSpeed(this.keyboard.RUN, this.runSpeed);
      if (this.isAboveGround()) return speed * this.airSpeedMultiplier;
      return speed;
   }

   /**
    * Positions the camera so the player is centered, but prevents
    * the camera from showing areas outside the level boundaries.
    */
   updateCamera() {
      let cameraX = this.getCenteredCameraX();
      this.world.cameraX = Math.min(
         0,
         Math.max(cameraX, this.getCameraStopX()),
      );
   }

   /**
    * Calculates camera offset for horizontal centering.
    */
   getCenteredCameraX() {
      let playerCenterX = this.x + this.width / 2;
      return this.world.canvas.width / 2 - playerCenterX;
   }

   /**
    * Determines the maximum leftward pan limit for the camera.
    */
   getCameraStopX() {
      return this.world.canvas.width - this.world.level.cameraEndX;
   }
}
