import { ColorPicker } from "../components/color-picker";
import { Tile } from "../components/tile";
import { Color } from "../helpers/color.helper";
import { ColorGame } from "../models/game.model";
import { BaseScene } from "./base.scene";

export default class GameScene extends BaseScene {
  private _game!: ColorGame;
  private _selectedColor: string | null = null;

  constructor() {
    super("game");
  }

  create(data: { cols: number; rows: number }) {
    const { cols = 3, rows = 3 } = data;
    this._game = new ColorGame(cols, rows);

    this._game.generateBoard();

    const size = (300 - (cols - 1) * 20) / cols;
    this.generateSampleBoard(size);
    this.generatePlayerBoard(size);

    const colorPicker = new ColorPicker(this, 100, 500, this._game.getColors());
    colorPicker.on("colorchange", (color: string) => {
      this._selectedColor = color;
    });
  }

  private generateSampleBoard(size = 80, gap = 20, x = 100, y = 100) {
    this._game.board.forEach((row, rowIndex) => {
      row.forEach((color, columnIndex) => {
        this.add
          .rectangle(
            x + columnIndex * (size + gap),
            y + rowIndex * (size + gap),
            size,
            size,
            Color.getColor(color),
            1
          )
          .setOrigin(0);
      });
    });
  }

  private generatePlayerBoard(size = 80, gap = 20, x = 500, y = 100) {
    this._game.board.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        const tile = new Tile(
          this,
          x + columnIndex * (size + gap),
          y + rowIndex * (size + gap),
          size,
          size
        );
        tile.on("tileClicked", () => {
          if (this._selectedColor && tile.color !== this._selectedColor) {
            tile.color = this._selectedColor;
          } else if (tile.color === this._selectedColor) {
            tile.color = null;
          } else {
            tile.color = this._selectedColor;
          }
        });
      });
    });
  }
}
