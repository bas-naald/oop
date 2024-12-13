import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import Mercury from './Mercury.js';
import FriendlyAlienMercury from './FriendlyAlienMercury.js';
import CanvasItem from './CanvasItem.js';
import FriendlyAliens from './FriendlyAliens.js';

export default class Mercury2 extends Scene {
  private friendlyAlienMercury: FriendlyAlienMercury;

  public constructor(maxX : number, maxY : number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/mercury.png');

    this.friendlyAlienMercury = new FriendlyAlienMercury(maxX, maxY);
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if (!this.player.isCollidingWith(this.friendlyAlienMercury)) {
      return new FriendlyAliens(this.maxX, this.maxY);
    }
    if(this.player.getPosX() <= 0) {
      return new Mercury(this.maxX, this.maxY, true);
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

    // Render the aliens, the player, the health, the cursor, the friendlyAlienMercury, and the obj
    this.aliens.forEach((item: CanvasItem) => item.render(canvas));
    this.player.render(canvas);
    this.health.render(canvas);
    this.cursor.render(canvas);
    this.friendlyAlienMercury.render(canvas);
    this.obj.render(canvas);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'defeat the aliens', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'and reach the friendly aliens', this.obj.getPosX() + 30, 110, 'left', 'arial', 20, 'center');
  }
}
