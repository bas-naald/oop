import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class PasswordRender extends CanvasItem {
  private image2: HTMLImageElement;

  private image4: HTMLImageElement;

  private posX2: number;

  private posY2: number;

  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/passwordGame.png');
    this.image2 = CanvasRenderer.loadNewImage('assets/textbubblepassword.png');
    this.image4 = CanvasRenderer.loadNewImage('assets/notebook.png');

    this.posX = maxX/2 - 500;
    this.posY = maxY/2 - 420;
    this.posX2 = 475;
    this.posY2 = 740;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    CanvasRenderer.drawImage(canvas, this.image2, this.posX2, this.posY2);
    CanvasRenderer.drawImage(canvas, this.image2, this.posX2 + 200, this.posY2);
    CanvasRenderer.drawImage(canvas, this.image2, this.posX2 + 400, this.posY2);
    CanvasRenderer.drawImage(canvas, this.image2, this.posX2 + 600, this.posY2);
    CanvasRenderer.drawImage(canvas, this.image4, 0, 0);
  }
}
