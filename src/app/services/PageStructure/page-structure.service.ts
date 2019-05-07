import {Injectable} from "@angular/core";
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

  private mandatoryProperties = [
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

  private unusedProperties = [
    'posX',
    'posY',
    'pixelPosX',
    'pixelPosY',
    'isSelected',
    'currentlyDragged',
    'draggingNewConnection',
    'prevConnected',
    'connections'
  ];

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
      page.prevConnected = page.prevConnected
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
      newId = `step${num++}`.replace('step0', 'step00');
    } while (this.pageIdExists(newId));

    const newPage: Page = {
      questionId: newId,
      connections: [],
      prevConnected: [],
      templateType: "none",
      posX,
      posY,
      shortName: '',
      title: '',
      helpQuestion: '',
      helpTooltip: '',
      mandatory: false,
      handover: false,
      handoverText: '',
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
      page.prevConnected = page.prevConnected.filter(c => c.questionId !== rmPageId);
    });
    this._pages = this._pages.filter(page => page.questionId !== rmPageId);
    if (this._pages.length > 0) {
      this._startPage = this._pages[0];
    }
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
    this._pages[index] = {...this._pages[index], ...fieldsToUpdate} as Page;
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

  set pages(pages: Page[]) {
    this._pages = [];
    for (const page of pages) {
      const newPage = this.addEmptyPage();
      // tslint:disable-next-line:forin
      for (const prop in page) {
        newPage[prop] = page[prop];
      }
    }
    this._startPage = pages[0];
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
    if (p1.connections.length === 1) {
      p1.nextQuestion = p2.questionId;
    }
    p2.prevConnected.push(p1);
  }

  public deleteConnection(p1: Page, p2: Page) {
    p1.connections = p1.connections.filter(con => con.nextPage.questionId !== p2.questionId);
    p2.prevConnected = p2.prevConnected.filter(page => page.questionId !== p1.questionId);
  }


  public isValid(): boolean {
    return this.getErrorMessage() === '';
  }

  public getErrorMessage(): string {
    if (this._pages.length === 0) {
      return 'Project is empty';
    }
    if (!this._startPage) {
      return 'Startpage has not been set';
    }


    for (const page of this._pages) {
      for (const prop of this.mandatoryProperties) {
        if (page[prop] === undefined || page[prop] == null) {
          return prop + ' has not been set';
        }
      }

      if (page.templateType === 'none') {
        return 'templateType must not be "none"';
      }

      if (page === this._startPage) {
        continue;
      }
      if (page.connections.find(con => con.nextPage === this._startPage)) {
        return 'Connection must not point to the startpage';
      }
    }
    return this._startPage.prevConnected.find(p => p !== this._startPage) === undefined ? '' :
      'Connection must not point to the startpage';
  }

  public getQuestionsJSON(): string {

    const outPages = [];
    this.getPagesInFlow().forEach(page => {
      outPages.push(this.removeObjectProperties({...page}, this.unusedProperties));
    });

    return JSON.stringify(outPages);
  }

  private getPagesInFlow(): Page[] {
    const flowPages = [];
    return this.addPageToFlow(flowPages, this._startPage);
  }

  private addPageToFlow(flowPages: Page[], toAdd: Page): Page[] {
    if (!toAdd) {
      return flowPages;
    }
    if (flowPages.indexOf(toAdd)) {
      flowPages.push(toAdd);
    }
    for (const conn of toAdd.connections) {
      flowPages = this.addPageToFlow(flowPages, conn.nextPage);
    }
    return flowPages;
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
    this.getPagesInFlow().forEach(page => {
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
