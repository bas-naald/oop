/* eslint-disable max-len */
import Scene from './Scene.js';
import PasswordArray from './PasswordArray.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
import KeyListener from './KeyListener.js';
import PasswordRender from './PasswordRender.js';
import IncorrectPasswordBox from './IncorrectPasswordBox.js';
import CorrectPasswordBox from './CorrectPasswordBox.js';
import BothPasswords from './BothPasswords.js';
import InnershipMoonFixed from './InnershipMoonFixed.js';

export default class PasswordGame extends Scene {
  private passwordArray: PasswordArray;

  private passwordRender: PasswordRender;

  private incorrectPasswords: IncorrectPasswordBox;

  private correctPasswordBox: CorrectPasswordBox;

  private bothPasswords: BothPasswords;

  private badPasswordArray: string[];

  private goodPasswordArray: string[];

  private badPasswordColl: boolean = true;

  private renderWinMessage: boolean = false;

  private renderLoseMessage: boolean = false;

  private loadNewShip: boolean = false;

  private loadNew: boolean = false;

  private isAlive: boolean = true;

  private newPasswords: boolean = false;

  private wonGame: number = 0;

  private passwordPosY: number = 788;

  private correct: boolean = false;

  private inCorrect: boolean = false;

  private correctLeft: number = 0;

  private incorrectLeft: number = 3;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.passwordArray = new PasswordArray();
    this.incorrectPasswords = new IncorrectPasswordBox();
    this.correctPasswordBox = new CorrectPasswordBox();
    this.passwordRender = new PasswordRender(maxX, maxY);
    this.bothPasswords = new BothPasswords();

    this.badPasswordArray = [];
    this.goodPasswordArray = [];

