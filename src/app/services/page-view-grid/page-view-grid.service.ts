import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';

@Injectable({
  providedIn: 'root'
})
export class PageViewGridService {

    private _GRID_PADDING = 5;
    private _GRID_HEIGHT = 20;
    private _GRID_WIDTH = 20;

    private _PAGE_WIDTH = 4;
    private _PAGE_HEIGHT = 3;

    private _zoomLevel = 35;

    // TODO: implement all functions correctly
    constructor(private pageStructure: PageStructureService) { }

    get zoomLevel(): number {
        return this._zoomLevel / 10;
    }

    public getNextGridPosition(droppedXPix: number, droppedYPix: number): {x: number, y: number} {
      const {x: dropX, y: dropY} = this.convertPixelPosToGridPos(droppedXPix, droppedYPix);
      for (let iteration = 1; true; iteration++) {
        for (let x = -iteration; x <= iteration; x++) {
          if (this.isPointFree(dropX + x, dropY + 1)) {
            return {x: dropX + x, y: dropY + 1};
          }
        }
        for (let x = -iteration; x <= iteration; x++) {
          if (this.isPointFree(dropX + x, dropY - 1)) {
            return {x: dropX + x, y: dropY - 1};
          }
        }
        for (let y = -iteration + 1; y < iteration; y++) {
          if (this.isPointFree(dropX + 1, dropY + y)) {
            return {x: dropX + 1, y: dropY + y};
          }
        }
        for (let y = -iteration + 1; y < iteration; y++) {
          if (this.isPointFree(dropX - 1, dropY + y)) {
            return {x: dropX - 1, y: dropY + y};
          }
        }
      }
    }

    public isPointFree(x: number, y: number): boolean {
      for (const page of this.pageStructure.pages) {
        if (x > page.posX - this._PAGE_WIDTH  && x < page.posX + this._PAGE_WIDTH &&
          y > page.posY - this._PAGE_HEIGHT && y < page.posY + this._PAGE_HEIGHT) {
          return false;
        }
      }
      return true;
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

