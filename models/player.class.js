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
   IMAGES_WALKING = [];

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
