import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-monthly-investment-properties',
  templateUrl: './monthly-investment-properties.component.html',
  styleUrls: ['./monthly-investment-properties.component.scss']
})
export class MonthlyInvestmentPropertiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