    for (let i: number = 0; i < 4; i++) {
      const randomPasswordNumber: number = Math.floor(Math.random() * this.passwordArray.badPasswords.length);
      this.badPasswordArray.push(this.passwordArray.badPasswords[randomPasswordNumber]);
    }
    const randomPasswordNumber: number = Math.floor(Math.random() * this.passwordArray.goodPasswords.length);
    this.goodPasswordArray.push(this.passwordArray.goodPasswords[randomPasswordNumber]);
  }

  /**
   * Process all input. Called from the GameLoop.
   *
   * @param keylistener the keylistener that is being used
   * @param mouselistener the mouselistener that is being used
   */
  public override processesInput(keylistener: KeyListener, mouselistener: MouseListener): void {
    this.cursor.movepos(mouselistener.getMousePosition().x, mouselistener.getMousePosition().y);
    if(this.isAlive) {
      if (this.cursor.getPosX() >= this.bothPasswords.posXarray[4] && this.cursor.getPosX() <= this.bothPasswords.posXarray[4] + 120 && this.cursor.getPosY() <= 900 && this.cursor.getPosY() >= 740) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.newPasswords = true;
          this.wonGame += 1;
          this.correct = true;
          this.inCorrect = false;
          this.correctLeft += 1;
          this.badPasswordColl = false;
        }
      }
    }
    if(this.isAlive) {
      if (this.cursor.getPosX() >= 470 && this.cursor.getPosX() <= 1430 && this.cursor.getPosY() <= 900 && this.cursor.getPosY() >= 740) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.correct = false;
          this.inCorrect = true;
          this.newPasswords = true;
          this.incorrectLeft -= 1;
        }
      }
    }

    if (this.newPasswords) {
      for (let j: number = 0; j < 5; j++) {
        this.badPasswordArray.pop();
      }
      for (let j: number = 0; j < 1; j++) {
        this.goodPasswordArray.pop();
      }
      for (let i: number = 0; i < 4; i++) {
        const randomPasswordNumber: number = Math.floor(Math.random() * this.passwordArray.badPasswords.length);
        this.badPasswordArray.push(this.passwordArray.badPasswords[randomPasswordNumber]);
      }
      const randomPasswordNumber: number = Math.floor(Math.random() * this.passwordArray.goodPasswords.length);
      this.goodPasswordArray.push(this.passwordArray.goodPasswords[randomPasswordNumber]);
      this.newPasswords = false;
    }
    if (this.renderWinMessage) {
      if (this.cursor.getPosX() >= 0 && this.cursor.getPosY() >= 0) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.loadNewShip = true;
        }
      }
    }
    if (this.renderLoseMessage) {
      if (this.cursor.getPosX() >= 0 && this.cursor.getPosY() >= 0) {
        if (mouselistener.buttonPressed(MouseListener.BUTTON_LEFT)) {
          this.loadNew = true;
        }
      }
    }
  }

  /**
   * Update game state. Called from the GameLoop
   */
  public override update(): void {
    if (this.badPasswordColl == false) {
      this.bothPasswords.update();
      this.badPasswordColl = true;
    }
    if (this.wonGame == 5) {
      this.renderWinMessage = true;
      this.isAlive = false;
    }
    if (this.incorrectLeft == 0) {
      this.renderLoseMessage = true;
      this.isAlive = false;
    }
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene {
    if (this.loadNewShip) {
      this.isFixed = false;
      return new InnershipMoonFixed(this.maxX, this.maxY);
    }
    if (this.loadNew) {
      return new PasswordGame(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    // render all the elements
    this.passwordRender.render(canvas);
    this.incorrectPasswords.render(canvas);
    this.correctPasswordBox.render(canvas);
    this.cursor.render(canvas);

    // Checks the if statements and renders the correct elements and text
    CanvasRenderer.writeText(canvas, this.badPasswordArray[0], this.bothPasswords.posXarray[0] + 82, this.passwordPosY);
    CanvasRenderer.writeText(canvas, this.badPasswordArray[1], this.bothPasswords.posXarray[1] + 82, this.passwordPosY);
    CanvasRenderer.writeText(canvas, this.badPasswordArray[2], this.bothPasswords.posXarray[2] + 82, this.passwordPosY);
    CanvasRenderer.writeText(canvas, this.badPasswordArray[3], this.bothPasswords.posXarray[3] + 82, this.passwordPosY);
    CanvasRenderer.writeText(canvas, this.goodPasswordArray[0], this.bothPasswords.posXarray[4] + 82, this.passwordPosY);

    if (this.correct) {
      CanvasRenderer.writeText(canvas, 'correct', this.maxX / 2, this.maxY / 2 + 50, 'center', 'arial', 100, 'green');
    }
    if (this.inCorrect) {
      CanvasRenderer.writeText(canvas, 'incorrect', this.maxX / 2, this.maxY / 2 + 50, 'center', 'arial', 100, 'red');
    }
    CanvasRenderer.writeText(canvas, `questions correct: ${this.correctLeft}/5`, this.maxX / 2, this.maxY / 2 - 50, 'center', 'arial', 20, 'black');
    if (this.renderWinMessage) {
      CanvasRenderer.writeText(canvas, 'you won, click to go back', this.maxX / 2, this.maxY / 2 - 165, 'center', 'arial', 70, 'green');
    }
    CanvasRenderer.writeText(canvas, `try's: ${this.incorrectLeft}/3`, this.maxX / 2, this.maxY / 2 - 20, 'center', 'arial', 20, 'black');
    if (this.renderLoseMessage) {
      CanvasRenderer.writeText(canvas, 'you lost, click to try again', this.maxX / 2, this.maxY / 2 - 165, 'center', 'arial', 70, 'red');
    }

    CanvasRenderer.writeText(canvas, 'choose the correct password', this.maxX / 2, this.maxY - 830, 'center', 'arial', 55, 'black');
    CanvasRenderer.writeText(canvas, '1. at least 8 characters', 0, 30, 'left', 'arial', 20, 'green');
    CanvasRenderer.writeText(canvas, '2. one special character', 0, 60, 'left', 'arial', 20, 'green');
    CanvasRenderer.writeText(canvas, '3. one capital letter', 0, 90, 'left', 'arial', 20, 'green');
    CanvasRenderer.writeText(canvas, '4. one number', 0, 120, 'left', 'arial', 20, 'green');
  }
}
