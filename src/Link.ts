import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Link extends CanvasItem{
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/link.png');

    this.posX = (maxX / 2) - 100;
    this.posY = (maxY / 2) - 115;
  }
}
