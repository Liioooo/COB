import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';

@Injectable({
  providedIn: 'root'
})
export class PageViewGridService {

    private _GRID_PADDING = 30;
    private _GRID_HEIGHT = 250;
    private _GRID_WIDTH = 400;

    private _zoomLevel = 40;

    // TODO: implement all functions correctly
    constructor(private pageStructure: PageStructureService) { }

    get zoomLevel(): number {
        return this._zoomLevel / 10;
    }

    public getNextGridPosition(droppedX: number, droppedY: number): {x: number, y: number} {
      return {x: 0, y: 0};
    }

    public getPosForNewPage(): {x: number, y: number} {
      let mostX = this._GRID_PADDING;
      let mostY = this._GRID_PADDING;

      this.pageStructure.pages.forEach(page => {
        if (page.posX + 300 > mostX) {
          mostX = page.posX + this._GRID_WIDTH;
        }
        if (page.posY + 200 > mostY) {
          mostY = page.posY + this._GRID_HEIGHT;
        }
      });

      return {x: mostX, y: mostY};
    }

    public convertGridPosToPixelPos(gx: number, gy: number): {x: number, y: number} {
      return {
        x: gx * 50,
        y: gy * 30
      };
    }

    public convertPixelPosToGridPos(px: number, py: number): {x: number, y: number} {
        return {
            x: Math.round(px / 50),
            y: Math.round(py / 30)
        };
    }

    public zoomLarger() {
        if (this._zoomLevel + 2 < 60) {
            this._zoomLevel += 2;
        }
    }

    public zoomSmaller() {
        if (this._zoomLevel - 2 >= 10) {
            this._zoomLevel -= 2;
        }
    }
}

