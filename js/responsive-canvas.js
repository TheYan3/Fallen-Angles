const mobileLandscapeQuery =
   "(hover: none) and (pointer: coarse) and (orientation: landscape)";

/**
 * Fits the canvas into mobile landscape viewports without page scrolling.
 */
function updateResponsiveCanvasSize() {
   let canvasElement = document.getElementById("canvas");
   if (!canvasElement) return;

   if (!shouldFitCanvasToMobileLandscape()) {
      resetCanvasDisplaySize(canvasElement);
      return;
   }

   let size = getCanvasDisplaySize();
   canvasElement.style.width = `${size.width}px`;
   canvasElement.style.height = `${size.height}px`;
}

/**
 * Checks if mobile landscape canvas sizing should be active.
 * @returns {boolean}
 */
function shouldFitCanvasToMobileLandscape() {
   return (
      document.body.classList.contains("is-playing") &&
      window.matchMedia(mobileLandscapeQuery).matches
   );
}

/**
 * Removes inline canvas display sizing outside mobile landscape mode.
 * @param {HTMLCanvasElement} canvasElement - Canvas to reset.
 */
function resetCanvasDisplaySize(canvasElement) {
   canvasElement.style.removeProperty("width");
   canvasElement.style.removeProperty("height");
}

/**
 * Calculates the largest canvas size that fits into the current viewport.
 * @returns {{width: number, height: number}}
 */
function getCanvasDisplaySize() {
   let viewportWidth = window.visualViewport?.width || window.innerWidth;
   let viewportHeight = window.visualViewport?.height || window.innerHeight;
   let padding = 16;
   let availableWidth = Math.max(0, viewportWidth - padding);
   let availableHeight = Math.max(0, viewportHeight - padding);
   let aspectRatio = gameSettings.canvasWidth / gameSettings.canvasHeight;
   let width = Math.min(
      availableWidth,
      availableHeight * aspectRatio,
      gameSettings.canvasWidth,
   );

   return {
      width,
      height: width / aspectRatio,
   };
}

/**
 * Recalculates after the browser has applied viewport/orientation changes.
 */
function queueResponsiveCanvasResize() {
   requestAnimationFrame(updateResponsiveCanvasSize);
   setTimeout(updateResponsiveCanvasSize, 200);
}

window.addEventListener("resize", queueResponsiveCanvasResize);
window.addEventListener("orientationchange", queueResponsiveCanvasResize);
window.visualViewport?.addEventListener("resize", queueResponsiveCanvasResize);
