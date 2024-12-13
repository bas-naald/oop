import BothPasswords from './BothPasswords.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class CorrectPasswordBox extends BothPasswords {
  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/textbubblepassword.png');

    this.posY = 740;
    this.posX = this.posXarray[4];
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posXarray[4], this.posY);
  }
}
