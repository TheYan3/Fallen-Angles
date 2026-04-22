class WorldCollision {
   /**
    * Creates collision helpers for one world instance.
    * @param {World} worldInstance - The world with rocks and entities.
    */
   constructor(worldInstance) {
      this.world = worldInstance;
   }

   /**
    * Checks if a rock blocks horizontal movement.
    * @param {Object} movableObject - Moving object.
    * @param {number} speed - Intended horizontal movement.
    * @returns {boolean}
    */
   isBlockedByRock(movableObject, speed) {
      if (this.ignoresRockCollision(movableObject)) {
         return false;
      }

      let nextX = movableObject.x + speed;
      return this.world.level.rocks.some((rock) =>
         this.wouldCollideWithRock(movableObject, rock, nextX),
      );
   }

   /**
    * Checks if an object should ignore rock collision.
    * @param {Object} movableObject - Object to check.
    * @returns {boolean}
    */
   ignoresRockCollision(movableObject) {
      return (
         movableObject.isFearCollisionDisabled?.() ||
         movableObject instanceof Endboss
      );
   }

   /**
    * Checks detailed collision with one rock.
    * @param {Object} movableObject - Moving object.
    * @param {Object} rock - Rock to test.
    * @param {number} nextX - Next X position.
    * @returns {boolean}
    */
   wouldCollideWithRock(movableObject, rock, nextX) {
      if (movableObject.y + movableObject.height <= rock.getSurfaceY() + 1) {
         return false;
      }

      return (
         rock.overlapsX(movableObject, nextX) &&
         movableObject.y < rock.getHitboxBottom() &&
         movableObject.y + movableObject.height > rock.getHitboxY()
      );
   }

   /**
    * Gets the rock Y position an object can stand on.
    * @param {Object} movableObject - Object to place.
    * @returns {number|null}
    */
   getRockGroundY(movableObject) {
      let rockYs = this.world.level.rocks
         .filter((rock) => this.canLandOnRock(movableObject, rock))
         .map((rock) => rock.getTopYFor(movableObject));
      return rockYs.length ? Math.min(...rockYs) : null;
   }

   /**
    * Checks if an object can land on a rock.
    * @param {Object} movableObject - Object to check.
    * @param {Object} rock - Rock to check.
    * @returns {boolean}
    */
   canLandOnRock(movableObject, rock) {
      if (!rock.overlapsX(movableObject)) {
         return false;
      }

      let surfaceY = rock.getSurfaceY();
      let nextBottom = movableObject.y + movableObject.height + movableObject.speedY;
      let isStanding =
         Math.abs(movableObject.y - rock.getTopYFor(movableObject)) < 1;
      let isLanding =
         movableObject.y + movableObject.height <= surfaceY &&
         nextBottom >= surfaceY;
      return isStanding || isLanding;
   }
}
