import Alien from './Alien.js';
import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player extends CanvasItem {
  private onTheGround: boolean;

  public movingLeft: boolean;

  public movingRight: boolean;

  public jumping: boolean;

  private invincible: boolean;

  private timeJumping: number;

  private groundLevel: number;

  public constructor(maxX: number, maxY: number, entersFromRight: boolean = false) {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/player.png');

    this.onTheGround = true;
    this.movingLeft = false;
    this.movingRight = false;
    this.jumping = false;
    this.invincible = false;
    this.timeJumping = 0;

    this.groundLevel = maxY;
    this.posX = entersFromRight ? 1799 : 0;
    this.posY = maxY - this.image.height;
  }

  /**
   * Checks for the collision between item and player
   *
   * @param item the item check for collision
   * @returns if the item is colliding with the player
   */
  public isCollidingWith(item: CanvasItem): boolean {
    if (((this.posX > item.getPosX() && this.posX < item.getPosX() + item.getWidth())
      || (this.posX + this.image.width > item.getPosX()
        && this.posX + this.image.width < item.getPosX() + item.getWidth()))
      && (this.posY + this.image.height > item.getPosY())) {
      return false;
    }
    return true;
  }

  /**
   * Checks if the player will take damage or not
   *
   * @param item the alien that will be checked for if giving damage or not
   * @returns whetter the player takes damage or not
   */
  public isTakingDamage(item: Alien): boolean {
    if (!this.invincible) {
      if (((this.posX > item.getPosX() && this.posX < item.getPosX() + item.getWidth())
        || (this.posX + this.image.width > item.getPosX()
          && this.posX + this.image.width < item.getPosX() + item.getWidth()))
        && (this.posY + this.image.height > item.getPosY() + 15)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Regulates the movement of the player
   *
   * @param elapsed times passed
   * @param maxX the maxX
   */
  public move(elapsed: number, maxX: number): void {
    if (this.movingRight) {
      this.posX += 0.5 * elapsed;
      if (this.posX > maxX - this.image.width) {
        this.posX = maxX - this.image.width;
      }
      this.movingRight = false;
    } else if (this.movingLeft) {
      this.posX -= 0.5 * elapsed;
      if (this.posX < 0) {
        this.posX = 0;
      }
      this.movingLeft = false;
    }
  }

  /**
   * Makes the player jump
   *
   * @param elapsed time passed
   */
  public jump(elapsed: number): void {
    if (this.timeJumping > 700) {
      this.timeJumping = 0;
      this.jumping = false;
      this.onTheGround = false;
    }

    if (this.jumping) {
      this.posY -= 0.35 * elapsed;
      this.timeJumping += 1 * elapsed;
    }

    if (!this.onTheGround) {
      this.posY += elapsed * 0.5;
      this.timeJumping = 0;
      if (this.posY + this.image.height > this.groundLevel) {
        this.posY = this.groundLevel - this.image.height;
        this.onTheGround = true;
      }
    }
  }

  public setInvincible(state: boolean): void {
    this.invincible = state;
  }

  public setPosY(posY : number) : void {
    this.posY = posY;
  }

  public setGroundLevel(groundLevel : number) : void {
    this.groundLevel = groundLevel;
  }

  public getGroundLevel() : number {
    return this.groundLevel;
  }

  public setOnTheGround(boolean : boolean) : void {
    this.onTheGround = boolean;
  }
}
