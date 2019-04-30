import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-family-situation-properties',
  templateUrl: './family-situation-properties.component.html',
  styleUrls: ['./family-situation-properties.component.scss']
})
export class FamilySituationPropertiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
