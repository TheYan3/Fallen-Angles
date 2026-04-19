class keyboard {
   LEFT = false;
   RIGHT = false;
   UP = false;
   DOWN = false;
   SPACE = false;
   ATTACK = false;
   RUN = false;

   constructor() {
      window.addEventListener("keydown", (event) => {
         this.setKeyState(event.key, event.code, true);
      });

      window.addEventListener("keyup", (event) => {
         this.setKeyState(event.key, event.code, false);
      });
   }

   setKeyState(key, code, isPressed) {
      this.setMovementKeyState(key, isPressed);
      this.setActionKeyState(key, code, isPressed);
      this.setRunKeyState(key, isPressed);
   }

   setMovementKeyState(key, isPressed) {
      this.setHorizontalKeyState(key, isPressed);
      this.setVerticalKeyState(key, isPressed);
   }

   setHorizontalKeyState(key, isPressed) {
      if (key === "ArrowLeft" || key === "a" || key === "A") {
         this.LEFT = isPressed;
      }

      if (key === "ArrowRight" || key === "d" || key === "D") {
         this.RIGHT = isPressed;
      }
   }

   setVerticalKeyState(key, isPressed) {
      if (key === "ArrowUp" || key === "w" || key === "W") {
         this.UP = isPressed;
      }

      if (key === "ArrowDown" || key === "s" || key === "S") {
         this.DOWN = isPressed;
      }
   }

   setActionKeyState(key, code, isPressed) {
      if (code === "Space" || key === " ") {
         this.SPACE = isPressed;
      }

      if (key === "f" || key === "F") {
         this.ATTACK = isPressed;
      }
   }

   setRunKeyState(key, isPressed) {
      if (key === "Shift") {
         this.RUN = isPressed;
      }
   }
}
