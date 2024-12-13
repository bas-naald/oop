import BothPasswords from './BothPasswords.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class IncorrectPasswordBox extends BothPasswords {
  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/textbubblepassword.png');

    this.posY = 740;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posXarray[0], this.posY);
    CanvasRenderer.drawImage(canvas, this.image, this.posXarray[1], this.posY);
    CanvasRenderer.drawImage(canvas, this.image, this.posXarray[2], this.posY);
    CanvasRenderer.drawImage(canvas, this.image, this.posXarray[3], this.posY);
  }
}
