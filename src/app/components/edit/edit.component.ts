import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {DuplicateIDValidator} from '../../validators/DuplicateIDValidator';
import {Page} from '../../models/page-interface';
import { ErrorStateMatcher } from '@angular/material/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnChanges {

  @Input()
  currentPage: Page;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter();

  elemStyles;
  state: boolean = false;
  actionButtonState: boolean = false;
  public errorStateMatcher: ErrorStateMatcher;

  public newIdForm: FormGroup;

  constructor(
    private duplicateIdValidator: DuplicateIDValidator,
    private pageStructure: PageStructureService
  ) {
      this.errorStateMatcher = new IdErrorStateMatcher();
  }

  ngOnInit() {
    this.newIdForm = new FormGroup({
      email: new FormControl(this.currentPage.questionId, [Validators.required, this.duplicateIdValidator as unknown as ValidatorFn])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.state = false;
    if (this.newIdForm) {
      this.newIdForm.controls.email.setValue(this.currentPage.questionId);
    }
  }

  @HostListener('click')
  onClick() {
    if (!this.state && !this.actionButtonState) {
      this.state = true;
    } else if (this.actionButtonState) {
      this.actionButtonState = false;
    }
  }

  saveChanges(type: boolean = false, content?: string) {
    if (type) {
      this.actionButtonState = true;
    }

    this.valueChange.emit(content ? content : this.newIdForm.controls.email.value);
    this.state = false;
  }

}

class IdErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
