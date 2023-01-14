import { AnimatedSprite, Spritesheet, Texture } from "pixi.js";
import { useEffect, useRef } from "react";
import usePixiApp from "../hooks/usePixiApp";
import catAnimationSheet from "../assets/cat_animations.png";
import catAnimationSheetData from "../assets/cat_animations.json";

export default function AnimatedCat() {
  const ref = useRef(null);
  const app = usePixiApp();

  useEffect(() => {
    let intervalId;

    if (ref?.current && app?.view) {
      // Add app to DOM
      ref.current?.appendChild(app.view);

      // Start the PixiJS app
      app.start();

      setCatAnimation(app).then(({ catAnimatedSprite, catAnimation }) => {
        intervalId = setInterval(() => {
          // pick random animation
          catAnimatedSprite.textures =
            catAnimation[
              Object.keys(catAnimation)[
                Math.floor(Math.random() * Object.keys(catAnimation).length)
              ]
            ];

          catAnimatedSprite.play();
        }, 2000);
      });
    }

    return () => {
      if (app) {
        // Remove app from DOM
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current?.removeChild(app.view);

        // Stop the PixiJS app
        app.stop();
      }

      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [ref, app]);

  return (
    <div
      ref={ref}
      id="canvas"
      className="horizontal-movement"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

async function setCatAnimation(app: PIXI.Application) {
  const catAnimation = await loadCatAnimations();

  const catAnimatedSprite = new AnimatedSprite(catAnimation.lick);

  // set animatedSprite center
  catAnimatedSprite.anchor.set(0.5);

  // set animatedSprite position
  catAnimatedSprite.x = app.screen.width / 2;
  catAnimatedSprite.y = app.screen.height / 2;

  // scale the sprite up to 2x its size
  catAnimatedSprite.scale.set(2);

  // // set the animation speed
  catAnimatedSprite.animationSpeed = 0.1666;

  // // add it to the stage to render
  app.stage?.addChild(catAnimatedSprite);

  // // play the animation on a loop
  catAnimatedSprite.play();

  return {
    catAnimatedSprite,
    catAnimation,
  };
}

async function loadCatAnimations(): Promise<{
  idle: Texture[],
  lick: Texture[],
}> {
  const AnimatedCat = {};

  const spriteSheet = await loadSpreadSheet();

  AnimatedCat.idle = loadAnimationTextures({ name: "idle", spriteSheet });

  AnimatedCat.lick = loadAnimationTextures({ name: "lick", spriteSheet });

  return AnimatedCat;
}

async function loadSpreadSheet() {
  const texture = Texture.from(catAnimationSheet);

  const spriteSheet = new Spritesheet(texture, catAnimationSheetData);

  // Generate all the Textures asynchronously
  await spriteSheet.parse();

  return spriteSheet;
}

function loadAnimationTextures({ name, spriteSheet }) {
  const textures = [];

  const targetKeys = Object.keys(spriteSheet.textures).filter((key) => {
    return key.includes(name);
  });

  for (const key of targetKeys) {
    textures.push(spriteSheet.textures[key]);
  }

  return textures;
}
