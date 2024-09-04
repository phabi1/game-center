import Phaser from "phaser";
import ConfigureScene from "./scenes/configure.scene";
import GameScene from "./scenes/game.scene";
import HomeScene from "./scenes/home.scene";
import { PreloaderScene } from "./scenes/preloader.scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  backgroundColor: "#4C4C80",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [PreloaderScene, HomeScene, ConfigureScene, GameScene],
};

export default new Phaser.Game(config);
