import { takeUntil } from "rxjs";
import { TextButton } from "../components/buttons/text.button";
import { InputField } from "../components/forms/fields/input.field";
import { BaseScene } from "./base.scene";

export default class ConfigureScene extends BaseScene {
  constructor() {
    super("configure");
  }

  create() {
    const backButton = new TextButton(this, 16, 16, "button", "Back");
    backButton
      .onClick()
      .pipe(takeUntil(this.subscribeAll))
      .subscribe(() => {
        this.scene.start("home");
      });

    const sizeInput = new InputField(
      this,
      200,
      250,
      200,
      50,
      "Taille de la grille"
    );

    const nbPartyInput = new InputField(
      this,
      200,
      300,
      200,
      50,
      "Nombre de parties"
    );

    const startButton = new TextButton(this, 400, 500, "button", "Start Game");
    startButton
      .onClick()
      .pipe(takeUntil(this.subscribeAll))
      .subscribe(() => {
        this.scene.start("game", {
          cols: parseInt(sizeInput.value) || 3,
          rows: parseInt(sizeInput.value) || 3,
        });
      });
  }
}
