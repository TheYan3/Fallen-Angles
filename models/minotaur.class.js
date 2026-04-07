class minotaur extends MovableObject {
   IMAGES_WAITING = [
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_000.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_001.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_002.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_003.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_004.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_005.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_006.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_007.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_008.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_009.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_010.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_011.png",
   ];
   IMAGES_ATTACKING = [
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_000.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_001.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_002.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_003.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_004.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_005.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_006.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_007.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_008.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_009.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_010.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Attacking/Minotaur_01_Attacking_011.png",
   ];
   IMAGES_WALKING = [
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_000.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_001.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_002.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_003.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_004.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_005.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_006.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_007.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_008.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_009.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_010.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_011.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_012.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_013.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_014.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_015.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_016.png",
      "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Walking/Minotaur_01_Walking_017.png",
   ];
   IMAGES_RUN = [];

   constructor() {
      super();
      this.otherDirection = true;
      this.loadImage(
         "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_000.png",
      );
      this.speed = gameSettings.gameSpeed * 1.1;
      this.x = 300 + Math.random() * 500;
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_WALKING);
      this.animation();
      this.moveLeft();
   }

   animation() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
      }, this.animationSpeed);
   }

   attackAnimation() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_ATTACKING);
      }, this.attackAnimationSpeed);
   }
}
