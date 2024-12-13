import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Alien extends CanvasItem {
  private maxX: number;

  private movingright: boolean = true;

  private movingLeft: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super();

    const random: number = Math.random();
    if (random > 0.8) {
      this.image = CanvasRenderer.loadNewImage('assets/happySharkAlien.png');
    } else if (random > 0.6) {
      this.image = CanvasRenderer.loadNewImage('assets/pinkAlien.png');
    } else if (random > 0.4) {
      this.image = CanvasRenderer.loadNewImage('assets/sadBlueAlien.png');
    } else if (random > 0.2) {
      this.image = CanvasRenderer.loadNewImage('assets/veryHappyPinkAlien.png');
    } else if (random > 0) {
      this.image = CanvasRenderer.loadNewImage('assets/derpyBlueAlien.png');
    }

    this.maxX = maxX;
    this.posX = maxX;
    this.posY = maxY - this.image.height;
  }

  /**
   * Updates the positions of the aliens. If the the movingLeft or movingRight
   * flag has been set, the aliens will move accordingly.
   * @param elapsed the number of ms that has passed since the last update
   */
  public override update (elapsed: number): void {
    if(this.movingright) {
      this.posX += elapsed * 0.2;
    }

    if(this.posX > this.maxX - (this.image.width)) {
      this.movingright = false;
      this.movingLeft = true;
    } else if(this.posX < 0) {
      this.movingright = true;
      this.movingLeft = false;
    }

    if(this.movingLeft) {
      this.posX -= elapsed * 0.1;
    }
  }
}
