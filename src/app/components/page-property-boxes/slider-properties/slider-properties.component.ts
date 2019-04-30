import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-slider-properties',
  templateUrl: './slider-properties.component.html',
  styleUrls: ['./slider-properties.component.scss']
})
export class SliderPropertiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
