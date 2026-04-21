/**
 * Creates the first game level.
 * @returns {Level} The configured level.
 */
function createLevel1() {
   const enemies = createEnemies();

   return new Level(
      enemies,
      createClouds(),
      createSkies(),
      createGroundObjects(),
      createRocks(enemies),
      createPowerUps(2700),
   );
}

function createEnemies() {
   return [new golem(), new minotaur(), new reaper(), new endboss()];
}

function createClouds() {
   return getCloudPaths()
      .sort(() => Math.random() - 0.5)
      .map((path) => new cloud(path));
}

function getCloudPaths() {
   return [
      "img/Background/PNG/game_background_1/layers/clouds_2.png",
      "img/Background/PNG/game_background_1/layers/clouds_3.png",
      "img/Background/PNG/game_background_1/layers/clouds_4.png",
   ];
}

function createSkies() {
   return [-719, 0, 719, 719 * 2, 719 * 3].map((x) => new sky(x));
}

function createGroundObjects() {
   return getGroundPositions().flatMap((x) => createGroundPair(x));
}

function getGroundPositions() {
   return [-719, 0, 719, 719 * 2, 719 * 3];
}

function createGroundPair(x) {
   return getGroundPaths().map((path) => new groundObjects(path, x));
}

function getGroundPaths() {
   return [
      "img/Background/PNG/game_background_1/layers/rocks_1.png",
      "img/Background/PNG/game_background_1/layers/rocks_2.png",
   ];
}

const ROCK_WIDTH = 200;
const ROCK_SPAWN_PADDING = 80;
const ROCK_SPAWN_ATTEMPTS = 50;

/**
 * Creates all rocks without overlapping enemy spawn positions.
 * @param {MovableObject[]} enemies - Enemies placed in the level.
 * @returns {rock[]} Rocks for the level.
 */
function createRocks(enemies) {
   return [createFirstRock(enemies), createSecondRock(enemies)];
}

/**
 * Creates the first rock.
 * @param {MovableObject[]} enemies - Enemies to avoid.
 * @returns {rock} The first rock.
 */
function createFirstRock(enemies) {
   return createSafeRock(
      "img/Barrier/PNG/middle_lane_rocks2/middle_lane_rock2_1.png",
      300,
      800,
      enemies,
      false,
   );
}

/**
 * Creates the second rock.
 * @param {MovableObject[]} enemies - Enemies to avoid.
 * @returns {rock} The second rock.
 */
function createSecondRock(enemies) {
   return createSafeRock(
      "img/Barrier/PNG/middle_lane_rocks2/middle_lane_rock2_2.png",
      1000,
      2800,
      enemies,
      true,
   );
}

/**
 * Creates one rock at a safe x position.
 * @param {string} imagePath - Rock image path.
 * @param {number} minX - Minimum spawn x.
 * @param {number} maxX - Maximum spawn x.
 * @param {MovableObject[]} enemies - Enemies to avoid.
 * @param {boolean} ro - Whether the rock is mirrored.
 * @returns {rock} A new rock.
 */
function createSafeRock(imagePath, minX, maxX, enemies, ro) {
   let x = getSafeRockX(minX, maxX, enemies);
   return new rock(imagePath, x, null, ro);
}

/**
 * Returns a random x position that avoids enemies when possible.
 * @param {number} minX - Minimum spawn x.
 * @param {number} maxX - Maximum spawn x.
 * @param {MovableObject[]} enemies - Enemies to avoid.
 * @returns {number} A safe or fallback x position.
 */
function getSafeRockX(minX, maxX, enemies) {
   let x = minX;
   for (let i = 0; i < ROCK_SPAWN_ATTEMPTS; i++) {
      x = minX + Math.random() * (maxX - minX);
      if (!isRockOnEnemy(x, enemies)) return x;
   }
   return x;
}

/**
 * Checks if a rock overlaps any enemy spawn area.
 * @param {number} rockX - Rock x position.
 * @param {MovableObject[]} enemies - Enemies to check.
 * @returns {boolean} True if the rock overlaps an enemy.
 */
function isRockOnEnemy(rockX, enemies) {
   let rockEndX = rockX + ROCK_WIDTH;
   return enemies.some((enemy) => {
      let enemyStartX = enemy.x - ROCK_SPAWN_PADDING;
      let enemyEndX = enemy.x + enemy.width + ROCK_SPAWN_PADDING;
      return rangesOverlap(rockX, rockEndX, enemyStartX, enemyEndX);
   });
}

/**
 * Checks if two horizontal ranges overlap.
 * @param {number} startA - First range start.
 * @param {number} endA - First range end.
 * @param {number} startB - Second range start.
 * @param {number} endB - Second range end.
 * @returns {boolean} True if both ranges overlap.
 */
function rangesOverlap(startA, endA, startB, endB) {
   return startA < endB && endA > startB;
}

function createPowerUps(levelEndX) {
   return [0, 1, 2].map((index) => {
      return new powerUp(
         getRandomPowerUpX(index, levelEndX),
         getRandomPowerUpY(),
      );
   });
}

function getRandomPowerUpX(index, levelEndX) {
   let minX = 220;
   let maxX = levelEndX - 220;
   let laneWidth = (maxX - minX) / 3;
   let laneStart = minX + index * laneWidth;
   let laneEnd = laneStart + laneWidth - 120;
   return laneStart + Math.random() * (laneEnd - laneStart);
}

function getRandomPowerUpY() {
   let groundY = gameSettings.canvasHeight - 110;
   let jumpHeight = getPlayerJumpHeight();
   let maxY = groundY - jumpHeight * 0.45;
   let minY = groundY - jumpHeight * 0.85;
   return minY + Math.random() * (maxY - minY);
}

function getPlayerJumpHeight() {
   let jumpSpeed = 17;
   let gravity = 0.6;
   return (jumpSpeed * jumpSpeed) / (2 * gravity);
}
