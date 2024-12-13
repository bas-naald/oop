import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import Venus2 from './Venus2.js';
import CanvasItem from './CanvasItem.js';
import InnerShipVirus from './InnerShipVirus.js';

export default class Venus extends Scene {
  public constructor(maxX : number, maxY : number, entersFromRight: boolean = false) {
    super(maxX, maxY, entersFromRight);

    this.image = CanvasRenderer.loadNewImage('assets/venus.png');
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if(this.player.getPosX() >= 1800) {
      return new Venus2(this.maxX, this.maxY);
    }
    if(this.loadInnerShip) {
      return new InnerShipVirus(this.maxX, this.maxY);
    }
    if (this.gameOver) {
      return new Venus(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas:HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);

    // Renders all elements
    this.ship.render(canvas);
    this.aliens.forEach((item: CanvasItem) => item.render(canvas));
    this.player.render(canvas);
    this.health.render(canvas);
    this.cursor.render(canvas);
    this.obj.render(canvas);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'defeat the aliens and collect scrap', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');
  }
}
