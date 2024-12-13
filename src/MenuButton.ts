import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class MenuButton extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/menuButton.png');

    this.posX = (maxX / 2) - 219;
    this.posY = (maxY / 2) - 200;
  }
}
