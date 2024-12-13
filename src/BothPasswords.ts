import CanvasItem from './CanvasItem.js';

export default class BothPasswords extends CanvasItem {
  public imagesPosX: number[];

  public posXarray: number[];

  protected posX1: number;

  protected posX2: number;

  protected posX3: number;

  protected posX4: number;

  protected posX5: number;

  protected j: number = -1;

  public constructor() {
    super();

    this.imagesPosX = [475, 675, 875, 1075, 1275];
    this.posXarray = [this.posX1, this.posX2, this.posX3, this.posX4, this.posX5];

    for (let i: number = this.imagesPosX.length; i > 0; i--) {
      this.j += 1;
      const random: number = Math.floor(Math.random() * this.imagesPosX.length);
      this.posXarray[this.j] = this.imagesPosX[random];
      this.imagesPosX.splice(random, 1);
    }
  }

  /**
   * Updates the state of the passwords in the password game.
   */
  public override update(): void {
    // Array with positions of the images
    this.imagesPosX = [475, 675, 875, 1075, 1275];
    this.posXarray = [this.posX1, this.posX2, this.posX3, this.posX4, this.posX5];

    // Loop through the array of positions and chooses a random position
    this.j = -1;
    for (let i: number = this.imagesPosX.length; i > 0; i--) {
      this.j += 1;
      const random: number = Math.floor(Math.random() * this.imagesPosX.length);
      this.posXarray[this.j] = this.imagesPosX[random];
      this.imagesPosX.splice(random, 1);
    }
  }
}

