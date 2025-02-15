import { startdragExample } from './games/dragExample';
import { startMouseTrail } from './games/mouseTrail';
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
      break;
    case 'mouseTrail':
      currentGame = await startMouseTrail(document.body);
      break;
    default:
      console.warn('Unknown game:', gameName);
  }
});
