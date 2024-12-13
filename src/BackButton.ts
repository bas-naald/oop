import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class BackButton extends CanvasItem{
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/backButton.png');

    this.posX = (maxX / 2) - 184;
    this.posY = (maxY / 2) - 202.5;
  }
}
