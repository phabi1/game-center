import { readdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Game } from '../models/game.model';

export class GameService {
  private loaded = false;
  private games: Game[] = [];
  private directory: string;

  getDirectory(): string {
    return this.directory;
  }

  setDirectory(directory: string): void {
    this.directory = directory;
  }

  async getGames(): Promise<any[]> {
    if (!this.loaded) {
      await this.loadGames();
    }
    return this.games;
  }

  async getGame(id: string): Promise<Game> {
    if (!this.loaded) {
      await this.loadGames();
    }
    return this.games.find((game) => game.id === id);
  }

  private async loadGames(): Promise<void> {
    const items = await this.scanDirectory(this.directory);
    const games = [];
    for (const item of items) {
      const gameInfo = await this.readGameInfo(item);
      games.push(gameInfo);
    }

    this.games = games;

    this.loaded = true;
  }

  private async scanDirectory(directory: string): Promise<string[]> {
    const items = [];
    const dirents = await readdir(directory, { withFileTypes: true });
    for (const dirent of dirents) {
      const path = join(directory, dirent.name);
      if (dirent.isDirectory()) {
        items.push(join(path, 'game.json'));
      }
    }
    return items;
  }

  private async readGameInfo(path: string): Promise<Game> {
    const content = await readFile(path, 'utf-8');
    const info = JSON.parse(content);
    let id: string = info.id;
    console.log('id', id);
    if (id === undefined) {
      const paths = dirname(path).replace('\\', '/').split('/');
      console.log('paths', paths);
      id = paths.pop();
    }

    return {
      id: id,
      title: info.title,
      version: info.version || '1.0.0',
      screenshot: join(this.directory, 'games', id, 'screenshot.png'),
    };
  }
}
