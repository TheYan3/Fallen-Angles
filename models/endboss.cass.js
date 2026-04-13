class endboss extends MovableObject {
   DEFAULT_SKIN = "Wraith_03";
   animationSpeed = 5000 / 60;

   constructor() {
      super();
      let animations = animationLibrary.wraith[this.DEFAULT_SKIN];

      this.IMAGES_IDLE = animations.idle;
      this.IMAGES_IDLE_BLINK = animations.idleBlink;
      this.IMAGES_WALKING = animations.walking;
      this.IMAGES_ATTACKING = animations.attacking;
      this.IMAGES_CASTING = animations.castingSpells;
      this.IMAGES_HURT = animations.hurt;
      this.IMAGES_DYING = animations.dying;
      this.IMAGES_TAUNT = animations.taunt;

      this.otherDirection = true;
      this.speed = 0;
      this.x = 1300;
      this.y = 230;
      this.width = 250;
      this.height = 250;
      this.loadImage(this.IMAGES_IDLE[0]);
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_IDLE_BLINK);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_CASTING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DYING);
      this.loadImages(this.IMAGES_TAUNT);
      this.animation();
   }

   animation() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_IDLE);
      }, this.animationSpeed);
   }
}
