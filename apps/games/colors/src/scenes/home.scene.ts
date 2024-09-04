import { takeUntil } from "rxjs";
import { TextButton } from "../components/buttons/text.button";
import { BaseScene } from "./base.scene";

export default class HomeScene extends BaseScene {
  constructor() {
    super("home");
  }

  create() {
    const bg = this.add.image(0, 0, "background_home").setOrigin(0);
    bg.displayWidth = this.game.canvas.width;
    bg.displayHeight = this.game.canvas.height;

    const playButton = new TextButton(this, 400, 300, "button", "Play");
    playButton
      .onClick()
      .pipe(takeUntil(this.subscribeAll))
      .subscribe(() => {
        this.scene.start("configure");
      });
  }
}
