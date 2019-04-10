import {AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import {PageStructureService} from '../services/PageStructure/page-structure.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DuplicateIDValidator implements Validator {

  constructor(private pageStructure: PageStructureService) {}

  validate(control: AbstractControl): ValidationErrors | null {
      return this.pageStructure.pages.every(page => page.questionId !== control.value
        || page.questionId === this.pageStructure.selectedPages[0].questionId) ? null : {duplicateId: true};
  }
}
