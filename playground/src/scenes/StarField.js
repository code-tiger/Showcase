/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { WIDTH, HEIGHT } from "../constant";
import Star from "../graphics/Star";
import { Application } from "pixi.js";

const app = new Application({
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: 0x000000,
});

export default function StarField() {
  const ref = useRef(null);
  const stars = [];

  useEffect(() => {
    if (ref?.current && app?.view) {
      // Add app to DOM
      ref.current?.appendChild(app.view);

      // Start the PixiJS app
      app.start();

      // Draw stars
      for (let i = 0; i < 100; i++) {
        stars.push(drawStar(app));
      }

      // Animate stars
      app.ticker.add(() => {
        stars.forEach((star) => {
          star.update();
        });
      });
    }

    return () => {
      if (app?.view) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current?.removeChild(app.view);

        app.stop();
      }
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      id="canvas"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

function drawStar(app) {
  const star = new Star({
    width: WIDTH,
    height: HEIGHT,
  });

  app.stage.addChild(star.graphic);

  return star;
}
