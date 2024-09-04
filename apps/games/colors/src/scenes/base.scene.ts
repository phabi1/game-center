import { Subject } from "rxjs";

export abstract class BaseScene extends Phaser.Scene {
    protected subscribeAll = new Subject<void>();

    constructor(key: string) {
        super(key);
    }

    destroy() {
        this.subscribeAll.next();
        this.subscribeAll.complete();
    }
}