import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Page} from "../../../models/page-interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-condition-chooser',
  templateUrl: './condition-chooser.component.html',
  styleUrls: ['./condition-chooser.component.scss']
})
export class ConditionChooserComponent implements OnChanges {

  @Input()
  public page: Page;

  public conditionForm: FormGroup;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.conditionForm = this.formBuilder.group({
      condition: [this.page.condition || ''],
      next: [this.page.nextQuestion || ''],
      than: [this.page.thanQuestion || ''],
      else: [this.page.elseQuestion || '']
    });

    this.subscription = this.conditionForm.valueChanges.subscribe(values => {
      this.page.nextQuestion = values.next;
      this.page.thanQuestion = values.than;
      this.page.elseQuestion = values.else;
      this.page.condition = values.condition;
    });
  }

}
