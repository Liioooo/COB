import {AbstractControl} from '@angular/forms';
import {PageStructureService} from '../services/PageStructure/page-structure.service';



export class DuplicateIDValidator {
  static duplicateIDValidator(pageStructure: PageStructureService) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return pageStructure.pages.every(page => page.questionId !== control.value.toLowerCase()
        || page.questionId === pageStructure.selectedPages[0].questionId) ? null : {duplicateId: true};
    };
  }
}
