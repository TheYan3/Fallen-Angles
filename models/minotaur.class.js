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
   currentImage = 0;

   constructor() {
      super();
      this.otherDirection = true;
      this.loadImage(
         "img/Enemy/Minotaur/PNG/Minotaur_01/PNG Sequences/Idle/Minotaur_01_Idle_000.png",
      );
      this.speed = gameSettings.gameSpeed * 1.1;
      this.x = 300 + Math.random() * 500;
      this.loadImages(this.IMAGES_WAITING);
      this.animation();
      this.moveLeft();
   }

   animation() {
      setInterval(() => {
         let path = this.IMAGES_WAITING[this.currentImage];
         this.img = this.imageCache[path];
         this.currentImage =
            (this.currentImage + 1) % this.IMAGES_WAITING.length;
      }, 4000 / 60);
   }
}
