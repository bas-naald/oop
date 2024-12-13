import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Cursor extends CanvasItem {
  public constructor(posX: number, posY: number) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/pointer_26.png');

    this.posX = posX;
    this.posY = posY;
  }

  /**
   * moves the image of our mouse cursor to the position of the actual cursor
   * @param posX position of the mouse on the x axises
   * @param posY position of the mouse on the y axises
   */
  public movepos(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  /**
   * checks if the mouse is colliding with an item
   * @param item the item that will be checked
   * @returns whether the item is coliding with the mouse or not
   */
  public isCollidingWith(item: CanvasItem): boolean {
    if (((this.posX > item.getPosX()
    && this.posX < item.getPosX() + item.getWidth())
    || (this.posX > item.getPosX()
    && this.posX < item.getPosX() + item.getWidth() ))
    && (this.posY > item.getPosY())
    && (this.posY < item.getPosY() + item.getHeight())) {
      return false;
    }
    return true;
  }
}
