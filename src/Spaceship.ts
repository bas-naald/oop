import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Spaceship extends CanvasItem{
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/outership.png');

    this.posX = 10;
    this.posY = maxY - this.image.height;
  }
}
