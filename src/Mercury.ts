import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import CanvasItem from './CanvasItem.js';
import Mercury2 from './Mercury2.js';
import InnerShipVenus from './InnerShipVenus.js';

export default class Mercury extends Scene {
  public constructor(maxX : number, maxY : number, entersFromRight: boolean = false) {
    super(maxX, maxY, entersFromRight);

    this.image = CanvasRenderer.loadNewImage('assets/mercury.png');
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if(this.player.getPosX() >= 1800) {
      return new Mercury2(this.maxX, this.maxY);
    }
    if (this.loadInnerShip) {
      return new InnerShipVenus(this.maxX, this.maxY);
    }
    if (this.gameOver) {
      return new Mercury(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);

    // Render the aliens, the ship, the player, the health, the cursor, and the obj
    this.aliens.forEach((item: CanvasItem) => item.render(canvas));

    this.ship.render(canvas);
    this.player.render(canvas);
    this.health.render(canvas);
    this.cursor.render(canvas);
    this.obj.render(canvas);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'defeat the aliens', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'and reach the friendly aliens', this.obj.getPosX() + 30, 110, 'left', 'arial', 20, 'center');
  }
}
