class Player extends MovableObject {
   DEFAULT_SKIN = "Fallen_Angels_1";
   hitSound = audioLibrary.effects.character.hit;
   deathSound = audioLibrary.effects.character.death;

   y = -100;
   world;
   keyboard;
   attack;
   statusEffects;
   isAttacking = false;
   jumpCooldown = 800;
   jumpCooldownEndsAt = 0;
   runSpeed = gameSettings.gameSpeed * 1.3;
   airSpeedMultiplier = 1.2;

   /**
    * Initializes the player, loads all animations from the library
    * and starts the movement/physics systems.
    * @param {Object} keyboard - Keyboard input state object.
    */
   constructor(keyboard) {
      super();
      this.keyboard = keyboard;
      this.attack = new PlayerAttack(this);
      this.statusEffects = new PlayerStatusEffects(this);
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

         this.attack.handleState();

         let images = this.getCurrentAnimationImages();
         this.updateAnimationState(images);
         this.playCurrentAnimation(images);
      }, this.animationSpeed);
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
      if (this.statusEffects.isFeared) return this.IMAGES_RUN;
      if (this.isAttacking) return this.attack.getActiveImages();
      return null;
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
      return this.isInactive() || this.statusEffects.isFeared;
   }

   /**
    * Main animation router: Handles Dying, Hurt, Attack and normal states.
    */
   playCurrentAnimation(images) {
      if (this.isRemoved) return;
      if (this.isDying) return this.playDyingAnimation();
      if (this.isHurt) return this.playHurtAnimation();
      if (this.isAttacking) return this.attack.playAnimation(images);
      this.playAnimation(images);
   }

   /**
    * Updates world coordinates based on player input or status effects.
    * Updates camera following logic.
    */
   updateMovement() {
      this.statusEffects.updateFearState();

      if (this.statusEffects.isFeared) {
         return this.statusEffects.moveFeared();
      }

      if (this.isInactive()) {
         return;
      }

      this.handleControlledMovement();
      this.world.updateCameraFor(this);
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
    * Movement boundary check for the right side.
    */
   canMoveRight() {
      return (
         !this.attack.isNormalAttackLocked() &&
         this.keyboard.RIGHT &&
         this.x < this.world.level.playerEndX
      );
   }

   /**
    * Movement boundary check for the left side.
    */
   canMoveLeft() {
      return (
         !this.attack.isNormalAttackLocked() && this.keyboard.LEFT && this.x > 0
      );
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
    * Starts the Fear status effect.
    * @param {number} duration - Effect length in ms.
    * @param {number} speedMultiplier - Fear movement speed multiplier.
    */
   startFear(duration, speedMultiplier) {
      this.statusEffects.startFear(duration, speedMultiplier);
   }

   /**
    * Checks if Fear disables collisions.
    * @returns {boolean}
    */
   isFearCollisionDisabled() {
      return this.statusEffects.isFearCollisionDisabled();
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

}
