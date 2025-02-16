import { startdragExample } from './games/dragExample';
import { startMouseTrail } from './games/mouseTrail';
import { startSnakeMesh } from './games/snakeMesh';
let currentGame = null;

// Listen for game selection from the main process
window.electronAPI.on('select-game', async (gameName) => {
  // Clear previous game if it exists
  if (currentGame) {
    document.body.innerHTML = '';
    currentGame.destroy?.(true);
    currentGame = null;
  }

  // Start the selected game
  switch (gameName) {
    case 'dragExample':
      currentGame = await startdragExample(document.body);
      window.electronAPI.selectGame(gameName);
      break;
    case 'mouseTrail':
      currentGame = await startMouseTrail(document.body);
      window.electronAPI.selectGame(gameName);
      break;
    case 'snakeMesh':
      currentGame = await startSnakeMesh(document.body);
      window.electronAPI.selectGame(gameName);
      break;
    default:
      console.warn('Unknown game:', gameName);
  }
});
