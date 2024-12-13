import Scene from './Scene.js';
import CanvasRenderer from './CanvasRenderer.js';
import Venus from './Venus.js';
import PlanetTravelMercury from './PlanetTravelMercury.js';
import InnerShip from './InnerShip.js';

export default class InnerShipVenus extends InnerShip {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.image = CanvasRenderer.loadNewImage('assets/innerShip.png');

    this.player.setInvincible(true);

    this.travelMercury = new PlanetTravelMercury();

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
    if (!this.cursor.isCollidingWith(this.travelVenus) && this.interacting) {
      this.loadVenus = true;
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
  }

  /**
   * Gives the new scene to LostInSpace
   *
   * @returns the new scene or null
   */
  public override nextScene(): Scene | null {
    if (this.loadVenus) {
      return new Venus(this.maxX, this.maxY);
    }else{
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
    if (this.renderTermianl) {
      this.travelVenus.render(canvas);
    }

    CanvasRenderer.writeText(canvas, 'go to terminal and choose venus', this.obj.getPosX() + 30, 80, 'left', 'arial', 20, 'black');
    CanvasRenderer.writeText(canvas, 'locked', 400, 400, 'left', 'arial', 20, 'yellow');
    CanvasRenderer.writeText(canvas, 'locked', this.maxX - 200, 600, 'left', 'arial', 20, 'yellow');

    this.cursor.render(canvas);
  }
}
