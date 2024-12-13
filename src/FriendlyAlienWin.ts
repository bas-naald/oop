import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class FriendlyAlienWin extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.posX = maxX / 2;
    this.posY = maxY / 2;

    this.image = CanvasRenderer.loadNewImage('assets/goBack2.png');
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 620, 600);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'YOU WIN', 935, 500, 'center', 'arial', 100, 'green');
  }
}
