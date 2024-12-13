import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class PlanetTravelMoon extends CanvasItem {
  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/smallPlanets/Moon.png');

    this.posX = 1375;
    this.posY = 500;
  }
}
