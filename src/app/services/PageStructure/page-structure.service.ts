import { Injectable } from '@angular/core';
import {Page} from '../../models/page-interface';

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {

  private _startPage: Page;
  private _pages: Page[] = [];

  constructor() { }



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
}
