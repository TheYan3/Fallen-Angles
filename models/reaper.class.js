class reaper extends MovableObject {
   IMAGES_WAITING = [
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_000.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_001.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_002.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_003.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_004.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_005.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_006.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_007.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_008.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_009.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_010.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_011.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_012.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_013.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_014.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_015.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_016.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_017.png",
   ];
   IMAGES_ATTACKING = [
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_000.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_001.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_002.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_003.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_004.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_005.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_006.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_007.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_008.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_009.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_010.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Slashing/0_Reaper_Man_Slashing_011.png",
   ];
   IMAGES_WALKING = [
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_000.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_001.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_002.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_003.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_004.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_005.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_006.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_007.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_008.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_009.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_010.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_011.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_012.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_013.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_014.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_015.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_016.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_017.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_018.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_019.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_020.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_021.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_022.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Walking/0_Reaper_Man_Walking_023.png",
   ];
   IMAGES_RUN = [
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_000.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_001.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_002.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_003.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_004.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_005.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_006.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_007.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_008.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_009.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_010.png",
      "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Running/0_Reaper_Man_Running_011.png",
   ];
   animationSpeed = 5000 / 60;

   constructor() {
      super();
      this.otherDirection = true;
      this.loadImage(
         "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_000.png",
      );
      this.speed = gameSettings.gameSpeed * 0.7;
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
