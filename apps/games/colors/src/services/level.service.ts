import { Level } from "../models/level.model";

export class LevelService {
    private _levels: Level[] = [];
    private _currentLevelIndex = 0;
    
    public size = 3;

    get levels (): Level[] {
        return this._levels;
    }

    set levels (value: Level[]) {
        this._levels = value;
    }

    get currentLevelIndex (): number {
        return this._currentLevelIndex;
    }

    set currentLevelIndex (value: number) {
        this._currentLevelIndex = value;
    }

    isLast(): boolean {
        if (this._currentLevelIndex === this._levels.length - 1) {
            return true;
        }
        return false;
    }

previousLevel() {
    if (this._currentLevelIndex > 0) {
        this._currentLevelIndex === 0;
    }
}

    nextLevel(): void {
        if (this._currentLevelIndex < this._levels.length - 1) {
            this._currentLevelIndex++;
        }
    }
}

export const levelService = new LevelService();