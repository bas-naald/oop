import CanvasRenderer from './CanvasRenderer.js';

export default abstract class CanvasItem {
  public image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected score: number;

  protected speed: number;

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public setPosX(x: number): void {
    this.posX = x;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public getScore(): number {
    return this.score;
  }

  /**
   * Updates the CanvasItem.
   *
   * @param elapsed the elapsed time from the Game
   */
  public update(elapsed: number): void {
    this.posX + 0 * elapsed;
  }

  /**
   * Render the CanvasItem to the canvas
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
