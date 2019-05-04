import { Injectable } from '@angular/core';
import * as fs from "fs";
import {PageStructureService} from '../PageStructure/page-structure.service';
import {ElectronService} from 'ngx-electron';
import {Page} from '../../models/page-interface';
import {readFile, writeFile, getPath} from './file-system-promises';
import {__await} from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class FileIOService {

  constructor(private pageStructure: PageStructureService, private electronService: ElectronService) { }

  // public exportJSONs() {
  //   console.log('isValid: ', this.pageStructure.getErrorMessage());
  //
  //   this.electronService.remote.dialog.showSaveDialog(null, (questionsPath) => {
  //     try {
  //       fs.writeFileSync(questionsPath, this.pageStructure.getQuestionsJSON(), 'utf-8');
  //
  //       this.electronService.remote.dialog.showSaveDialog(null, {
  //         defaultPath: questionsPath,
  //       }, (workflowPath) => {
  //         try {
  //           fs.writeFileSync(workflowPath, this.pageStructure.getWorkflowJSON(), 'utf-8');
  //         } catch (e) {
  //           console.log('Failed to save workflow file !', e);
  //         }
  //       });
  //     } catch (e) {
  //       console.log('Failed to save questions file !', e);
  //     }
  //   });
  // }

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

      const questionsData = (await readFile('C:\\Users\\alexa\\Desktop\\asdf.f')).toString();
      const workflowData = (await readFile('C:\\Users\\alexa\\Desktop\\g.g')).toString();

      const pages: Page[] = JSON.parse(questionsData);
      const flow = JSON.parse(workflowData);

      pages.forEach(p => {
        p.posX = 0;
        p.posY = 0;
        p.pixelPosX = 0;
        p.pixelPosY = 0;
        p.connections = [];
        this.addProps(p.questionId, pages, flow);
      });
      this.pageStructure.pages = pages;
      console.log(this.pageStructure.pages);


    } catch (e) {
      console.log(e);
    }
  }

  private addProps(questionId: string, pages: Page[], flow: any[]): void {
    const page = pages.find(p => p.questionId === questionId);
    const flowPage = flow.find(p => p.questionId === questionId);
    console.log(flowPage);
    if (flowPage.nextQuestion) {
      page.connections.push( { nextPage: pages.find(p => p.questionId === flowPage.nextPage) } );
    }
    if (flowPage.thanQuestion && flowPage.elseQuestion) {
      page.connections.push( { nextPage: pages.find(p => p.questionId === flowPage.thanQuestion) } );
      page.connections.push( { nextPage: pages.find(p => p.questionId === flowPage.elseQuestion) } );
    }
  }
}
