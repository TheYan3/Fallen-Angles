class golem extends MovableObject {
   DEFAULT_SKIN = "Golem_1";
   animationSpeed = 8000 / 60;

   constructor() {
      super();
      let animations = animationLibrary.golem[this.DEFAULT_SKIN];

      this.IMAGES_WAITING = animations.idle;
      this.IMAGES_ATTACKING = animations.slashing;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_RUN = animations.running;

      this.otherDirection = true;
      this.loadImage(this.IMAGES_WAITING[0]);
      this.speed = gameSettings.gameSpeed * 0.3;
      this.x = 300 + Math.random() * 500;
      this.loadImages(this.IMAGES_WAITING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_RUN);
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
