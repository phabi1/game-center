import Phaser from "phaser";
import { BehaviorSubject, Observable } from "rxjs";

export class InputField extends Phaser.GameObjects.Container {
  private _input: Phaser.GameObjects.DOMElement;
  private _label: Phaser.GameObjects.Text;
  private _valueSubject = new BehaviorSubject("");

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    label: string
  ) {
    super(scene, x, y);

    this._label = scene.add.text(0, 0, label, {
      fontSize: "32px",
      color: "#FFFFFF",
    });

    this._label.setOrigin(0.5);
    this._label.setPosition(width / 2, 0);

    this._input = scene.add.dom(0, 0, "input", {
      type: "text",
      style: {
        width: `${width}px`,
        height: `${height}px`,
        fontSize: "32px",
        backgroundColor: "#FFFFFF",
        color: "#000000",
      }
    });

    this._input.setOrigin(0.5);
    this._input.setPosition(width / 2, this._label.height + height / 2);

    this._input.addListener("input");
    this._input.on("input", this.onInput, this);

    this.add([this._label, this._input]);

    scene.add.existing(this);
  }

  get value() {
    return this._valueSubject.value;
  }

  get valueChange(): Observable<string> {
    return this._valueSubject.asObservable();
  }

  private onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this._valueSubject.next(target.value);
  }

  protected preDestroy(): void {
    super.preDestroy();
    this._input.off("input", this.onInput, this);
    this._valueSubject.complete();
  }
}
