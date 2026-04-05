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
   currentImage = 0;

   constructor() {
      super();
      this.otherDirection = true;
      this.loadImage(
         "img/Enemy/Golem/Golem_1/PNG/PNG Sequences/Idle/0_Golem_Idle_000.png",
      );

      this.x = 300 + Math.random() * 500;
      this.loadImages(this.IMAGES_WAITING);
      this.animation();
   }

   animation() {
      setInterval(() => {
         let path = this.IMAGES_WAITING[this.currentImage];
         this.img = this.imageCache[path];
         this.currentImage =
            (this.currentImage + 1) % this.IMAGES_WAITING.length;
      }, 8000 / 60);
   }
}
