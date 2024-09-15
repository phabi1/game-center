import { Subject } from "rxjs";

export abstract class SceneBase extends Phaser.Scene {
    protected subscribeAll = new Subject<void>();

    constructor(key: string) {
        super(key);
    }

    destroy() {
        this.subscribeAll.next();
        this.subscribeAll.complete();
    }
}