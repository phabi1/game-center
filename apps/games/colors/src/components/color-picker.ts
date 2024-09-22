import { ColorHelper } from '../helpers/color.helper';
import { Color } from '../models/color.model';

export class ColorPicker extends Phaser.GameObjects.Container {
  private _selectedColor!: Color;
  private _cursor: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number, colors: Color[]) {
    super(scene, x, y);

    const bg = scene.add.image(0, 0, 'colorpicker_bg_default');
    bg.setOrigin(0);
    this.add(bg);

    let xPos = 0;
    colors.forEach((color) => {
      const colorRect = scene.add
        .rectangle(xPos, 24, 40, 40, ColorHelper.getColor(color), 1)
        .setOrigin(0);
      colorRect.setData('color', color);
      colorRect.setInteractive();
      colorRect.on('pointerdown', () => {
        this.onSelectColor(color);
      });

      this.add(colorRect);
      xPos += 50;
    });

    this._selectedColor = colors[0];

    this._cursor = scene.add
      .rectangle(0, 23, 42, 42, 0xffffff, 0)
      .setOrigin(0)
      .setStrokeStyle(2, 0xffffff, 1);
    this.add(this._cursor);

    this.scene.add.existing(this);
  }

  get selectedColor(): Color {
    return this._selectedColor;
  }

  private onSelectColor(color: Color) {
    this.each((child: Phaser.GameObjects.Rectangle) => {
      if (child.getData('color') === color) {
        this._cursor.x = child.x - 1;
      }
    });
    this._selectedColor = color;
    this.emit('colorchange', color);
  }
}
