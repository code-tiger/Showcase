import { AnimatedSprite, Spritesheet, Texture } from "pixi.js";
import { useEffect, useRef } from "react";
import usePixiApp from "../hooks/usePixiApp";
import data from "../assets/cat_idle_1.json";
import catImage from "../assets/cat_idle_1.png";

export default function AnimatedCat() {
  const ref = useRef(null);
  const app = usePixiApp();

  useEffect(() => {
    if (ref?.current && app?.view) {
      // Add app to DOM
      ref.current?.appendChild(app.view);

      // Start the PixiJS app
      app.start();

      loadTexture(app);
    }

    return () => {
      if (app) {
        // Remove app from DOM
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current?.removeChild(app.view);

        // Stop the PixiJS app
        app.stop();
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

async function loadTexture(app: PIXI.Application) {
  const texture = Texture.from(catImage);

  const spritesheet = new Spritesheet(texture, data);

  // Generate all the Textures asynchronously
  await spritesheet.parse();

  const textures = [];

  for (const key in spritesheet.textures) {
    textures.push(spritesheet.textures[key]);
  }

  const animatedSprite = new AnimatedSprite(textures);

  // set animatedSprite center
  animatedSprite.anchor.set(0.5);

  // set animatedSprite position
  animatedSprite.x = app.screen.width / 2;
  animatedSprite.y = app.screen.height / 2;

  // scale the sprite up to 2x its size
  animatedSprite.scale.set(2);

  // // set the animation speed
  animatedSprite.animationSpeed = 0.1666;

  // // play the animation on a loop
  animatedSprite.play();

  // // add it to the stage to render
  app.stage?.addChild(animatedSprite);
}
