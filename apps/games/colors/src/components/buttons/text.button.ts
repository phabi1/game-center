import { BaseButton } from "./base.button";

export class TextButton extends BaseButton {
    private _text: Phaser.GameObjects.Text;
    
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        text: string,
    ) {
        super(scene, x, y, texture);
    
        this._text = scene.add.text(0, 0, text, {
        fontSize: "32px",
        color: "#FFFFFF",
        });
    
        this._text.setOrigin(0.5);
        this._text.setPosition(this.width / 2, this.height / 2);
    
        this.add(this._text);
    }
}