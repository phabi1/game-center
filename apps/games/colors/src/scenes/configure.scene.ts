import { takeUntil } from 'rxjs';
import { TextButton } from '../components/buttons/text.button';
import { Level } from '../models/level.model';
import { levelService } from '../services/level.service';
import { SceneBase } from './base.scene';

export default class ConfigureScene extends SceneBase {
  private _selectedSize = 3;
  private _sizeShape!: Phaser.GameObjects.Rectangle;

  constructor() {
    super('configure');
  }

  create() {

    const bg = this.add.image(0, 0, 'background_home').setOrigin(0);
    bg.displayWidth = this.game.canvas.width;
    bg.displayHeight = this.game.canvas.height;
    bg.setAlpha(0.5)

    const backButton = new TextButton(this, 16, 16, 'Back');
    backButton
      .onClick()
      .pipe(takeUntil(this.subscribeAll))
      .subscribe(() => {
        this.scene.start('home');
      });

    this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      'panel_default'
    );

    this.add
      .text(this.game.canvas.width / 2, 120, 'Taille')
      .setOrigin()
      .setFontSize(20);

    this._sizeShape = this.add
      .rectangle(this.game.canvas.width / 2, 0, 140, 42, 0xffffff, 0.5)
      .setVisible(false);

    let ry = 230;
    const rH = 42;
    const rW = 140;
    for (let size = 3; size <= 6; size++) {
      const rect = this.add
        .rectangle(this.game.canvas.width / 2, ry, rW, rH, 0xffffff, 0.1)
        .setOrigin();
      this.add
        .text(this.game.canvas.width / 2, ry, size + ' x ' + size)
        .setOrigin().setFontSize(22);
      rect.setData('size', size);
      rect.setInteractive();
      rect.on('pointerdown', () => {
        this._selectedSize = rect.getData('size');
        this._sizeShape.setY(rect.y);
        this._sizeShape.setVisible(true);
      });

      ry += rH + 5;
    }

    const startButton = new TextButton(this, 400, 500, 'Commencer');
    startButton
      .onClick()
      .pipe(takeUntil(this.subscribeAll))
      .subscribe(() => {
        levelService.levels = [
          new Level('easy', 'Facile'),
          new Level('middle', 'Moyen'),
          new Level('hard', 'Difficile'),
        ];

        levelService.currentLevelIndex = 0;

        levelService.size = 5;
        levelService.size = this._selectedSize;

        this.scene.start('game');
      });
  }
}
