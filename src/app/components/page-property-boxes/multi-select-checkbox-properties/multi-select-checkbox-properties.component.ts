import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Page} from "../../../models/page-interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-multi-select-checkbox-properties',
  templateUrl: './multi-select-checkbox-properties.component.html',
  styleUrls: ['./multi-select-checkbox-properties.component.scss']
})
export class MultiSelectCheckboxPropertiesComponent implements OnChanges, OnDestroy {

  @Input()
  public page: Page;
  public multiSelectCheckboxForm: FormGroup;

  private subscription: Subscription;

  constructor(private formbuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.multiSelectCheckboxForm = this.formbuilder.group({
      shortName: [this.page.shortName || ''],
      title: [this.page.title || ''],
      helpQuestion: [this.page.helpQuestion || ''],
      helpTooltip: [this.page.helpTooltip || ''],
      mandatory: [this.page.mandatory || ''],
      handover: [this.page.handover || ''],
      handoverText: [this.page.handoverText || '']
    });

    this.subscription = this.multiSelectCheckboxForm.valueChanges.subscribe(values => {
      this.page.shortName = values.shortName;
      this.page.title = values.title;
      this.page.helpQuestion = values.helpQuestion;
      this.page.helpTooltip = values.helpTooltip;
      this.page.mandatory = values.mandatory !== '';
      this.page.handover = values.handover !== '';
      this.page.handoverText = values.handoverText;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
