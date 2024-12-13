import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class MenuSearch extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/menuSearch.png');

    this.posX = (maxX / 2) - 220;
    this.posY = (maxY / 3) + 41;
  }
}
