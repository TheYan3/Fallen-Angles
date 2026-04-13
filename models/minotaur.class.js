class minotaur extends MovableObject {
   DEFAULT_SKIN = "Minotaur_01";

   constructor() {
      super();
      let animations = animationLibrary.minotaur[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.attacking;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = [];

      this.otherDirection = true;
      this.loadImage(this.IMAGES_WAITING[0]);
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
