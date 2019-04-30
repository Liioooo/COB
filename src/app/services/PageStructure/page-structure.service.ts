import {ApplicationRef, ChangeDetectorRef, Injectable} from "@angular/core";
import {Page} from "../../models/page-interface";
import {Observable, Subject} from "rxjs";
import {SearchService} from "../search/search.service";

@Injectable({
  providedIn: "root"
})
export class PageStructureService {

  private _scrollToPageSubject = new Subject<Page>();

  private _startPage: Page;
  private _pages: Page[];
  private _clipboard: Page[];
  private _selectedPages: Page[];
  public results: Page[] = [];

  constructor(private searchService: SearchService) {
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
        return {nextPage: oldToNewPages[c.nextPage.questionId]};
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
      templateType: "none",
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
    this.search(this.searchService.keyword);
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

  public search(keyword: string): void {
    if (keyword === "") {
      return;
    }
    this.results = this.pages.filter((page: Page) => page.questionId.includes(keyword));
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
    if (p1.connections.length >= 3) {
      return;
    }
    p1.connections.push({
      nextPage: p2
    });
    p2.pagesConnected.push(p1);
  }

  public deleteConnection(p1: Page, p2: Page) {
    p1.connections = p1.connections.filter(con => con.nextPage.questionId !== p2.questionId);
    p2.pagesConnected = p2.pagesConnected.filter(page => page.questionId !== p1.questionId);
  }

  public moveSelection(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    const destinationPage = this.findPage(direction);
    if (destinationPage !== null) {
      this.clearSelection();
      this.switchSelection(destinationPage);
    }
  }

  private findPage(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'): Page {
    let page: any = {posY: -1, posX: -1};

    switch (direction) {
      case 'UP':
        let highestSelected = this._selectedPages[0];
        this._selectedPages.forEach(selectedPage => {
          highestSelected = highestSelected.posY > selectedPage.posY ? selectedPage : highestSelected;
        });
        this._pages.forEach(p => {
          page = highestSelected.posY - p.posY > 0
          && highestSelected.posY - p.posY < highestSelected.posY - page.posY
          && Math.abs(highestSelected.posX - p.posX) <= 2 ? p : page;
        });
        break;
      case 'DOWN':
        page.posY = Number.MAX_VALUE;
        let lowestSelected = this._selectedPages[0];
        this._selectedPages.forEach(selectedPage => {
          lowestSelected = lowestSelected.posY < selectedPage.posY ? selectedPage : lowestSelected;
        });
        this._pages.forEach(p => {
          page = p.posY - lowestSelected.posY > 0
          && p.posY - lowestSelected.posY < page.posY - lowestSelected.posY
          && Math.abs(lowestSelected.posX - p.posX) <= 2 ? p : page;
        });
        break;
      case 'LEFT':
        let leftestSelected = this._selectedPages[0];
        this._selectedPages.forEach(selectedPage => {
          leftestSelected = leftestSelected.posX > selectedPage.posX ? selectedPage : leftestSelected;
        });
        this._pages.forEach(p => {
          page = leftestSelected.posX - p.posX > 0
          && leftestSelected.posX - p.posX < leftestSelected.posX - page.posX
          && Math.abs(leftestSelected.posY - p.posY) <= 2 ? p : page;
        });
        break;
      case 'RIGHT':
        page.posX = Number.MAX_VALUE;
        let rightestSelected = this._selectedPages[0];
        this._selectedPages.forEach(selectedPage => {
          rightestSelected = rightestSelected.posX < selectedPage.posX ? selectedPage : rightestSelected;
        });
        this._pages.forEach(p => {
          page = p.posX - rightestSelected.posX > 0
          && p.posX - rightestSelected.posX < page.posX - rightestSelected.posX
          && Math.abs(rightestSelected.posY - p.posY) <= 2 ? p : page;
        });
        break;
    }

    return page.hasOwnProperty("questionId") ? page : null;
  }

  public isValid(): boolean {
    if (this._pages.length === 0 || !this._startPage) {
      return false;
    }
    const mandatoryProperties = [
      'questionId',
      'templateType',
      'shortName',
      'title',
      'helpQuestion',
      'helpTooltip',
      'mandatory',
      'handover',
      'handoverText'
    ];

    for (const page of this._pages) {
      for (const prop of mandatoryProperties) {
        if (page[prop] === undefined || page[prop] == null) {
          return false;
        }
      }

      if (page.templateType === 'none') {
        return false;
      }

      if (page === this._startPage) {
        continue;
      }
      if (page.connections.find(con => con.nextPage === this._startPage)) {
        return false;
      }
    }
    return this._startPage.pagesConnected.find(p => p !== this._startPage) === undefined;
  }

  public getQuestionsJSON(): string {
    const unusedProperties = [
      'posX',
      'posY',
      'pixelPosX',
      'pixelPosY',
      'isSelected',
      'currentlyDragged',
      'draggingNewConnection',
      'pagesConnected',
      'connections'
    ];

    const outPages = [];
    this._pages.forEach(page => {
      outPages.push(this.removeObjectProperties({...page}, unusedProperties));
    });
    return JSON.stringify(outPages);
  }


  public getWorkflowJSON(): string {
    const usedProperties = [
      'questionId',
      'condition',
      'elseQuestion',
      'thanQuestion',
      'nextQuestion'
    ];

    const outPages = [];
    this._pages.forEach(page => {
      outPages.push(this.keepObjectProperties({...page}, usedProperties));
    });
    return JSON.stringify(outPages);
  }


  private removeObjectProperties(obj: any, props: string[]): any {
    for (const prop of props) {
      if (obj.hasOwnProperty(prop)) {
        delete obj[prop];
      }
    }
    return obj;
  }

  private keepObjectProperties(obj: any, props: string[]): any {
    const out = {};
    for (const prop of props) {
      out[prop] = obj[prop];
    }
    return out;
  }
}
