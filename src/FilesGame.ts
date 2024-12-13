import CanvasRenderer from './CanvasRenderer.js';
import Scene from './Scene.js';
import PlayerMiniGame from './PlayerMiniGame.js';
import KeyListener from './KeyListener.js';
import Files from './Files.js';
import CanvasItem from './CanvasItem.js';
import InstructionMiniGame from './InstructionMiniGame.js';
import LinkChoice from './LinkChoice.js';

export default class FilesGame extends Scene {
  private playerMiniGame: PlayerMiniGame;

  private instructions: InstructionMiniGame;

  private items: Files[];

  private score: number;

  private nextItem: number;

  private timeLeft: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.items = [];
    this.score = 0;
    this.nextItem = Math.random() * 500;
    this.timeLeft = 60 * 1000;

    for (let i: number = 0; i < 6; i++) {
      this.makeItem();
    }

    this.playerMiniGame = new PlayerMiniGame(maxX, maxY);
    this.instructions = new InstructionMiniGame(maxX, maxY);
  }

  /**
   * Makes a new item that falls from the screen.
   */
  private makeItem(): void {
    this.items.push(new Files(this.maxY));
  }

  /**
   * Process all input. Called from the GameLoop.
   *
   * @param keylistener the keylistener that is being used
   */
  public override processesInput(keylistener: KeyListener): void {
    if (keylistener.isKeyDown(KeyListener.KEY_UP)) {
      this.playerMiniGame.moveUp();
    } else if (keylistener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.playerMiniGame.moveDown();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   */
  public override update(elapsed: number): void {
    // Deduct the elapsed time from the timeLeft
    this.timeLeft -= elapsed;

    // Update the position of the player
    this.playerMiniGame.move(elapsed);

    // Loop through all the items (CanvasItems) to update the position
    this.items.forEach((item: CanvasItem) => item.update(elapsed));

    // Loop through all items and filter out CanvasItems that have either
    // collided with the player, adding points to the score
    // or that has left the end of the screen.
    this.items = this.items.filter((item: Files) => {
      if (!this.playerMiniGame.isCollidingWith(item)) {
        this.score += item.getScore();
        return false;
      } else if (item.getPosX() < -100) {
        return false;
      } else {
        return true;
      }
    });

    // Resets the score and timer when it reaches its limit.
    if (this.score <= 0) {
      this.score = 0;
    }
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
    }

    // Subtracts the elapsed from the time timer to see when a new item should be created.
    this.nextItem -= elapsed;
    if (this.nextItem < 0) {
      this.makeItem();
      this.nextItem = Math.random() * 1000;
    }
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if (this.score >= 20) {
      return new LinkChoice(this.maxX, this.maxY);
    }
    if (this.timeLeft <= 0) {
      return new FilesGame(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    // Render the items, instructions, and the player
    this.items.forEach((item: Files) => item.render(canvas));

    this.instructions.render(canvas);
    this.playerMiniGame.render(canvas);

    // Show text on the screen
    CanvasRenderer.writeText(canvas, `Score: ${this.score}`, 10, 45, 'left', 'Arial', 32, 'white');
    CanvasRenderer.writeText(canvas, `Time: ${Math.round(this.timeLeft / 1000).toString()}`, 10, 85, 'left', 'Arial', 32, 'white');
  }
}
