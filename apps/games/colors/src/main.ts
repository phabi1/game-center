import Phaser from "phaser";
import ConfigureScene from "./scenes/configure.scene";
import GameScene from "./scenes/game.scene";
import HomeScene from "./scenes/home.scene";
import { PreloaderScene } from "./scenes/preloader.scene";
import { NextScene } from "./scenes/next.scene";
import { WinScene } from "./scenes/win.scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  backgroundColor: "#4C4C80",
  physics: {
    default: "arcade",
  },
  dom: {
    createContainer: true,
  },
  scene: [PreloaderScene, HomeScene, ConfigureScene, GameScene, NextScene, WinScene],
};

export default new Phaser.Game(config);
