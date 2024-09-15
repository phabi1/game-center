import { ColorHelper } from "../helpers/color.helper";

export class Tile extends Phaser.GameObjects.Rectangle {
  private _color: string | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
    super(scene, x, y, w, h, 0xffffff, 1);
    this.setOrigin(0);
    this.setFillStyle(0xffffff, 1);
    this.setStrokeStyle(2, 0x000000, 1);
    this.setInteractive();
    this.on("pointerdown", this.onTileClicked, this);
    this.scene.add.existing(this);
  }

  private onTileClicked() {
    this.emit("tileClicked", { color: this._color });
  }

  get color(): string | null {
    return this._color;
  }

  set color(color: string | null) {
    this._color = color;
    if (color) {
      this.setFillStyle(ColorHelper.getColor(this._color as string), 1);
      this.setStrokeStyle(2, 0x000000, 1);
    } else {
      this.setFillStyle(0xffffff, 1);
      this.setStrokeStyle(2, 0x000000, 1);
    }
  }
}
