import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-single-select-checkbox-properties',
  templateUrl: './single-select-checkbox-properties.component.html',
  styleUrls: ['./single-select-checkbox-properties.component.scss']
})
export class SingleSelectCheckboxPropertiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
