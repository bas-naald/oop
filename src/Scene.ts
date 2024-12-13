import CanvasRenderer from './CanvasRenderer.js';
import Alien from './Alien.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import CanvasItem from './CanvasItem.js';
import Spaceship from './Spaceship.js';
import Cursor from './Cursor.js';
import MouseListener from './MouseListener.js';
import HealthBar from './HealthBar.js';
import Obj from './Obj.js';

export default abstract class Scene {
  protected image: HTMLImageElement;

  protected player: Player;

  protected ship: Spaceship;

  protected health: HealthBar;

  protected cursor: Cursor;

  protected obj: Obj;

  protected aliens: Alien[];

  protected collidingPassword: boolean = false;

  protected collidingVirus: boolean = false;

  public isFixed: boolean = false;

  protected loadNextScene: boolean;

  protected loadInnerShip: boolean;

  protected loadDiffNextScene: boolean;

  protected welcomeImage: boolean;

  protected gameOver: boolean;

  protected interacting: boolean;

  protected onMars: boolean = true;

  protected maxX: number;

  protected maxY: number;

  public constructor(maxX: number, maxY: number, entersFromRight: boolean = false) {
    this.ship = new Spaceship(maxX, maxY);
    this.health = new HealthBar();
    this.player = new Player(maxX, maxY, entersFromRight);
    this.cursor = new Cursor(0, 0);
    this.obj = new Obj(maxX);

    this.aliens = [];
    this.loadNextScene = false;
    this.loadInnerShip = false;

    this.maxX = maxX;
    this.maxY = maxY;

    for (let i: number = 0; i <= 6; i++) {
      let width: number = this.player.getWidth() * 1.5 * this.aliens.length;
      width = width + this.player.getWidth() * 6;
      const alien: Alien = new Alien(width, maxY);
      this.aliens.push(alien);
    }
  }

  public abstract nextScene(): Scene | null;

  /**
   * Checks if the player is pressing left/right/jump/interact
   *
   * @param keylistener the keylistener that is being used
   * @param mouselistener the mouselistener that is being used
   */
  public processesInput(keylistener: KeyListener, mouselistener: MouseListener): void {
    if (keylistener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.movingLeft = true;
    }

    if (keylistener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.movingRight = true;
    }

    if (keylistener.keyPressed(KeyListener.KEY_SPACE)) {
      if (!this.player.jumping
        && this.player.getPosY() + this.player.getHeight() >= this.player.getGroundLevel()) {
        this.player.jumping = true;
      }
    }

    if (keylistener.keyPressed(KeyListener.KEY_E)) {
      this.collidingPassword = true;
      this.collidingVirus = true;
      if (!this.player.isCollidingWith(this.ship)) {
        this.loadInnerShip = true;
      } else {
        this.loadNextScene = true;
      }
      this.interacting = true;
    } else {
      this.interacting = false;
    }
    this.cursor.movepos(mouselistener.getMousePosition().x, mouselistener.getMousePosition().y);
    if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.interacting = true;
    } else {
      this.interacting = false;
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   */
  public update(elapsed: number): void {
    // Checks the if statements and updates accordingly
    if (this.health.getHealth() > 0) {
      this.aliens.forEach((item: CanvasItem) => item.update(elapsed));
      this.player.move(elapsed, this.maxX);
      this.player.jump(elapsed);
      for (let i: number = 0; i < this.aliens.length; i++) {
        if (this.player.isTakingDamage(this.aliens[i])) {
          this.health.update();
        }
      }
      this.aliens = this.aliens.filter((alien: CanvasItem) => {
        return this.player.isCollidingWith(alien);
      });
    } else {
      this.gameOver = true;
    }
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);

    // Renders all the elements
    this.ship.render(canvas);
    this.aliens.forEach((item: CanvasItem) => item.render(canvas));
    this.player.render(canvas);
    this.cursor.render(canvas);
    this.health.render(canvas);
    this.obj.render(canvas);
  }
}
