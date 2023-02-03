import {
  AnimatedSprite,
  Application,
  Spritesheet,
  Texture,
  utils,
} from "pixi.js";
import { useEffect, useRef, useState } from "react";
import catAnimationSheet from "../assets/cat_animations.png";
import catAnimationSheetData from "../assets/cat_animations.json";
import helper from "../utils/helper";

const app = new Application({
  width: 65,
  height: 65,
  backgroundAlpha: 0,
});

const ANIMATED_STATUS = {
  idle: "idle",
  lick: "lick",
  clean: "clean",
  walk: "walk",
};

const DIRECTION = {
  left: "left",
  right: "right",
};

let catMoving = false;

let animationState = ANIMATED_STATUS.idle;

let catAnimatedSprite: AnimatedSprite | null = null;

let catAnimation = null;

const SCALE_FACTOR = 2;

export default function AnimatedCat() {
  const ref = useRef(null);
  const canvasRef = app.view;
  const [catPos, setCatPos] = useState({ x: 0, y: 0 });
  const [movingXDir, setMovingXDir] = useState(DIRECTION.right);

  useEffect(() => {
    let intervalId;

    if (ref?.current && app?.view) {
      setAppViewStyle();

      app.view.addEventListener("transitionstart", handleTransitionStart);

      app.view.addEventListener("transitionend", handleTransitionEnd);

      // Add app to DOM
      ref.current?.appendChild(app.view);

      // Start the PixiJS app
      app.start();

      setCatAnimation(app)
        .then(loopCatAnimation)
        .then((loopIntervalId) => {
          intervalId = loopIntervalId;
        });
    }

    return () => {
      if (app?.view) {
        app.view.removeEventListener("transitionend", handleTransitionEnd);

        app.view.removeEventListener("transitionstart", handleTransitionStart);

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
  }, [ref]);

  useEffect(() => {
    if (canvasRef && catAnimatedSprite) {
      if (movingXDir === DIRECTION.left) {
        catAnimatedSprite.scale.x = -1 * SCALE_FACTOR;
      } else {
        catAnimatedSprite.scale.x = 1 * SCALE_FACTOR;
      }
    }
  }, [canvasRef, movingXDir]);

  useEffect(() => {
    if (catPos.x && catPos.y) {
      app.view.style.left = `${catPos.x}px`;

      app.view.style.top = `${catPos.y}px`;
    }
  }, [catPos]);

  function handleMouseMove(e) {
    const prevPos = { ...catPos };

    setMovingXDir(e.clientX > prevPos.x ? DIRECTION.right : DIRECTION.left);

    setCatPos({ x: e.clientX, y: e.clientY });
  }

  return (
    <div
      ref={ref}
      onMouseMove={helper.debounce(handleMouseMove, 1000)}
      id="canvas"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

function setAppViewStyle() {
  if (app.view) {
    app.view.style.left = "0px";

    app.view.style.top = "0px";

    app.view.style.position = "absolute";

    app.view.style.transition = "all 2s ease";
  }
}

function handleTransitionEnd(e) {
  if (e.propertyName === "left" || e.propertyName === "top") {
    resetAnimation();
    catMoving = false;
  }
}

function handleTransitionStart(e) {
  if (e.propertyName === "left" || e.propertyName === "top") {
    setMovingAnimation();
    catMoving = true;
  }
}

function loopCatAnimation() {
  return setInterval(() => {
    if (!catMoving && catAnimatedSprite) {
      utils.clearTextureCache();

      if (animationState === ANIMATED_STATUS.idle) {
        // pick random animation
        const filteredArr = Object.keys(catAnimation).filter(
          (key) => key !== ANIMATED_STATUS.walk && key !== ANIMATED_STATUS.idle
        );

        animationState =
          filteredArr[
            Math.floor(Math.random() * Object.keys(filteredArr).length)
          ];

        catAnimatedSprite.textures = catAnimation[animationState];

        catAnimatedSprite.play();
      } else {
        resetAnimation();
      }
    }
  }, 2000);
}

function resetAnimation() {
  if (catAnimatedSprite) {
    animationState = ANIMATED_STATUS.idle;

    catAnimatedSprite.textures = catAnimation.idle;

    catAnimatedSprite.play();
  }
}

function setMovingAnimation() {
  if (catAnimatedSprite) {
    animationState = ANIMATED_STATUS.walk;

    catAnimatedSprite.textures = catAnimation.walk;

    catAnimatedSprite.play();
  }
}

async function setCatAnimation(app: PIXI.Application) {
  catAnimation = await loadCatAnimations();

  catAnimatedSprite = new AnimatedSprite(catAnimation.idle);

  // set animatedSprite center
  catAnimatedSprite.anchor.set(0.5);

  // set animatedSprite position
  catAnimatedSprite.x = app.screen.width / 2;
  catAnimatedSprite.y = app.screen.height / 2;

  // scale the sprite up to 2x its size
  catAnimatedSprite.scale.set(1 * SCALE_FACTOR);

  // // set the animation speed
  catAnimatedSprite.animationSpeed = 0.1666;

  // // add it to the stage to render
  app.stage?.addChild(catAnimatedSprite);

  // // play the animation on a loop
  catAnimatedSprite.play();
}

async function loadCatAnimations() {
  const AnimatedCat = {};

  const spriteSheet = await loadSpreadSheet();

  AnimatedCat.idle = loadAnimationTextures({ name: "idle", spriteSheet });

  AnimatedCat.lick = loadAnimationTextures({ name: "lick", spriteSheet });

  AnimatedCat.clean = loadAnimationTextures({ name: "clean", spriteSheet });

  AnimatedCat.walk = loadAnimationTextures({ name: "walk", spriteSheet });

  return AnimatedCat;
}

async function loadSpreadSheet() {
  const texture = Texture.from(catAnimationSheet);

  const spriteSheet = new Spritesheet(texture, catAnimationSheetData);

  // Generate all the Textures asynchronously
  await spriteSheet.parse();

  return spriteSheet;
}

function loadAnimationTextures({ name, spriteSheet }): Texture[] {
  const textures = [];

  const targetKeys = Object.keys(spriteSheet.textures).filter((key) => {
    return key.includes(name);
  });

  for (const key of targetKeys) {
    textures.push(spriteSheet.textures[key]);
  }

  return textures;
}
