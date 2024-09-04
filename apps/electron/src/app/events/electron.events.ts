/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, BrowserWindow, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import App from '../app';
import { GameService } from '../services/game.service';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', (event) => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});

ipcMain.handle('get-games', async () => {
  const games = await App.container.get<GameService>('games').getGames();
  return games;
});

// Launch Game
ipcMain.on('launch-game', async (event, gameId: string) => {
  const game = await App.container.get<GameService>('games').getGame(gameId);

  if (!game) {
    return;
  }

  const gameWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  gameWindow.loadURL(app.getAppPath() + '/games/' + game.id + '/index.html');
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
