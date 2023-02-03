import { Application } from "pixi.js";
import { useEffect, useState } from "react";
import { HEIGHT, WIDTH } from "../constant";

const application = new Application({
  width: WIDTH,
  height: HEIGHT,
});

export default function usePixiApp(
  backgroundColor = 0x000000,
  transparenet = false
): Application | null {
  const [app, setApp] = useState(null);

  console.log("🚀 ~ file: usePixiApp.js:15 ~ app", app);

  useEffect(() => {
    if (!app) {
      setApp(application);
    } else {
      app.renderer.backgroundColor = 0xcccccc;
      app.renderer.backgroundAlpha = transparenet ? 0 : 1;
    }

    return () => {
      app?.destroy();
    };
  }, [app, backgroundColor, transparenet]);

  return app;
}
