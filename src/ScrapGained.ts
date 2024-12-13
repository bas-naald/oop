import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class ScrapGained extends CanvasItem {
  private image2: HTMLImageElement;

  public constructor(maxX: number) {
    super();

    this.image2 = CanvasRenderer.loadNewImage('assets/messages.png');

    this.posX = maxX - 390;
    this.posY = 0;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image2, this.posX, this.posY);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'Congratulations! You found 20 scrap.', this.posX + 40, this.posY + 50, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'Bring the scrap back to the ship,', this.posX + 40, this.posY + 75, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'so you can repare it further!', this.posX + 40, this.posY + 100, 'left', 'arial', 20, 'black');
  }
}
