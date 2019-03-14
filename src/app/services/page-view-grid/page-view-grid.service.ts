import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';

@Injectable({
  providedIn: 'root'
})
export class PageViewGridService {

    private _GRID_PADDING = 30;
    private _GRID_HEIGHT = 200;
    private _GRID_WIDTH = 200;

    private _PAGE_WIDTH = 4;
    private _PAGE_HEIGHT = 3;

    private _zoomLevel = 35;

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
        x: gx * this._GRID_WIDTH + (gx + 1) * this._GRID_PADDING,
        y: gy * this._GRID_HEIGHT + (gy + 1) * this._GRID_PADDING
      };
    }

    public convertPixelPosToGridPos(px: number, py: number): {x: number, y: number} {
        return {
            x: Math.round(px / (this._GRID_WIDTH + this._GRID_PADDING)),
            y: Math.round(py / (this._GRID_HEIGHT + this._GRID_PADDING))
        };
    }

    public setZoomInitial() {
        this._zoomLevel = 35;
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

