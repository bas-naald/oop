import { Game } from './GameLoop.js';
import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
import MouseListener from './MouseListener.js';
import StartScreen from './StartScreen.js';


export default class LostInSpace extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private mouselistener: MouseListener;

  private currentScene: Scene;

  public constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.keyListener = new KeyListener();
    this.mouselistener = new MouseListener(canvas, true);
    this.currentScene = new StartScreen(this.canvas.width, this.canvas.height);

    this.canvas.style.cursor = 'none';
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput() : void {
    this.currentScene.processesInput(this.keyListener, this.mouselistener);
  }

  /**
   * Calls the update, to update the assets on the current scene,
   * and if necessary updates the scene
   * @param elapsed the time that passed
   * @returns true if the game should continue updating
   */
  public override update(elapsed: number): boolean {
    this.currentScene.update(elapsed);
    if (this.currentScene.nextScene() !== null) {
      this.currentScene = this.currentScene.nextScene();
    }
    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    // Clear the canvas
    CanvasRenderer.clearCanvas(this.canvas);

    // render the elements
    this.currentScene.render(this.canvas);
  }
}
