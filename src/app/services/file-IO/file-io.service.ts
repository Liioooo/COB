import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';
import {ElectronService} from 'ngx-electron';
import {Page} from '../../models/page-interface';
import {readFile, writeFile, getSavePath, getPath} from './file-system-promises';
import {PageViewGridService} from '../page-view-grid/page-view-grid.service';

@Injectable({
  providedIn: 'root'
})
export class FileIOService {

  constructor(
    private pageStructure: PageStructureService,
    private electronService: ElectronService,
    private pageViewGrid: PageViewGridService
  ) { }

  public async exportJSONs() {
    console.log('isValid: ', this.pageStructure.getErrorMessage());


    try {
      const questionsPath = await getSavePath(this.electronService);
      const workflowPath = await getSavePath(this.electronService, {defaultPath: questionsPath});

      await writeFile(questionsPath, this.pageStructure.getQuestionsJSON());
      await writeFile(workflowPath, this.pageStructure.getWorkflowJSON());
    } catch (e) {
      console.log(e);
    }
  }

  public async loadJSONs() {
    try {
      const questionsPath = await getPath(this.electronService);
      const workflowPath = await getPath(this.electronService);

      const questionsData = (await readFile(questionsPath)).toString();
      const workflowData = (await readFile(workflowPath)).toString();
      // TODO set startpage from workflow file

      const readPages: Page[] = JSON.parse(questionsData);
      const flow = JSON.parse(workflowData);

      const pages: Page[] = [];

      this.pageStructure.pages = [];
      for (const page of readPages) {
        const p = this.pageStructure.getEmptyPage(0, 0);
        this.addProps(p, page);
        this.addProps(p, flow[p.questionId]);
        pages.push(p);
      }

      pages.forEach(p => {
        this.addConnections(p.questionId, pages, flow);
      });

      this.pageViewGrid.alignPage(pages[0]);

      for (const page of pages) {
        const pixelPos = this.pageViewGrid.convertGridPosToPixelPos(page.posX, page.posY);
        page.pixelPosX = pixelPos.x;
        page.pixelPosY = pixelPos.y;
      }

      console.log(pages);
      this.pageStructure.pages = pages;
    } catch (e) {
      console.log(e);
    }
  }

  private addConnections(questionId: string, pages: Page[], flow: any[]): void {
    const page = pages.find(p => p.questionId === questionId);
    const flowPage = flow.find(p => p.questionId === questionId);
    this.addConnection(page, pages, flowPage, 'nextQuestion');
    this.addConnection(page, pages, flowPage, 'thanQuestion');
    this.addConnection(page, pages, flowPage, 'elseQuestion');
  }

  private addConnection(page: Page, pages: Page[], flow: any, question: string): void {
    if (flow[question]) {
      const other = pages.find(p => p.questionId === flow[question]);
      page.connections.push( { nextPage: other } );
      other.prevConnected.push(page);
      page[question] = flow[question];
    }
  }

  private addProps(noProps: any, propsToAdd: any): void {
    for (const prop in propsToAdd) {
      noProps[prop] = propsToAdd[prop];
    }
  }
}
