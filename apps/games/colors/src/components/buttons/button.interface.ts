import { Observable } from "rxjs";

export interface IButton
  extends Phaser.GameObjects.GameObject,
    Phaser.GameObjects.Components.Transform {
  onClick(): Observable<Phaser.Input.Pointer>;

  setDisabled(disabled: boolean): this;
}
