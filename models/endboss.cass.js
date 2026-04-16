class endboss extends MovableObject {
   DEFAULT_SKIN = "Wraith_03";
   animationSpeed = 5000 / 60;
   attackFrameDelay = 1.5;
   abilityUsed = false;
   isCasting = false;

   constructor() {
      super();
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.createAbilities();
      this.animation();
   }

   setAnimations() {
      let animations = animationLibrary.wraith[this.DEFAULT_SKIN];

      this.IMAGES_IDLE = animations.idle;
      this.IMAGES_IDLE_BLINK = animations.idleBlink;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_ATTACKING = animations.attacking;
      this.IMAGES_CASTING = animations.castingSpells;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_DYING = animations.dying;
      this.IMAGES_TAUNT = animations.taunt;
   }

   setupStats() {
      this.otherDirection = true;
      this.energy = 200;
      this.maxEnergy = 200;
      this.damage = 50;
      this.speed = gameSettings.gameSpeed * 0.4;
      this.x = 2000;
      this.y = 230;
      this.width = 250;
      this.height = 250;
   }

   loadAnimationImages() {
      this.loadImage(this.IMAGES_IDLE[0]);
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_IDLE_BLINK);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_CASTING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DYING);
      this.loadImages(this.IMAGES_TAUNT);
   }

   createAbilities() {
      this.abilities = new Abilities(this, {
         healthThreshold: 50,
      });
   }

   animation() {
      setInterval(() => {
         this.playStateAnimation();
      }, this.animationSpeed);
   }

   getCurrentAnimationImages() {
      let priorityImages = this.getPriorityAnimationImages();
      if (priorityImages) return priorityImages;
      return this.IMAGES_IDLE;
   }

   getPriorityAnimationImages() {
      if (this.isHurt) return this.IMAGES_HURT;
      if (this.isCasting) return this.IMAGES_CASTING;
      if (this.isAttacking) return this.IMAGES_ATTACKING;
      if (this.isAggro && this.isWalking) return this.IMAGES_WALKING;
      return null;
   }

   playStateAnimation() {
      if (this.isRemoved) return;
      if (this.isDying) return this.playDyingAnimation();
      if (this.isHurt) return this.playHurtAnimation();
      this.abilities.check();
      let images = this.getCurrentAnimationImages();
      this.updateAnimationState(images);
      if (this.isCasting) return this.playCastingAnimation(images);
      this.playAnimationWithDelay(
         images,
         this.isAttacking ? this.attackFrameDelay : 1,
      );
   }

   playCastingAnimation(images) {
      let isFinished = this.playAnimationOnce(images);
      if (isFinished) {
         this.abilities.finishCasting();
      }
   }
}
