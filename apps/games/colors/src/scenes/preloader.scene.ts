import { SceneBase } from "./base.scene";

export class PreloaderScene extends SceneBase {
  constructor() {
    super("preloader");
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.add
      .text(width / 2, height / 2 - 50, "Loading...", {
        font: "20px monospace",
      })
      .setFill("#ffffff");
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.add
      .text(width / 2, height / 2 - 5, "0%", {
        font: "18px monospace",
      })
      .setFill("#ffffff");
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.add
      .text(width / 2, height / 2 + 50, "", {
        font: "18px monospace",
      })
      .setFill("#ffffff");
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value: number) {
      percentText.setText(value * 100 + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file: any) {
      assetText.setText("Loading asset: " + file.key);
    });
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();

      this.scene.start("home");
    });

    const images: string[] = [
      "background_home",
      "banner_classic_curtain",
      "banner_hanging",
      "banner_modern",
      "button_brown_close",
      "button_brown",
      "button_grey_close",
      "button_grey",
      "button_red_close",
      "button_red",
    ];

    images.forEach((image) => {
      this.load.image(image, "images/" + image + ".png");
    });
  }
}
