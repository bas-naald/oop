import Scene from './Scene.js';
import CanvasRenderer from './CanvasRenderer.js';
import Choice1 from './Choice1.js';
import Choice2 from './Choice2.js';
import InstructionLinkChoice from './InstructionLinkChoice.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import FriendlyAlienLose from './FriendlyAlienLose.js';
import InnerShipMoon from './InnerShipMoon.js';

export default class LinkChoice extends Scene {
  private choice1: Choice1;

  private choice2: Choice2;

  private tryAgain: FriendlyAlienLose;

  private instructionLinkChoice: InstructionLinkChoice;

  private rightChoice: boolean = false;

  private wrongChoice: boolean = false;

  private newGame: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.choice1 = new Choice1(maxX, maxY);
    this.choice2 = new Choice2(maxX, maxY);
    this.instructionLinkChoice = new InstructionLinkChoice(maxX, maxY);
  }

  /**
   * Process all input. Called from the GameLoop.
   *
   * @param keylistener the keylistener that is being used
   * @param mouselistener the mouselistener that is being used
   */
  public override processesInput(keylistener: KeyListener, mouselistener: MouseListener): void {
    this.cursor.movepos(mouselistener.getMousePosition().x, mouselistener.getMousePosition().y);
    if (keylistener.keyPressed(KeyListener.KEY_1)) {
      this.rightChoice = true;
      this.wrongChoice = false;
    } else if (keylistener.keyPressed(KeyListener.KEY_2)) {
      this.rightChoice = false;
      this.wrongChoice = true;
      this.tryAgain = new FriendlyAlienLose(this.maxX, this.maxY);
    }

    if (this.wrongChoice) {
      if (keylistener.keyPressed(KeyListener.KEY_SPACE)) {
        this.rightChoice = false;
        this.wrongChoice = false;
        this.newGame = true;
      }
    }
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if (this.rightChoice) {
      return new InnerShipMoon(this.maxX, this.maxY);
    }
    if (this.newGame) {
      return new LinkChoice(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    // Clear the canvas
    CanvasRenderer.clearCanvas(canvas);

    // Render the elements
    this.choice1.render(canvas);
    this.choice2.render(canvas);
    this.instructionLinkChoice.render(canvas);
    this.cursor.render(canvas);

    // Checks the if statements and renders the correct elements and text
    if (this.wrongChoice) {
      this.tryAgain.render(canvas);
      CanvasRenderer.writeText(canvas, 'press space', this.maxX / 2, this.maxY - 100, 'center', 'arial', 50, 'white');
    }
  }
}
