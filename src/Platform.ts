import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Platform extends CanvasItem {
  public constructor(posX : number, posY : number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/platform.png');

    this.posX = posX;
    this.posY = posY;
  }
}
