import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class ScrapVenus extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/cutScrap.png');

    this.posX = maxX - (297 - 30);
    this.posY = maxY - 200;
  }
}
