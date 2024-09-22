import { ColorPicker } from '../components/color-picker';
import { Tile } from '../components/tile';
import { ColorHelper } from '../helpers/color.helper';
import { Color } from '../models/color.model';
import { ColorGame } from '../models/game.model';
import { levelService } from '../services/level.service';
import { SceneBase } from './base.scene';

export default class GameScene extends SceneBase {
  private _game!: ColorGame;
  private _selectedColor: Color = 'white';
  private colorPicker!: ColorPicker;

  constructor() {
    super('game');
  }

  create() {

    const bg = this.add.image(0, 0, 'background_home').setOrigin(0);
    bg.displayWidth = this.game.canvas.width;
    bg.displayHeight = this.game.canvas.height;
    bg.setAlpha(0.5)

    const boardSize = levelService.size;
    this._game = new ColorGame(boardSize, boardSize);

    this._game.generateBoard();
    this._game.generatePlayerBoard();

    const gap = 20;
    const size = (300 - (boardSize - 1) * gap) / boardSize;

    const boardW = this._game.columns * size + (this._game.columns - 1) * gap;
    const sampleX = this.game.canvas.width / 4 - boardW / 2;
    const playerX = (this.game.canvas.width / 4) * 3 - boardW / 2;

    this.generateSampleBoard(size, gap, sampleX);
    this.generatePlayerBoard(size, gap, playerX);

    this.colorPicker = new ColorPicker(
      this,
      this.game.canvas.width / 2 - 150,
      this.game.canvas.height - 130,
      this._game.getColors().filter((color) => color != 'white')
    );

    this.colorPicker.on('colorchange', (color: Color) => {
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
            ColorHelper.getColor(color),
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
        tile.setData('row', rowIndex);
        tile.setData('column', columnIndex);
        tile.on('tileClicked', () => {
          if (tile.color === this._selectedColor) {
            tile.color = 'white';
            this._game.assignColor(
              tile.getData('row'),
              tile.getData('column'),
              'white'
            );
          } else {
            tile.color = this._selectedColor;
            this._game.assignColor(
              tile.getData('row'),
              tile.getData('column'),
              this._selectedColor
            );
          }

          if (this._game.isComplete()) {
            if (levelService.isLast()) {
              this.scene.start('win');
            } else {
              this.scene.start('next');
            }
          }
        });
      });
    });
  }
}
