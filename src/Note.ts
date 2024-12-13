import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class extends CanvasItem {
  public constructor(posX: number, posY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/note.png');

    this.posX = posX;
    this.posY = posY;
  }
}
