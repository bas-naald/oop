import { GameLoop } from './GameLoop.js';
import LostInSpace from './LostInSpace.js';

const lostInSpace: LostInSpace = new LostInSpace(document.getElementById('game') as HTMLCanvasElement);

const gameLoop: GameLoop = new GameLoop(lostInSpace);
window.addEventListener('load', () => {
  gameLoop.start();
});
