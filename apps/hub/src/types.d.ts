declare interface Window {
    electron: {
      getAppVersion(): Promise<string>;
      platform: string;
      getGames(): Promise<any[]>;
      launchGame(gameId: string): Promise<void>;
    };
  }
  