import {ApplicationRef, Injectable} from '@angular/core';
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
    private pageViewGrid: PageViewGridService,
    private appRef: ApplicationRef
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
      const flow = JSON.parse(workflowData) as any[];

      this.pageStructure.clearAll();

      for (const page of readPages) {
        this.pageStructure.pages.push({
            ...this.pageStructure.getEmptyPage(0, 0),
            ...page,
            ...flow.find(p => p.questionId === page.questionId)
        });
      }
      this.pageStructure.startPage = this.pageStructure.pages[0];

      for (const page of this.pageStructure.pages) {
        const nextQ = this.pageStructure.pages[this.pageStructure.pages.findIndex(p => p.questionId === page.nextQuestion)];
        const thanQ = this.pageStructure.pages[this.pageStructure.pages.findIndex(p => p.questionId === page.thanQuestion)];
        const elseQ = this.pageStructure.pages[this.pageStructure.pages.findIndex(p => p.questionId === page.elseQuestion)];

        if (nextQ) {
          this.pageStructure.connectPages(page, nextQ);
        }
        if (thanQ) {
          this.pageStructure.connectPages(page, thanQ);
        }
        if (elseQ) {
          this.pageStructure.connectPages(page, elseQ);
        }
      }

      this.pageViewGrid.alignPage(this.pageStructure.pages[0]);
      for (const page of this.pageStructure.pages) {
        const pixelPos = this.pageViewGrid.convertGridPosToPixelPos(page.posX, page.posY);
        page.pixelPosX = pixelPos.x;
        page.pixelPosY = pixelPos.y;
      }

      this.appRef.tick();
    } catch (e) {
      console.log(e);
    }
  }
}
