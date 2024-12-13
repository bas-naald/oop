import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Download extends CanvasItem{
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/download.png');

    this.posX = (maxX / 2) - 5;
    this.posY = (maxY / 2) - 60;
  }
}
