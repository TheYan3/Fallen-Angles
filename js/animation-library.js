function buildAnimationFrames(rootPath, sequenceFolder, prefix, lastFrame) {
   return Array.from({ length: lastFrame + 1 }, (_, index) => {
      let frameNumber = String(index).padStart(3, "0");
      return `${rootPath}/${sequenceFolder}/${prefix}${frameNumber}.png`;
   });
}

function buildSimpleFrames(rootPath, prefix, lastFrame) {
   return Array.from({ length: lastFrame + 1 }, (_, index) => {
      let frameNumber = String(index).padStart(3, "0");
      return `${rootPath}/${prefix}${frameNumber}.png`;
   });
}

function resolveTemplate(template, skinName) {
   return template.replaceAll("{skin}", skinName);
}

function buildSkinAnimations(basePath, skinName, sequenceDefinitions) {
   let skinPath = resolveTemplate(basePath, skinName);
   let animations = {};

   Object.entries(sequenceDefinitions).forEach(([key, definition]) => {
      animations[key] = buildAnimationFrames(
         skinPath,
         resolveTemplate(definition.folder, skinName),
         resolveTemplate(definition.prefix, skinName),
         definition.lastFrame,
      );
   });

   return animations;
}

function buildEntityAnimations(basePath, skinNames, sequenceDefinitions) {
   let entityAnimations = {};

   skinNames.forEach((skinName) => {
      entityAnimations[skinName] = buildSkinAnimations(
         basePath,
         skinName,
         sequenceDefinitions,
      );
   });

   return entityAnimations;
}

