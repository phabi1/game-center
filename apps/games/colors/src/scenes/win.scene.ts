import { SceneBase } from "./base.scene";

export class WinScene extends SceneBase {
    constructor() {
        super("win");
    }

    create() {
        this.add.text(this.game.canvas.width / 2, this.game.canvas.height /2, 'Gagné');
    }
}