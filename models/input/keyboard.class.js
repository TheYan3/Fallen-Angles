class Keyboard {
   LEFT = false;
   RIGHT = false;
   UP = false;
   DOWN = false;
   SPACE = false;
   ATTACK = false;
   RUN = false;

   /**
    * Registers keyboard listeners.
    */
   constructor() {
      window.addEventListener("keydown", (event) => {
         this.setKeyState(event.key, event.code, true);
      });

      window.addEventListener("keyup", (event) => {
         this.setKeyState(event.key, event.code, false);
      });
   }

   /**
    * Updates all matching key states.
    * @param {string} key - Pressed key value.
    * @param {string} code - Physical key code.
    * @param {boolean} isPressed - Whether the key is pressed.
    */
   setKeyState(key, code, isPressed) {
      this.setMovementKeyState(key, isPressed);
      this.setActionKeyState(key, code, isPressed);
      this.setRunKeyState(key, isPressed);
   }

   /**
    * Updates movement key states.
    * @param {string} key - Pressed key value.
    * @param {boolean} isPressed - Whether the key is pressed.
    */
   setMovementKeyState(key, isPressed) {
      this.setHorizontalKeyState(key, isPressed);
      this.setVerticalKeyState(key, isPressed);
   }

   /**
    * Updates left and right keys.
    * @param {string} key - Pressed key value.
    * @param {boolean} isPressed - Whether the key is pressed.
    */
   setHorizontalKeyState(key, isPressed) {
      if (key === "ArrowLeft" || key === "a" || key === "A") {
         this.LEFT = isPressed;
      }

      if (key === "ArrowRight" || key === "d" || key === "D") {
         this.RIGHT = isPressed;
      }
   }

   /**
    * Updates up and down keys.
    * @param {string} key - Pressed key value.
    * @param {boolean} isPressed - Whether the key is pressed.
    */
   setVerticalKeyState(key, isPressed) {
      if (key === "ArrowUp" || key === "w" || key === "W") {
         this.UP = isPressed;
      }

      if (key === "ArrowDown" || key === "s" || key === "S") {
         this.DOWN = isPressed;
      }
   }

   /**
    * Updates jump and attack keys.
    * @param {string} key - Pressed key value.
    * @param {string} code - Physical key code.
    * @param {boolean} isPressed - Whether the key is pressed.
    */
   setActionKeyState(key, code, isPressed) {
      if (code === "Space" || key === " ") {
         this.SPACE = isPressed;
      }

      if (key === "f" || key === "F") {
         this.ATTACK = isPressed;
      }
   }

   /**
    * Updates the run key.
    * @param {string} key - Pressed key value.
    * @param {boolean} isPressed - Whether the key is pressed.
    */
   setRunKeyState(key, isPressed) {
      if (key === "Shift") {
         this.RUN = isPressed;
      }
   }
}
