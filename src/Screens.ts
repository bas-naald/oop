import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Screens extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/navigation.png');

    this.posX = (maxX / 2) - 250;
    this.posY = (maxY / 2) - 250;
  }
}
