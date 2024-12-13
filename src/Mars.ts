import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';

export default class Mars extends Scene {
  public constructor(maxX : number, maxY : number, entersFromRight: boolean = false) {
    super(maxX, maxY, entersFromRight);

    this.image = CanvasRenderer.loadNewImage('assets/mars.png');
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if (this.onMars) {
      return null;
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas:HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
  }
}
