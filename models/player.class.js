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
   currentImage = 0;

   constructor() {
      super().loadImage(
         "img/Player/Fallen-Angles/Fallen_Angels_1/PNG/PNG Sequences/Idle/0_Fallen_Angels_Idle_000.png",
      );
      this.loadImages(this.IMAGES_WAITING);
      this.animation();
   }

   animation() {
      setInterval(() => {
         let path = this.IMAGES_WAITING[this.currentImage];
         this.img = this.imageCache[path];
         this.currentImage =
            (this.currentImage + 1) % this.IMAGES_WAITING.length;
      }, 4000 / 60);
   }

   jump() {
      console.log("Jumping");
   }
}
