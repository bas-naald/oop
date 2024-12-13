import CanvasRenderer from './CanvasRenderer.js';
import InnerShipAfterMoon from './InnerShipAfterMoon.js';
import Platform from './Platform.js';
import Scene from './Scene.js';
import Note from './Note.js';
import CanvasItem from './CanvasItem.js';

export default class Moon extends Scene {
  private platform1 : Platform;

  private platform2 : Platform;

  private platform3 : Platform;

  private platform4 : Platform;

  private note: Note;

  private noteArray: Note[];

  private collectedNote: boolean = false;

  private setOnTheGround : number;

  public constructor (maxX : number, maxY : number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/moon.png');

    this.player.setInvincible(true);

    this.platform1 = new Platform(300, 650);
    this.platform2 = new Platform(600, 450);
    this.platform3 = new Platform(900, 250);
    this.platform4 = new Platform(1400, 250);
    this.note = new Note(1465, 140);

    this.noteArray = [];

    this.noteArray.push(this.note);

    this.setOnTheGround = 1;
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if(this.loadInnerShip) {
      return new InnerShipAfterMoon(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   */
  public override update(elapsed: number): void {
    // Updates the position of the player
    this.player.move(elapsed, this.maxX);
    this.player.jump(elapsed);

    // Checks the if statements and updates accordingly
    if (!this.player.isCollidingWith(this.platform1)) {
      this.player.setGroundLevel(this.platform1.getPosY() + 10);
      if (this.setOnTheGround < 1) {
        this.setOnTheGround += 2;
      }
    } else if (!this.player.isCollidingWith(this.platform2)) {
      this.player.setGroundLevel(this.platform2.getPosY() + 10);
      if (this.setOnTheGround < 1) {
        this.setOnTheGround += 2;
      }
    } else if (!this.player.isCollidingWith(this.platform3)) {
      this.player.setGroundLevel(this.platform3.getPosY() + 10);
      if (this.setOnTheGround < 1) {
        this.setOnTheGround += 2;
      }
    } else if(!this.player.isCollidingWith(this.platform4)) {
      this.player.setGroundLevel(this.platform4.getPosY() + 10);
      if (this.setOnTheGround < 1) {
        this.setOnTheGround += 2;
      }
    } else {
      this.player.setGroundLevel(this.maxY);
      if (this.setOnTheGround > 1) {
        this.player.setOnTheGround(false);
        this.setOnTheGround -= 1;
      }
    }

    this.noteArray = this.noteArray.filter((note: CanvasItem) => {
      return this.player.isCollidingWith(note);
    });

    if(!this.player.isCollidingWith(this.note)) {
      this.collectedNote = true;
    }
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);

    // Render the all the elements
    this.ship.render(canvas);
    this.platform1.render(canvas);
    this.platform2.render(canvas);
    this.platform3.render(canvas);
    this.platform4.render(canvas);
    this.player.render(canvas);
    this.health.render(canvas);
    this.cursor.render(canvas);
    this.obj.render(canvas);
    this.noteArray.forEach((item: CanvasItem) => item.render(canvas));

    // Show text on the screen
    CanvasRenderer.writeText(canvas, 'collect the note pieces', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');

    if(this.collectedNote) {
      CanvasRenderer.writeText(canvas, 'collected note, return to ship', this.maxX/2, 100, 'center', 'arial', 20, 'black');
    }
  }
}
