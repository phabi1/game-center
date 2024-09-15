import { Color } from "./color.model";

export class ColorGame {

  private _rows = 3;
  private _columns = 3;
  private _colors: Color[] = [];

  private _board: Color[][] = [];
  private _playerBoard: Color[][] = [];

  constructor(rows: number, columns: number) {
    this._rows = rows;
    this._columns = columns;
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }

  get board() {
    return [...this._board.map((row) => [...row])];
  }

  generateBoard() {
    this._colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "purple",
      "orange",
      'white',
    ];

    this._board = Array.from({ length: this._rows }, () =>
      Array.from({ length: this._columns }, () => {
        const index = Math.floor(Math.random() * this._colors.length);
        return this._colors[index];
      })
    );
  }

  generatePlayerBoard() {
    this._playerBoard = Array.from({ length: this._rows }, () =>
      Array.from({ length: this._columns }, () => {
        return 'white';
      })
    );
  }

  getColors(): Color[] {
    return this._colors;
  }

  assignColor(row: number, column: number, color: Color) {
    this._playerBoard[row][column] = color;
  }

  isComplete():boolean {
    for (let x = 0; x < this._columns; x++) {
      for (let y = 0; y < this._rows; y++) {
        if (this._board[x][y] !== this._playerBoard[x][y]) {
          return false;
        }
      }
    }
    return true;
  }
}
