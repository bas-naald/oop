import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class PlanetTravelMercury extends CanvasItem {
  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/smallPlanets/Mercury.png');

    this.posX = 1125;
    this.posY = 500;
  }
}
