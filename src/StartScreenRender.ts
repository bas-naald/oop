import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class StartScreenRender extends CanvasItem {
  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/startscreen.png');

    this.posX = 0;
    this.posY = 0;
  }
}
