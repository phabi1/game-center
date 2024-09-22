import { BaseButton } from './base.button';

export class TextButton extends BaseButton {
  private _text: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    size = 0,
    texture = ''
  ) {
    super(scene, x, y, texture ? texture : 'button_rect_fill_default', size);

    this._text = scene.add.text(0, 0, text, {
      fontSize: '32px',
      color: '#FFFFFF',
    });

    this._text.setOrigin(0.5);

    this.add(this._text);
  }
}
