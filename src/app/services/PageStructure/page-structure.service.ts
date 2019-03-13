import { Injectable } from '@angular/core';
import {Page} from '../../models/page-interface';

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {

  private _startPage: Page;
  private _pages: Page[];
  private _clipboard: Page[] = [];

  constructor() {
    this._pages = [];
  }

  public pasteClipboard(posX?: number, posY?: number): void {
    for (const page of this._clipboard) {
      const newPage = {...page};
      let num: number = 1;
      let newId: string;
      do {
        newId = page.questionId + `(${num++})`;
      } while (this.pageIdExists(newId));

      newPage.questionId = newId;

      this.addPage(newPage);
    }
  }

  public addToClipboard(pages: Page[]): boolean {
    for (const page of pages) {
      if (!this.pageIdExists(page.questionId)) {
        return false;
      }
    }
    this._clipboard = pages;
    return true;
  }

  public addEmptyPage(posX?: number, posY?: number): Page {
    let num: number = this._pages.length;
    let newId: string;
    do {
      newId = `step${num++}`;
    } while (this.pageIdExists(newId));

    const newPage: Page = {
      questionId: newId,
      connections: [],
      templateType: 'none',
      posX,
      posY
    };

    this.addPage(newPage);
    return newPage;
  }

  public addPage(newPage: Page): boolean {
    if (this.pageIdExists(newPage.questionId)) {
      return false;
    }
    if (this._pages.length === 0) {
      this._startPage = newPage;
    }
    this._pages.push(newPage);
    return true;
  }

  public removePage(rmPage: Page): boolean {
    return this.removePageById(rmPage.questionId);
  }

  public removePageById(rmPageId: string): boolean {
    if (!this.pageIdExists(rmPageId)) {
      return false;
    }
    this._pages = this._pages.filter(page => page.questionId !== rmPageId);
    return true;
  }


  public pageIdExists(idToCheck: string): boolean {
    for (const page of this._pages) {
      if (page.questionId === idToCheck) {
        return true;
      }
    }
    return false;
  }



  get startPage(): Page {
    return this._startPage;
  }

  set startPage(value: Page) {
    this._startPage = value;
    if (!this.pageIdExists(value.questionId)) {
      this.addPage(value);
    }
  }

  get pages(): Page[] {
    return this._pages;
  }

  get clipboard(): Page[] {
    return this._clipboard;
  }
}
