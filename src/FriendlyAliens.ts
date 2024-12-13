import Scene from './Scene.js';
import MouseListener from './MouseListener.js';
import KeyListener from './KeyListener.js';
import FriendlyALienRender from './FriendlyALienRender.js';
import FriendlyAlienRender2 from './FriendlyAlienRender2.js';
import FriendlyAlienWin from './FriendlyAlienWin.js';
import FriendlyAlienLose from './FriendlyAlienLose.js';
import Mercury from './Mercury.js';

export default class FriendlyAliens extends Scene {
  private friendlyALienRender: FriendlyALienRender;

  private friendlyAlienRender2: FriendlyAlienRender2;

  private friendlyAlienWin: FriendlyAlienWin;

  private friendlyAlienLose: FriendlyAlienLose;

  private renderWinMessage: boolean = true;

  private renderLoseMessage: boolean = true;

  private loadNextLose: boolean = false;

  private loadNextWin: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.friendlyALienRender = new FriendlyALienRender(maxX, maxY);
    this.friendlyAlienRender2 = new FriendlyAlienRender2(maxX, maxY);
    this.friendlyAlienWin = new FriendlyAlienWin(maxY, maxY);
    this.friendlyAlienLose = new FriendlyAlienLose(maxY, maxY);
  }

  /**
   * Checks the input of the player and acts accordingly
   *
   * @param keylistener the keylistener that is being used
   * @param mouselistener the mouselistener that is being used
   */
  public override processesInput(keylistener: KeyListener, mouselistener: MouseListener): void {
    this.cursor.movepos(mouselistener.getMousePosition().x, mouselistener.getMousePosition().y);

    if (!this.cursor.isCollidingWith(this.friendlyALienRender)) {
      if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.renderWinMessage = false;
        this.renderLoseMessage = true;
      }
    } else if (!this.cursor.isCollidingWith(this.friendlyAlienRender2)) {
      if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.renderWinMessage = true;
        this.renderLoseMessage = false;
      }
    }

    if (!this.renderLoseMessage) {
      if (!this.cursor.isCollidingWith(this.friendlyAlienLose)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.loadNextLose = true;
        }
      }
    }

    if (!this.renderWinMessage) {
      if (!this.cursor.isCollidingWith(this.friendlyAlienWin)) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.loadNextWin = true;
        }
      }
    }
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the next scene or null
   */
  public override nextScene(): Scene | null {
    if (this.loadNextLose) {
      return new FriendlyAliens(this.maxX, this.maxY);
    } else if (this.loadNextWin) {
      return new Mercury(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    // Render the aliens
    this.friendlyALienRender.render(canvas);
    this.friendlyAlienRender2.render(canvas);

    // Checks the if statements and renders the correct elements
    if (!this.renderWinMessage) {
      this.friendlyAlienWin.render(canvas);
    }
    if (!this.renderLoseMessage) {
      this.friendlyAlienLose.render(canvas);
    }

    // render the cursor
    this.cursor.render(canvas);
  }
}
