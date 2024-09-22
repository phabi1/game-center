import { Observable } from 'rxjs';
import { IButton } from './button.interface';

export abstract class BaseButton
  extends Phaser.GameObjects.Container
  implements IButton
{
  protected _button: Phaser.GameObjects.Sprite;
  protected _disabled = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    size = 0
  ) {
    super(scene, x, y);

    const textureName = texture + (size > 0 ? '@' + size + 'x' : '');
    this._button = scene.add.sprite(0, 0, textureName);

    this.add(this._button);

    this.setSize(this._button.width / 8, this._button.height / 8);

    this._button.setInteractive();
    this._button.on('pointerdown', this.onDown, this);
    this._button.on('pointerup', this.onUp, this);
    this._button.on('pointerover', this.onOver, this);
    this._button.on('pointerout', this.onOut, this);

    scene.add.existing(this);
  }

  onClick(): Observable<Phaser.Input.Pointer> {
    return new Observable((subscriber) => {
      this._button.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (this._disabled) {
          return;
        }

        subscriber.next(pointer);
      });
    });
  }

  setDisabled(disabled: boolean): this {
    this._disabled = disabled;

    this._button.setAlpha(disabled ? 0.5 : 1);

    return this;
  }

  protected onDown() {
    this._button.setTint(0x787878);
  }

  protected onUp() {
    this._button.clearTint();
  }

  protected onOver() {
    this._button.setTint(0xcccccc);
  }

  protected onOut() {
    this._button.clearTint();
  }
}
