import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  getGames: () => ipcRenderer.invoke('get-games'),
  launchGame: (gameId: string) => ipcRenderer.send('launch-game', gameId),
});
