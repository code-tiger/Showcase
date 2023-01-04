/**
 * Follow up questions:
 * How to translate the star to the center of the screen ?
 *  e.g. use tranlsation matrix: so please use a translation matrix in the code
 * How does it work ?
 *  as simple as finding the new location after applying the translation rules
 */
import { Graphics } from "pixi.js";

/**
 * max radius to 3, when z is 0, the star will be 3px
 * max depth to 1500, when z is 1500, the star will be 0px
 * so currentRadius = radius * (maxDepth - z) / maxDepth
 */
export default class Star {
  constructor({ width, height, radius = 3, maxDepth = 7500, velocity = 60 }) {
    this.radius = radius;
    this.velocity = velocity;
    this.maxDepth = maxDepth;

    // center of the screen
    this.translateX = width / 2;
    this.translateY = height / 2;

    this.finalX = Math.random() * width - this.translateX;
    this.finalY = Math.random() * height - this.translateY;

    this.z = 500 + Math.random() * (this.maxDepth - 500);

    this.graphic = new Graphics();

    this.#drawCurrentStar();
  }

  update() {
    this.z -= this.velocity;

    if (this.z <= -1000) {
      this.#reset();
    }

    return this.#drawCurrentStar();
  }

  #reset() {
    // reset to zero
    this.z = this.maxDepth; // it is the cause of sudden disappearance of stars
  }

  #drawCurrentStar() {
    this.graphic.clear();

    this.graphic.beginFill(0xffffff);

    return this.graphic.drawCircle(
      this.finalX * this.#getScale() + this.translateX,
      this.finalY * this.#getScale() + this.translateY,
      this.radius * this.#getScale()
    );
  }

  #getScale() {
    return (this.maxDepth - this.z) / this.maxDepth;
  }
}
