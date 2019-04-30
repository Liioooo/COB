import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-summary-properties',
  templateUrl: './summary-properties.component.html',
  styleUrls: ['./summary-properties.component.scss']
})
export class SummaryPropertiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
