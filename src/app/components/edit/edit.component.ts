import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {FormControl, Validators} from '@angular/forms';
import {DuplicateIDValidator} from '../../validators/DuplicateIDValidator';
import {Page} from '../../models/page-interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input()
  currentPage: Page;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter();

  elemStyles;
  state: boolean = false;
  actionButtonState: boolean = false;
  email;

  constructor(
    public pageStructure: PageStructureService) {
  }

  ngOnInit() {
  }

  @HostListener('click')
  onClick() {
    if (!this.state && !this.actionButtonState) {
      this.state = true;
      this.email = new FormControl(this.currentPage.questionId, [Validators.required, DuplicateIDValidator.duplicateIDValidator(this.pageStructure)]);
    } else if (this.actionButtonState) {
      this.actionButtonState = false;
    }
  }

  saveChanges(type?: boolean = false, content?: string) {
    if (type) {
      this.actionButtonState = true;
    }

    this.valueChange.emit(content ? content : this.email.value);
    this.state = false;
  }


  errorTest() {
    //this.error = !this.pageStructure.pages.every(page => page.questionId !== this.tempVal);
  }

  getStyles() {
    return;
  }

}
