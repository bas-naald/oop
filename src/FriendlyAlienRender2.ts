import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class FriendlyAlienRender2 extends CanvasItem {
  private image2: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/scaredYellowAlien.png');
    this.image2 = CanvasRenderer.loadNewImage('assets/textbubblePixelReverse.png');

    this.posY = (maxY / 2) - 100;
    this.posX = maxX - (maxX / 4) - this.image.width;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    CanvasRenderer.drawImage(canvas, this.image2, this.posX - 330, this.posY - 270);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'I have 10000 scrap for you, a bargain dont you think?', this.posX - 130, this.posY - 215, 'center', 'arial', 15, 'black');
    CanvasRenderer.writeText(canvas, 'All you have to do is give me the key to your ship!', this.posX - 130, this.posY - 190, 'center', 'arial', 15, 'black');
  }
}
