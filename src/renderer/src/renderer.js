import { DragExample } from './games/dragExample';
import { MouseTrail } from './games/mouseTrail';
import { TileMap } from './games/tileMap';
let currentGame = null;

// Game configuration
const GAMES = {
  dragExample: {
    title: 'Drag Example',
    Class: DragExample
  },
  mouseTrail: {
    title: 'Mouse Trail Example',
    Class: MouseTrail
  },
  tileMap: {
    title: 'Tile Map',
    Class: TileMap
  }
};

function setGameTitle(gameName) {
  document.title = GAMES[gameName]?.title || 'Electron Game';
}

// Listen for game selection from the main process
window.electronAPI.on('select-game', async (gameName) => {
  // Clear previous game if it exists
  if (currentGame) {
    document.body.innerHTML = '';
    currentGame.destroy?.(true);
    currentGame = null;
  }

  // Set the window title
  setGameTitle(gameName);

  // Start the selected game
  const game = GAMES[gameName];
  if (game) {
    const instance = new game.Class(document.body);
    currentGame = await instance.start();
    window.electronAPI.selectGame(gameName);
  } else {
    console.warn('Unknown game:', gameName);
  }
});
