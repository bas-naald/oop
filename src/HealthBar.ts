import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class HealthBar extends CanvasItem {
  private health: number;

  public constructor() {
    super();

    this.image = CanvasRenderer.loadNewImage('assets/heart.png');

    this.health = 3;
    this.posX = 0;
    this.posY = 10;
  }

  /**
   * Update game state. Called from the GameLoop,
   * removes one heart from the health bar
   */
  public override update(): void {
    this.health -= 1;
  }

  public getHealth(): number {
    return this.health;
  }

  /**
   * Render all the elements in the screen.
   *
   * @param canvas canvas to render the CanvasItem to
   */
  public override render(canvas: HTMLCanvasElement): void {
    // Checks the if statements and renders the correct elements
    if (this.health >= 1) {
      CanvasRenderer.drawImage(canvas, this.image, 10, 10);
    }
    if (this.health >= 2) {
      CanvasRenderer.drawImage(canvas, this.image, 15 + this.image.width, 10);
    }
    if (this.health == 3) {
      CanvasRenderer.drawImage(canvas, this.image, 20 + (this.image.width * 2), 10);
    }
  }
}
