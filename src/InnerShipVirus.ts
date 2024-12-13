import Scene from './Scene.js';
import CanvasRenderer from './CanvasRenderer.js';
import PlanetTravelVenus from './PlanetTravelVenus.js';
import PlanetTravelMoon from './PlanetTravelMoon.js';
import Moon from './Moon.js';
import PlanetTravelMercury from './PlanetTravelMercury.js';
import VirusGame from './VirusGame.js';

export default class InnerShipVirus extends Scene {
  protected travelMercury: PlanetTravelMercury;

  protected travelVenus: PlanetTravelVenus;

  protected travelMoon: PlanetTravelMoon;

  protected loadMercury: boolean;

  protected loadVenus: boolean;

  protected loadMoon: boolean;

  protected renderTermianl: boolean;

  protected loadPasswordGame: boolean = false;

  protected renderInteract: boolean = false;

  private loadVirusGame: boolean = false;

  private renderInteractVirus: boolean = false;

  protected renderInteractPosX: number = 0;

  private renderInteractPosXVirus: number = 0;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/innerShip.png');

    this.player.setInvincible(true);

    this.travelMercury = new PlanetTravelMercury();
    this.travelVenus = new PlanetTravelVenus();
    this.travelMoon = new PlanetTravelMoon();

    this.loadMercury = false;
    this.loadVenus = false;
    this.loadMoon = false;
    this.renderTermianl = true;
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   */
  public override update(elapsed: number): void {
    // Updates the position of the player and cursor
    this.player.update(elapsed);
    this.cursor.update(elapsed);
    this.player.move(elapsed, this.maxX);
    this.player.jump(elapsed);

    // Checks the if statements and updates accordingly
    if (!this.cursor.isCollidingWith(this.travelMoon) && this.interacting) {
      this.loadMoon = true;
    }
    if ((this.player.getPosX() > 1125 || this.player.getPosX() + this.player.getWidth() > 1125)
      && (this.player.getPosX() < 1375 || this.player.getPosX() + this.player.getWidth() < 1375)) {
      this.renderTermianl = true;
    } else {
      this.renderTermianl = false;
    }
    if (this.player.getPosX() < 1000) {
      this.player.setPosY(this.maxY - 400);
    } else {
      this.player.setPosY(this.maxY - 275);
    }


    if ((this.player.getPosX() + this.player.getWidth() > this.maxX - 300)
      && (this.player.getPosX() + this.player.getWidth() < this.maxX)) {
      this.renderInteractVirus = true;
      this.renderInteractPosXVirus = this.maxX - 300;
      if (this.collidingVirus) {
        this.loadVirusGame = true;
      }
    } else {
      this.renderInteract = false;
    }
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if (this.loadMoon) {
      return new Moon(this.maxX, this.maxY);
    } else if (this.loadVirusGame) {
      return new VirusGame(this.maxX, this.maxY);
    } else {
      return null;
    }
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, 0, 0);

    // Renders the player, the health, the obj, and the cursor
    this.player.render(canvas);
    this.health.render(canvas);
    this.obj.render(canvas);

    // Checks the if statements and renders the correct elements and text
    if (this.renderInteractVirus) {
      CanvasRenderer.writeText(canvas, 'press E to go to fix navigation', this.renderInteractPosXVirus, 600, 'left', 'arial', 20, 'yellow');
    }

    CanvasRenderer.writeText(canvas, 'fix navigation', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'locked', 400, 400, 'left', 'arial', 20, 'yellow');

    this.cursor.render(canvas);
  }
}
