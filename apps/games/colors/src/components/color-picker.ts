import { Color } from "../helpers/color.helper";

export class ColorPicker extends Phaser.GameObjects.Container {
  private _selectedColor: string | null = null;
  private _cursor: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number, colors: string[]) {
    super(scene, x, y);

    colors.forEach((color, index) => {
      const colorRect = scene.add
        .rectangle(index * 50, 0, 40, 40, Color.getColor(color), 1)
        .setOrigin(0);
      colorRect.setData("color", color);
      colorRect.setInteractive();
      colorRect.on("pointerdown", () => {
        this.onSelectColor(color);
      });

      this.add(colorRect);
    });

    this._cursor = scene.add.rectangle(0, -1, 42, 42, 0xffffff, 0).setOrigin(0).setStrokeStyle(2, 0xFFFFFF, 1);
    this.add(this._cursor);

    this.scene.add.existing(this);
  }

  private onSelectColor(color: string) {
    this.each((child: Phaser.GameObjects.Rectangle) => {
        if (child.getData("color") === color) {
            this._cursor.x = child.x - 1;
        }
    });
    this._selectedColor = color;
    this.emit("colorchange", color);
  }
}
