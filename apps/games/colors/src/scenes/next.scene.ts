import { takeUntil } from "rxjs";
import { TextButton } from "../components/buttons/text.button";
import { levelService } from "../services/level.service";
import { SceneBase } from "./base.scene";

export class NextScene extends SceneBase {
    constructor() {
        super("next");
    }

create() {
    const nextButton = new TextButton(this,this.game.canvas.width / 2, this.game.canvas.height /2, 'button', 'Next');
        nextButton.onClick().pipe(takeUntil(this.subscribeAll)).subscribe(() => {
            levelService.nextLevel();
            this.scene.start('game');
        })
}
}