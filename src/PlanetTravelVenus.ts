import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class PlanetTravelVenus extends CanvasItem {
  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/smallPlanets/Venus.png');

    this.posX = 1250;
    this.posY = 500;
  }
}