const animationLibrary = {
   powerup: {
      flameFeather: buildSimpleFrames("img/Powerup", "flame_feather", 17),
   },
   player: buildEntityAnimations(
      "img/Player/Fallen-Angles/{skin}/PNG/PNG Sequences",
      ["Fallen_Angels_1", "Fallen_Angels_2", "Fallen_Angels_3"],
      {
         dying: {
            folder: "Dying",
            prefix: "0_Fallen_Angels_Dying_",
            lastFrame: 14,
         },
         fallingDown: {
            folder: "Falling Down",
            prefix: "0_Fallen_Angels_Falling Down_",
            lastFrame: 5,
         },
         hurt: {
            folder: "Hurt",
            prefix: "0_Fallen_Angels_Hurt_",
            lastFrame: 11,
         },
         idle: {
            folder: "Idle",
            prefix: "0_Fallen_Angels_Idle_",
            lastFrame: 17,
         },
         idleBlink: {
            folder: "Idle Blinking",
            prefix: "0_Fallen_Angels_Idle Blinking_",
            lastFrame: 17,
         },
         jumpLoop: {
            folder: "Jump Loop",
            prefix: "0_Fallen_Angels_Jump Loop_",
            lastFrame: 5,
         },
         jumpStart: {
            folder: "Jump Start",
            prefix: "0_Fallen_Angels_Jump Start_",
            lastFrame: 5,
         },
         kicking: {
            folder: "Kicking",
            prefix: "0_Fallen_Angels_Kicking_",
            lastFrame: 11,
         },
         runSlashing: {
            folder: "Run Slashing",
            prefix: "0_Fallen_Angels_Run Slashing_",
            lastFrame: 11,
         },
         runThrowing: {
            folder: "Run Throwing",
            prefix: "0_Fallen_Angels_Run Throwing_",
            lastFrame: 11,
         },
         running: {
            folder: "Running",
            prefix: "0_Fallen_Angels_Running_",
            lastFrame: 11,
         },
         slashing: {
            folder: "Slashing",
            prefix: "0_Fallen_Angels_Slashing_",
            lastFrame: 11,
         },
         slashingInTheAir: {
            folder: "Slashing in The Air",
            prefix: "0_Fallen_Angels_Slashing in The Air_",
            lastFrame: 11,
         },
         sliding: {
            folder: "Sliding",
            prefix: "0_Fallen_Angels_Sliding_",
            lastFrame: 5,
         },
         throwing: {
            folder: "Throwing",
            prefix: "0_Fallen_Angels_Throwing_",
            lastFrame: 11,
         },
         throwingInTheAir: {
            folder: "Throwing in The Air",
            prefix: "0_Fallen_Angels_Throwing in The Air_",
            lastFrame: 11,
         },
         walking: {
            folder: "Walking",
            prefix: "0_Fallen_Angels_Walking_",
            lastFrame: 23,
         },
      },
   ),
   golem: buildEntityAnimations(
      "img/Enemy/Golem/{skin}/PNG/PNG Sequences",
      ["Golem_1", "Golem_2", "Golem_3"],
      {
         dying: { folder: "Dying", prefix: "0_Golem_Dying_", lastFrame: 14 },
         fallingDown: {
            folder: "Falling Down",
            prefix: "0_Golem_Falling Down_",
            lastFrame: 5,
         },
         hurt: { folder: "Hurt", prefix: "0_Golem_Hurt_", lastFrame: 11 },
         idle: { folder: "Idle", prefix: "0_Golem_Idle_", lastFrame: 17 },
         idleBlink: {
            folder: "Idle Blinking",
            prefix: "0_Golem_Idle Blinking_",
            lastFrame: 17,
         },
         jumpLoop: {
            folder: "Jump Loop",
            prefix: "0_Golem_Jump Loop_",
            lastFrame: 5,
         },
         jumpStart: {
            folder: "Jump Start",
            prefix: "0_Golem_Jump Start_",
            lastFrame: 5,
         },
         kicking: {
            folder: "Kicking",
            prefix: "0_Golem_Kicking_",
            lastFrame: 11,
         },
         runSlashing: {
            folder: "Run Slashing",
            prefix: "0_Golem_Run Slashing_",
            lastFrame: 11,
         },
         runThrowing: {
            folder: "Run Throwing",
            prefix: "0_Golem_Run Throwing_",
            lastFrame: 11,
         },
         running: {
            folder: "Running",
            prefix: "0_Golem_Running_",
            lastFrame: 11,
         },
         slashing: {
            folder: "Slashing",
            prefix: "0_Golem_Slashing_",
            lastFrame: 11,
         },
         slashingInTheAir: {
            folder: "Slashing in The Air",
            prefix: "0_Golem_Slashing in The Air_",
            lastFrame: 11,
         },
         sliding: {
            folder: "Sliding",
            prefix: "0_Golem_Sliding_",
            lastFrame: 5,
         },
         throwing: {
            folder: "Throwing",
            prefix: "0_Golem_Throwing_",
            lastFrame: 11,
         },
         throwingInTheAir: {
            folder: "Throwing in The Air",
            prefix: "0_Golem_Throwing in The Air_",
            lastFrame: 11,
         },
         walking: {
            folder: "Walking",
            prefix: "0_Golem_Walking_",
            lastFrame: 23,
         },
      },
   ),
   reaper: buildEntityAnimations(
      "img/Enemy/Reaper/{skin}/PNG/PNG Sequences",
      ["Reaper_Man_1", "Reaper_Man_2", "Reaper_Man_3"],
      {
         dying: {
            folder: "Dying",
            prefix: "0_Reaper_Man_Dying_",
            lastFrame: 14,
         },
         fallingDown: {
            folder: "Falling Down",
            prefix: "0_Reaper_Man_Falling Down_",
            lastFrame: 5,
         },
         hurt: { folder: "Hurt", prefix: "0_Reaper_Man_Hurt_", lastFrame: 11 },
         idle: { folder: "Idle", prefix: "0_Reaper_Man_Idle_", lastFrame: 17 },
         idleBlink: {
            folder: "Idle Blinking",
            prefix: "0_Reaper_Man_Idle Blinking_",
            lastFrame: 17,
         },
         jumpLoop: {
            folder: "Jump Loop",
            prefix: "0_Reaper_Man_Jump Loop_",
            lastFrame: 5,
         },
         jumpStart: {
            folder: "Jump Start",
            prefix: "0_Reaper_Man_Jump Start_",
            lastFrame: 5,
         },
         kicking: {
            folder: "Kicking",
            prefix: "0_Reaper_Man_Kicking_",
            lastFrame: 11,
         },
         runSlashing: {
            folder: "Run Slashing",
            prefix: "0_Reaper_Man_Run Slashing_",
            lastFrame: 11,
         },
         runThrowing: {
            folder: "Run Throwing",
            prefix: "0_Reaper_Man_Run Throwing_",
            lastFrame: 11,
         },
         running: {
            folder: "Running",
            prefix: "0_Reaper_Man_Running_",
            lastFrame: 11,
         },
         slashing: {
            folder: "Slashing",
            prefix: "0_Reaper_Man_Slashing_",
            lastFrame: 11,
         },
         slashingInTheAir: {
            folder: "Slashing in The Air",
            prefix: "0_Reaper_Man_Slashing in The Air_",
            lastFrame: 11,
         },
         sliding: {
            folder: "Sliding",
            prefix: "0_Reaper_Man_Sliding_",
            lastFrame: 5,
         },
         throwing: {
            folder: "Throwing",
            prefix: "0_Reaper_Man_Throwing_",
            lastFrame: 11,
         },
         throwingInTheAir: {
            folder: "Throwing in The Air",
            prefix: "0_Reaper_Man_Throwing in The Air_",
            lastFrame: 11,
         },
         walking: {
            folder: "Walking",
            prefix: "0_Reaper_Man_Walking_",
            lastFrame: 23,
         },
      },
   ),
   minotaur: buildEntityAnimations(
      "img/Enemy/Minotaur/PNG/{skin}/PNG Sequences",
      ["Minotaur_01", "Minotaur_02", "Minotaur_03"],
      {
         attacking: {
            folder: "Attacking",
            prefix: "{skin}_Attacking_",
            lastFrame: 11,
         },
         dying: { folder: "Dying", prefix: "{skin}_Dying_", lastFrame: 14 },
         hurt: { folder: "Hurt", prefix: "{skin}_Hurt_", lastFrame: 11 },
         idle: { folder: "Idle", prefix: "{skin}_Idle_", lastFrame: 11 },
         idleBlink: {
            folder: "Idle Blink",
            prefix: "{skin}_Idle Blinking_",
            lastFrame: 11,
         },
         jumpLoop: {
            folder: "Jump Loop",
            prefix: "{skin}_Jump Loop_",
            lastFrame: 5,
         },
         jumpStart: {
            folder: "Jump Start",
            prefix: "{skin}_Jump Start_",
            lastFrame: 5,
         },
         taunt: { folder: "Taunt", prefix: "{skin}_Taunt_", lastFrame: 17 },
         walking: {
            folder: "Walking",
            prefix: "{skin}_Walking_",
            lastFrame: 17,
         },
      },
   ),
   wraith: buildEntityAnimations(
      "img/Enemy/Wraith/PNG/{skin}/PNG Sequences",
      ["Wraith_01", "Wraith_02", "Wraith_03"],
      {
         attacking: {
            folder: "Attacking",
            prefix: "{skin}_Attack_",
            lastFrame: 11,
         },
         castingSpells: {
            folder: "Casting Spells",
            prefix: "{skin}_Casting Spells_",
            lastFrame: 17,
         },
         dying: { folder: "Dying", prefix: "{skin}_Dying_", lastFrame: 14 },
         hurt: { folder: "Hurt", prefix: "{skin}_Hurt_", lastFrame: 11 },
         idle: { folder: "Idle", prefix: "{skin}_Idle_", lastFrame: 11 },
         idleBlink: {
            folder: "Idle Blink",
            prefix: "{skin}_Idle Blinking_",
            lastFrame: 11,
         },
         taunt: { folder: "Taunt", prefix: "{skin}_Taunt_", lastFrame: 17 },
         walking: {
            folder: "Walking",
            prefix: "{skin}_Moving Forward_",
            lastFrame: 11,
         },
      },
   ),
};
