import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Choice2 extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/messages.png');

    this.posY = (maxY / 2) - 100;
    this.posX = maxX - (maxX / 4) - 390;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX - 600, this.posY - 70);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'https://NavigationGuideToRepair.com', this.posX - 400, this.posY, 'center', 'arial', 22, 'black');
    CanvasRenderer.writeText(canvas, 'link 1', this.posX - 400, this.posY + 25, 'center', 'arial', 25, 'black');
  }
}
