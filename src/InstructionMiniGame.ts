import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class InstructionMiniGame extends CanvasItem {
  private image2: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super();

    this.image2 = CanvasRenderer.loadNewImage('assets/messages.png');

    this.posX = maxX - 395;
    this.posY = (maxY - maxY) + 10;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image2, this.posX, this.posY);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'Try to catch the CORRUPTED files!', this.posX + 40, this.posY + 50, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'Move up/down with the arrow buttons', this.posX + 40, this.posY + 75, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'Get a score of 20!', this.posX + 40, this.posY + 100, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'Corrupted = 3, Normal = -1', this.posX + 40, this.posY + 125, 'left', 'arial', 20, 'black');
  }
}
