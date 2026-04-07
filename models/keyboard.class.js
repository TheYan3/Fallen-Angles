class keyboard {
   LEFT = false;
   RIGHT = false;
   UP = false;
   DOWN = false;
   SPACE = false;
   ATTACK = false;

   constructor() {
      window.addEventListener("keydown", (event) => {
         this.setKeyState(event.key, event.code, true);
      });

      window.addEventListener("keyup", (event) => {
         this.setKeyState(event.key, event.code, false);
      });
   }

   setKeyState(key, code, isPressed) {
      if (key === "ArrowLeft" || key === "a" || key === "A") {
         this.LEFT = isPressed;
      }

      if (key === "ArrowRight" || key === "d" || key === "D") {
         this.RIGHT = isPressed;
      }

      if (key === "ArrowUp" || key === "w" || key === "W") {
         this.UP = isPressed;
      }

      if (key === "ArrowDown" || key === "s" || key === "S") {
         this.DOWN = isPressed;
      }

      if (code === "Space" || key === " ") {
         this.SPACE = isPressed;
      }

      if (key === "j" || key === "J") {
         this.ATTACK = isPressed;
      }
   }
}
