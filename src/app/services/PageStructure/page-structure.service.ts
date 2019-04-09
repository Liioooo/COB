import {ApplicationRef, ChangeDetectorRef, Injectable} from '@angular/core';
import {Page} from '../../models/page-interface';
import {Observable, Subject} from 'rxjs';
import {templateJitUrl} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {

  private _scrollToPageSubject = new Subject<Page>();

  private _startPage: Page;
  private _pages: Page[];
  private _clipboard: Page[];
  private _selectedPages: Page[];

  constructor() {
    this._pages = [];
    this._clipboard = [];
    this._selectedPages = [];
  }

  public clearSelection(): void {
    this._selectedPages = [];
    for (const page of this._pages) {
      page.isSelected = false;
    }
  }

  public switchSelection(page: Page): void {
    if (page.isSelected) {
      this._selectedPages = this._selectedPages.filter(inPage => inPage.questionId !== page.questionId);
    } else {
      this._selectedPages.push(page);
    }
    page.isSelected = !page.isSelected;
  }

  public pasteClipboard(posX?: number, posY?: number): void {
    if (this._clipboard.length > 0) {
      this.clearSelection();
    }

    const oldToNewPages: { [key: string]: Page; } = {};

    let firstNewPage: Page;
    for (const page of this._clipboard) {
      const newPage: Page = {...page};
      let num: number = 1;
      let newId: string;
      do {
        newId = page.questionId + `(${num++})`;
      } while (this.pageIdExists(newId));

      newPage.questionId = newId;

      newPage.isSelected = true;
      newPage.posX += posX;
      newPage.posY += posY;
      this._selectedPages.push(newPage);
      this.addPage(newPage);
      oldToNewPages[page.questionId + ''] = newPage;
      if (!firstNewPage) {
        firstNewPage = newPage;
      }
    }

    for (const page of this._selectedPages) {
      page.connections = page.connections.map(c => {
        return {condition: c.condition, nextPage: oldToNewPages[c.nextPage.questionId]};
      });
      page.connections = page.connections.filter(p => p.nextPage);
      page.pagesConnected = page.pagesConnected
        .filter(p => p)
        .map(p => {
          return oldToNewPages[p.questionId];
      });
    }

    if (firstNewPage) {
      this.triggerScrollToPage(firstNewPage);
    }
  }

  public addToClipboard(pages: Page[]): boolean {
    for (const page of pages) {
      if (!this.pageIdExists(page.questionId)) {
        return false;
      }
    }
    this._clipboard = [];
    for (const p of pages) {
      this._clipboard.push({...p});
    }
    return true;
  }

  public cut(pages: Page[]): boolean {
    if (!this.addToClipboard(pages)) {
      return false;
    }
    for (const page of pages) {
      this.removePage(page);
    }
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
      pagesConnected: [],
      templateType: 'none',
      posX,
      posY
    };

    this.triggerScrollToPage(newPage);
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

  public removeSelectedPages(): boolean {
    while (this._selectedPages.length > 0) {
      this.removePageById(this._selectedPages[0].questionId);
      delete this._selectedPages[0];
      this._selectedPages = this._selectedPages.slice(1, this._selectedPages.length);
    }
    return true;
  }

  public removePage(rmPage: Page): boolean {
    return this.removePageById(rmPage.questionId);
  }

  public removePageById(rmPageId: string): boolean {
    if (!this.pageIdExists(rmPageId)) {
      return false;
    }
    this._pages.forEach(page => {
      page.connections = page.connections.filter(c => c.nextPage.questionId !== rmPageId);
      page.pagesConnected = page.pagesConnected.filter(c => c.questionId !== rmPageId);
    });
    this._pages = this._pages.filter(page => page.questionId !== rmPageId);
    return true;
  }


  public pageIdExists(idToCheck: string): boolean {
    return this._pages.findIndex(page => page.questionId === idToCheck) !== -1;
  }

  public getPageById(id: string): Page {
    const index = this._pages.findIndex(page => page.questionId === id);
    return index === -1 ? null : this._pages[index];
  }

  public updatePageById(id: string, fieldsToUpdate: object): void {
    const index = this._pages.findIndex(page => page.questionId === id);
    if (index === -1) {
      return;
    }
    this._pages[index] = {...this._pages[index], ...fieldsToUpdate};
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


  get selectedPages(): Page[] {
    return this._selectedPages;
  }

  set selectedPages(value: Page[]) {
    this.clearSelection();
    this._selectedPages = value;
    for (const page of value) {
      page.isSelected = true;
    }
  }

  get isOneSelected(): boolean {
    return this._selectedPages.length === 1;
  }

  public setCurrentlySelectedDrag() {
    this.selectedPages.forEach(page => page.currentlyDragged = true);
  }

  public get shouldScrollToPage(): Observable<Page> {
    return this._scrollToPageSubject.asObservable();
  }

  public triggerScrollToPage(page: Page) {
    this._scrollToPageSubject.next(page);
  }

  public connectPages(p1: Page, p2: Page) {
    if (p1.connections.find(con => con.nextPage.questionId === p2.questionId)) {
      return;
    }
    p1.connections.push({
      condition: '',
      nextPage: p2
    });
    p2.pagesConnected.push(p1);
  }
}
