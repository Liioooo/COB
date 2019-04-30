import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-splash-screen-properties',
  templateUrl: './splash-screen-properties.component.html',
  styleUrls: ['./splash-screen-properties.component.scss']
})
export class SplashScreenPropertiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
