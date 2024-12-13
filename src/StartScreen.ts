import Intro from './Intro.js';
import KeyListener from './KeyListener.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import StartButton from './StartButton.js';
import StartScreenRender from './StartScreenRender.js';

export default class StartScreen extends Scene {
  private startScreen: StartScreenRender;

  private startButton: StartButton;

  private clickedStartButton: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.startScreen = new StartScreenRender();
    this.startButton = new StartButton(maxX, maxY);
  }

  /**
   * Process all input. Called from the GameLoop.
   *
   * @param keylistener the keylistener that is being used
   * @param mouselistener the mouselistener that is being used
   */
  public override processesInput(keylistener: KeyListener, mouselistener: MouseListener): void {
    this.cursor.movepos(mouselistener.getMousePosition().x, mouselistener.getMousePosition().y);

    if(!this.cursor.isCollidingWith(this.startButton)) {
      if(mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
        this.clickedStartButton = true;
      }
    }
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene {
    if(this.clickedStartButton) {
      return new Intro(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    // Render all elements
    this.startScreen.render(canvas);
    this.startButton.render(canvas);
    this.cursor.render(canvas);
  }
}
