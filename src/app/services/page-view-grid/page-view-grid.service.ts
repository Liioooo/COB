import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';

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

    private _currentViewCenterPos: {x: number, y: number};

    // TODO: implement all functions correctly
    constructor(private pageStructure: PageStructureService) { }

    get zoomLevel(): number {
        return this._zoomLevel / 10;
    }

    public getNextGridPosition(droppedXPix: number, droppedYPix: number, page?: Page): {x: number, y: number} {
      const {x: dropX, y: dropY} = this.convertPixelPosToGridPos(droppedXPix, droppedYPix);
      if (this.isPointFree(dropX, dropY, page)) {
        if (dropX > 0 && dropY > 0) {
          return {x: dropX, y: dropY};
        }
      }

      for (let iteration = 1; true; iteration++) {
        for (let x = -iteration; x <= iteration; x++) {
          if (dropX + x < 0 || dropY + iteration < 0) {
            continue;
          }
          if (this.isPointFree(dropX + x, dropY + iteration, page)) {
            return {x: dropX + x, y: dropY + iteration};
          }
        }
        for (let x = -iteration; x <= iteration; x++) {
          if (dropX + x < 0 || dropY - iteration < 0) {
            continue;
          }
          if (this.isPointFree(dropX + x, dropY - iteration, page)) {
            return {x: dropX + x, y: dropY - iteration};
          }
        }
        for (let y = -iteration + 1; y <= iteration; y++) {
          if (dropY + y < 0 || dropX + iteration < 0) {
            continue;
          }
          if (this.isPointFree(dropX + iteration, dropY + y, page)) {
            return {x: dropX + iteration, y: dropY + y};
          }
        }
        for (let y = -iteration + 1; y < iteration; y++) {
          if (dropY + y < 0 || dropX - iteration < 0) {
            continue;
          }
          if (this.isPointFree(dropX - iteration, dropY + y, page)) {
            return {x: dropX - iteration, y: dropY + y};
          }
        }
      }
    }

    public isPointFree(x: number, y: number, exceptPage?: Page): boolean {
      for (const page of this.pageStructure.pages) {
        if (exceptPage && page.questionId === exceptPage.questionId) {
          continue;
        }
        if (x > page.posX - this._PAGE_WIDTH  && x < page.posX + this._PAGE_WIDTH &&
          y > page.posY - this._PAGE_HEIGHT && y < page.posY + this._PAGE_HEIGHT) {
          return false;
        }
      }
      return true;
    }

    public getPosForNewPage(): {x: number, y: number} {
      return this.getNextGridPosition(this._currentViewCenterPos.x, this._currentViewCenterPos.y);
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

    public setViewPosition(vp: {x: number, y: number}) {
        this._currentViewCenterPos = vp;
    }
}
