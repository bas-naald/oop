import CanvasRenderer from './CanvasRenderer.js';
import InnerShip1 from './InnerShipMercury.js';
import Scene from './Scene.js';

export default class Intro extends Scene{
  private timeToNextFrame: number;

  private cutsceneimage: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/cutScene/1.png');

    this.timeToNextFrame = 750;
    this.cutsceneimage = 1;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   */
  public override update(elapsed: number): void {
    if (this.timeToNextFrame < 0) {
      this.timeToNextFrame = 750;
      this.cutsceneimage += 1;
      this.image = CanvasRenderer.loadNewImage(`assets/cutScene/${this.cutsceneimage}.png`);
    }

    // updates the time left to the next frame
    this.timeToNextFrame -= elapsed;
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public nextScene(): Scene | null {
    if (this.cutsceneimage > 18) {
      return new InnerShip1(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.maxX / 2 - (this.image.width / 2),
      this.maxY / 2 - (this.image.height / 2));
  }
}
