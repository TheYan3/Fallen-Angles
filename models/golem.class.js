class golem extends MovableObject {
   IMAGES_WAITING = [
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_001.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_002.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_003.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_004.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_005.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_006.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_007.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_008.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_009.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_010.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_011.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_012.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_013.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_014.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_015.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_016.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_017.png",
   ];
   IMAGES_ATTACKING = [
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_000.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_001.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_002.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_003.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_004.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_005.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_006.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_007.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_008.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_009.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_010.png",
      "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Slashing/0_Golem_Slashing_011.png",
   ];
   animationSpeed = 8000 / 60;

   constructor() {
      super();
      this.otherDirection = true;
      this.loadImage(
         "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_000.png",
      );
      this.speed = gameSettings.gameSpeed * 0.3;
      this.x = 300 + Math.random() * 500;
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.animation();
      this.moveLeft();
   }
}
