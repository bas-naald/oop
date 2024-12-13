import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class PlayerMiniGame extends CanvasItem {
  private movingUp: boolean = false;

  private movingDown: boolean = false;

  private maxY: number;

  public constructor(maxX: number, maxY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/shipGame.png');

    this.posX = 20;
    this.posY = maxY / 2;
    this.maxY = maxY;
  }

  /**
   * Checks for the collision between item and player
   *
   * @param item the item check for collision
   * @returns if the item is colliding with the player
   */
  public isCollidingWith(item: CanvasItem): boolean {
    if ((item.getPosX() + item.getWidth() > this.posX
    && item.getPosX() < this.posX + this.image.width
    && item.getPosY() + item.getHeight() > this.posY
    && item.getPosY() < this.posY + this.image.height)) {
      return false;
    }
    return true;
  }

  /**
   * Sets a flag that the player is going to move up
   */
  public moveUp(): void {
    this.movingUp = true;
  }

  /**
   * Sets a flag that the player is going to move down
   */
  public moveDown(): void {
    this.movingDown = true;
  }

  /**
   * Regulates the movement of the player
   *
   * @param elapsed times passed
   */
  public move(elapsed: number): void {
    if (this.movingUp) {
      this.posY -= 0.5 * elapsed;
      if (this.posY <= 0) {
        this.posY = 0;
      }
      this.movingUp = false;
    }
    if (this.movingDown) {
      this.posY += 0.5 * elapsed;
      if (this.posY + this.image.height >= this.maxY) {
        this.posY = this.maxY - this.image.height;
      }
      this.movingDown = false;
    }
  }
}
