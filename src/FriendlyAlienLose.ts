import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';


export default class FriendlyAlienLose extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/tryAgain.png');

    this.posX = maxX / 2;
    this.posY = maxY / 2;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 635, 600);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'YOU LOSE', 935, 500, 'center', 'arial', 100, 'red');
  }
}
