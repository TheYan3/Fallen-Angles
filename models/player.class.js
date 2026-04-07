class player extends MovableObject {
   IMAGES_WAITING = [
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_000.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_001.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_002.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_003.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_004.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_005.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_006.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_007.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_008.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_009.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_010.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_011.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_012.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_013.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_014.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_015.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_016.png",
   ];
   IMAGES_ATTACKING = [
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_000.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_001.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_002.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_003.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_004.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_005.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_006.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_007.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_008.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_009.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_010.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Slashing/0_Fallen_Angels_Slashing_011.png",
   ];
   IMAGES_WALKING = [
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_000.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_001.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_002.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_003.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_004.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_005.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_006.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_007.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_008.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_009.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_010.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_011.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_012.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_013.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_014.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_015.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_016.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_017.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_018.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_019.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_020.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_021.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_022.png",
      "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Walking/0_Fallen_Angels_Walking_023.png",
   ];

   world;
   keyboard;

   constructor(keyboard) {
      super();
      this.keyboard = keyboard;
      this.loadImage(
         "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_000.png",
      );
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.animation();
   }

   moveRight() {
      if (this.keyboard.RIGHT) {
         animation();
         this.x += this.speed;
      }
   }

   jump() {
      console.log("Jumping");
   }
}
