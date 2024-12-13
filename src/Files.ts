import CanvasRenderer from './CanvasRenderer.js';
import CanvasItem from './CanvasItem.js';

export default class Files extends CanvasItem {
  public constructor(maxY: number) {
    super();

    // Choose a random image for the files
    const random: number = Math.random();
    if (random > 0.7) {
      this.image = CanvasRenderer.loadNewImage('assets/corrupted.png');
      this.score = 3;
    } else {
      this.image = CanvasRenderer.loadNewImage('assets/files.png');
      this.score = -1;
    }

    this.posX = window.innerWidth;
    this.posY = (Math.random() * maxY);
  }

  /**
   * Updates position of the files.
   *
   * @param elapsed the elapsed time from the Game
   */
  public override update(elapsed: number): void {
    this.posX -= elapsed * 0.2;
  }
}
