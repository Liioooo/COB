import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';
import {ElectronService} from 'ngx-electron';
import {Page} from '../../models/page-interface';
import {readFile, writeFile, getPath} from './file-system-promises';
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
      const questionsPath = await getPath(this.electronService);
      const workflowPath = await getPath(this.electronService, {defaultPath: questionsPath});

      await writeFile(questionsPath, this.pageStructure.getQuestionsJSON());
      await writeFile(workflowPath, this.pageStructure.getWorkflowJSON());
    } catch (e) {
      console.log(e);
    }
  }

  public async loadJSONs() {
    try {
      // const questionsPath = await getPath(this.electronService);
      // const workflowPath = await getPath(this.electronService);

      const questionsData = (await readFile('C:\\Users\\Alex\\Desktop\\asdf.f')).toString();
      const workflowData = (await readFile('C:\\Users\\Alex\\Desktop\\g.g')).toString();
      // TODO set startpage from workflow file

      const pages: Page[] = JSON.parse(questionsData);
      const flow = JSON.parse(workflowData);

      this.pageStructure.pages = [];
      for (const page of pages) {
        const p = this.pageStructure.addEmptyPage(0, 0);
        this.addProps(p, page);
        this.addProps(p, flow[p.questionId]);
        const pixelPos = this.pageViewGrid.convertGridPosToPixelPos(p.posX, p.posY);
        p.pixelPosX = pixelPos.x;
        p.pixelPosY = pixelPos.y;
      }

      this.pageStructure.pages.forEach(p => {
        this.addConnections(p.questionId, this.pageStructure.pages, flow);
      });
      console.log(this.pageStructure.pages);
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
