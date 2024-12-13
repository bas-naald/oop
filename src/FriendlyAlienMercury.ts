import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class FriendlyAlienMercury extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/scaredYellowAlien.png');

    this.posX = maxX - 115;
    this.posY = maxY - 147;
  }
}
