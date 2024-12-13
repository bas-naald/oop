import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class FriendlyALienRender extends CanvasItem {
  private image2: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/scaredYellowAlien.png');
    this.image2 = CanvasRenderer.loadNewImage('assets/textbubblePixel.png');

    this.posX = maxX / 4;
    this.posY = (maxY / 2) - 100;
  }


  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    CanvasRenderer.drawImage(canvas, this.image2, this.posX + 50, this.posY - 270);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'I have 10 scrap for you, but, not for free!', this.posX + 240, this.posY - 215, 'center', 'arial', 15, 'black');
    CanvasRenderer.writeText(canvas, 'I think a fair price is 5 coins.', this.posX + 240, this.posY - 190, 'center', 'arial', 15, 'black');
    CanvasRenderer.writeText(canvas, 'Choose the alien you trust!', this.posX * 2 - 6, 40, 'center', 'arial', 30, 'yellow');
  }
}
