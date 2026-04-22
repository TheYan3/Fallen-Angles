class PlayerAttack {
   attackKeyHandled = false;
   currentAttackAnimation = null;

   /**
    * Creates the attack controller for a player.
    * @param {Player} owner - Player using this attack state.
    */
   constructor(owner) {
      this.owner = owner;
   }

   /**
    * Checks input and starts an attack when allowed.
    */
   handleState() {
      if (this.owner.isControlBlocked()) {
         return;
      }

      let timeSinceLastAttack =
         gameSettings.getGameTime() - this.owner.lastAttackTime;
      if (this.canStartAttack(timeSinceLastAttack)) {
         this.start();
      }

      if (!this.owner.keyboard.UP) {
         this.attackKeyHandled = false;
      }
   }

   /**
    * Checks if attack input can start a new attack.
    * @param {number} timeSinceLastAttack - Time since last attack.
    * @returns {boolean}
    */
   canStartAttack(timeSinceLastAttack) {
      return (
         this.owner.keyboard.UP &&
         !this.attackKeyHandled &&
         !this.owner.isAttacking &&
         timeSinceLastAttack >= this.owner.Slashdelay
      );
   }

   /**
    * Returns current attacking images.
    * @returns {string[]}
    */
   getActiveImages() {
      return this.currentAttackAnimation || this.owner.IMAGES_ATTACKING;
   }

   /**
    * Selects normal or running attack images.
    * @returns {string[]}
    */
   getAttackImages() {
      let isMoving = this.owner.keyboard.LEFT || this.owner.keyboard.RIGHT;

      if (isMoving && this.owner.keyboard.RUN) {
         return this.owner.IMAGES_RUN_ATTACKING;
      }

      return this.owner.IMAGES_ATTACKING;
   }

   /**
    * Starts the attack sequence.
    */
   start() {
      this.owner.lastAttackTime = gameSettings.getGameTime();
      playEffect(audioLibrary.effects.character.attack);
      this.owner.isAttacking = true;
      this.attackKeyHandled = true;
      this.owner.hasAppliedAttackHit = false;
      this.owner.currentImage = 0;
      this.currentAttackAnimation = this.getAttackImages();
      this.owner.lastAnimation = this.currentAttackAnimation;
   }

   /**
    * Ends the active attack and clears attack state.
    */
   finish() {
      this.owner.isAttacking = false;
      this.owner.hasAppliedAttackHit = false;
      this.currentAttackAnimation = null;
      this.owner.lastAnimation = null;
   }

   /**
    * Plays the attack animation once.
    * @param {string[]} images - Attack animation frames.
    */
   playAnimation(images) {
      let animationFinished = this.owner.playAnimationOnce(images);
      if (animationFinished) {
         this.finish();
      }
   }

   /**
    * Checks if movement is blocked by a normal attack.
    * @returns {boolean}
    */
   isNormalAttackLocked() {
      return (
         this.owner.isAttacking &&
         this.currentAttackAnimation === this.owner.IMAGES_ATTACKING
      );
   }
}
