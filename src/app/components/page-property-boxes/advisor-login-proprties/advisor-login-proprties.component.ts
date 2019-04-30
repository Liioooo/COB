import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-advisor-login-proprties',
  templateUrl: './advisor-login-proprties.component.html',
  styleUrls: ['./advisor-login-proprties.component.scss']
})
export class AdvisorLoginProprtiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
