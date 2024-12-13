import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import Moon from './Moon.js';
import CanvasItem from './CanvasItem.js';
import Venus from './Venus.js';
import ScrapGained from './ScrapGained.js';
import ScrapVenus from './ScrapVenus.js';
import VirusGame from './VirusGame.js';

export default class Venus2 extends Scene {
  private scrapVenus: ScrapVenus;

  private renderScrapGainedMessage: boolean = false;

  private scrapGained: ScrapGained;

  private score: number;

  public constructor(maxX : number, maxY : number) {
    super(maxX, maxY);
    this.image = CanvasRenderer.loadNewImage('assets/venus.png');
    this.scrapVenus = new ScrapVenus(maxX, maxY);
    this.scrapGained = new ScrapGained(maxX);
    this.score = 0;
  }

  /**
   * gives the new scene to lost in space
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if(this.player.getPosX() <= 0) {
      return new Venus(this.maxX, this.maxY, true);
    }
    if(!this.player.isCollidingWith(this.scrapVenus)) {
      this.renderScrapGainedMessage = true;
    }
    if (this.gameOver) {
      return new Venus(this.maxX, this.maxY);
    }

    return null;
  }

  /**
   *@param canvas the canvas that the items will be rendered to
   *this function will render the items to the canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);
    this.aliens.forEach((item: CanvasItem) => item.render(canvas));
    this.player.render(canvas);
    this.health.render(canvas);
    this.cursor.render(canvas);
    this.scrapVenus.render(canvas);
    this.obj.render(canvas);
    CanvasRenderer.writeText(canvas, 'defeat the aliens and collect scrap', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');
    if (this.renderScrapGainedMessage) {
      this.scrapGained.render(canvas);
    }
  }
}
