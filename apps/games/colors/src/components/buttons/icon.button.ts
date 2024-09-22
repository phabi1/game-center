import { BaseButton } from "./base.button";

export class IconButton extends BaseButton {
    private _icon: Phaser.GameObjects.Image;
    
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        icon: string,
        texture: string,
    ) {
        super(scene, x, y, texture);
    
        this._icon = scene.add.image(0, 0, icon);
    
        this._icon.setOrigin(0.5);
        this._icon.setPosition(this.width / 2, this.height / 2);
    
        this.add(this._icon);
    }
}