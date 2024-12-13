import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class StartButton extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/startbutton.png');

    this.posX = maxX / 2 - 129;
    this.posY = maxY / 2;
  }
}
