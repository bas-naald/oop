import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class PopUpMessage extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/popUpMessage.png');

    this.posX = (maxX / 2) + 75;
    this.posY = (maxY / 2) + 100;
  }
}
