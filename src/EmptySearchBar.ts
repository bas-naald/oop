import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class EmptySearchBar extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/emptySearchBar.png');

    this.posX = (maxX / 2) - 103;
    this.posY = (maxY / 2) - 207.5;
  }
}
