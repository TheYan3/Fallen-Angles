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
   currentImage = 0;

   constructor() {
      super();
      this.loadImage(
         "img/Enemy/Reaper/Reaper_Man_1/PNG/PNG Sequences/Idle/0_Reaper_Man_Idle_000.png",
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
      }, 5000 / 60);
   }
}
