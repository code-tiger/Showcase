import { Application } from "pixi.js";
import { useEffect, useState } from "react";
import { HEIGHT, WIDTH } from "../constant";

export default function usePixiApp(): Application | null {
  const [app, setApp] = useState(null);

  useEffect(() => {
    if (!app) {
      setApp(
        new Application({
          width: WIDTH,
          height: HEIGHT,
          backgroundAlpha: 0,
        })
      );
    }
  }, [app]);

  return app;
}
