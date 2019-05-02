import { Injectable } from '@angular/core';
import * as fs from "fs";
import {PageStructureService} from '../PageStructure/page-structure.service';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class FileIOService {

  constructor(private pageStructure: PageStructureService, private electronService: ElectronService) { }

  public exportJSONs() {
    console.log('isValid: ', this.pageStructure.getErrorMessage());

    this.electronService.remote.dialog.showSaveDialog(null, (questionsPath) => {
      try {
        fs.writeFileSync(questionsPath, this.pageStructure.getQuestionsJSON(), 'utf-8');

        this.electronService.remote.dialog.showSaveDialog(null, {
          defaultPath: questionsPath,
        }, (workflowPath) => {
          try {
            fs.writeFileSync(workflowPath, this.pageStructure.getWorkflowJSON(), 'utf-8');
          } catch (e) {
            console.log('Failed to save workflow file !', e);
          }
        });
      } catch (e) {
        console.log('Failed to save questions file !', e);
      }
    });
  }
}
