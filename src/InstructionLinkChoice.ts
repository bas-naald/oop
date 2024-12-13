import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class InstructionLinkChoice extends CanvasItem {
  private image2: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super();

    this.image2 = CanvasRenderer.loadNewImage('assets/messages.png');

    this.posX = maxX - (this.image2.width + 10);
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
    CanvasRenderer.writeText(canvas, 'Lets prevent downloading a virus!', this.posX + 40, this.posY + 50, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'Choose and type in 1 or 2', this.posX + 40, this.posY + 75, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'pay attention to spelling mistakes,', this.posX + 40, this.posY + 100, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'or any other weird symbols!', this.posX + 40, this.posY + 125, 'left', 'arial', 20, 'black');
  }
}
