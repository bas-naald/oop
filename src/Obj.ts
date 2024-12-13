import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Obj extends CanvasItem {
  public constructor(maxX: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/messages.png');

    this.posX = maxX - this.image.width;
    this.posY = 0;
  }
}
