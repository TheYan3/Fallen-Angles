class endboss extends MovableObject {
   DEFAULT_SKIN = "Wraith_03";
   animationSpeed = 5000 / 60;
   attackFrameDelay = 1.5;
   abilityUsed = false;
   isCasting = false;
   fearSpawnCount = 3;

   /**
    * Initializes the boss entity with high health, abilities,
    * and a unique animation set.
    */
   constructor() {
      super();
      this.setAnimations();
      this.setupStats();
      this.loadAnimationImages();
      this.createAbilities();
      this.animation();
   }

   /**
    * Loads specific Wraith skin animations into state variables.
    */
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

   /**
    * Configures boss-specific stats (HP, position, scale, speed).
    */
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

   /**
    * Preloads all boss animation frames.
    */
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

   /**
    * Instantiates the Abilities controller for the boss.
    */
   createAbilities() {
      this.abilities = new Abilities(this, {
         healthThreshold: 50,
      });
   }

   /**
    * Starts the 60fps animation update cycle.
    */
   animation() {
      setInterval(() => {
         if (!gameSettings.shouldRunTick(`${this.timeScaleId}-animation`)) {
            return;
         }

         this.playStateAnimation();
      }, this.animationSpeed);
   }

   /**
    * Determines the current image set based on casting, movement or hurt state.
    * @returns {string[]}
    */
   getCurrentAnimationImages() {
      let priorityImages = this.getPriorityAnimationImages();
      if (priorityImages) return priorityImages;
      return this.IMAGES_IDLE;
   }

   /**
    * State-priority hierarchy for boss animations.
    * @returns {string[]|null}
    */
   getPriorityAnimationImages() {
      if (this.isHurt) return this.IMAGES_HURT;
      if (this.isCasting) return this.IMAGES_CASTING;
      if (this.isAttacking) return this.IMAGES_ATTACKING;
      if (this.isAggro && this.isWalking) return this.IMAGES_WALKING;
      return null;
   }

   /**
    * Routes state to animation playback.
    * Triggers ability checks every tick to see if health threshold is reached.
    */
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

   /**
    * Plays the casting sequence once.
    * Notifies the Abilities controller to finish the effects once
    * the visual sequence ends.
    */
   playCastingAnimation(images) {
      let isFinished = this.playAnimationOnce(images);
      if (isFinished) {
         this.abilities.finishCasting();
      }
   }

   /**
    * AI logic to summon a group of random enemies after
    * a Fear ability is cast, overwhelming the player.
    */
   spawnEnemiesAfterFear() {
      if (!this.canSpawnEnemiesAfterFear()) {
         return;
      }

      for (let i = 0; i < this.fearSpawnCount; i++) {
         this.spawnFearEnemy(i);
      }
   }

   /**
    * Safety check to ensure player is still active before spawning reinforcements.
    */
   canSpawnEnemiesAfterFear() {
      return Boolean(this.world?.character);
   }

   /**
    * Instantiates a single reinforcement enemy and positions it
    * relative to the player.
    */
   spawnFearEnemy(index) {
      let enemy = this.createFearSpawnEnemy();
      this.positionFearSpawnEnemy(enemy, index);
      enemy.world = this.world;
      enemy.isAggro = true;
      this.world.level.enemies.push(enemy);
   }

   /**
    * Picks a random standard enemy type for the summons.
    */
   createFearSpawnEnemy() {
      let enemyTypes = [golem, reaper, minotaur];
      let EnemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      return new EnemyType();
   }

   /**
    * Places spawned enemies ahead of the player to block their path
    * during the fear escape.
    */
   positionFearSpawnEnemy(enemy, index) {
      let characterX = this.world.character.x;
      let spawnRange = this.world.enemyActivationDistance;
      let spawnOffset = 80 + Math.random() * spawnRange + index * enemy.width;
      enemy.x = characterX + spawnOffset;
      enemy.otherDirection = true;
   }
}
