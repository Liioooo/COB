import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-multi-select-checkbox-properties',
  templateUrl: './multi-select-checkbox-properties.component.html',
  styleUrls: ['./multi-select-checkbox-properties.component.scss']
})
export class MultiSelectCheckboxPropertiesComponent implements OnInit {

  @Input()
  public page: Page;
  public multiSelectCheckboxForm: FormGroup;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.multiSelectCheckboxForm = this.formbuilder.group({
      test: ["", []]
    });

    this.multiSelectCheckboxForm.valueChanges.subscribe(console.log);
  }



}
