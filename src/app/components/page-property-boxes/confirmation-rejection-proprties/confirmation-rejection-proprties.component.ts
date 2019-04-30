import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/page-interface";

@Component({
  selector: 'app-confirmation-rejection-proprties',
  templateUrl: './confirmation-rejection-proprties.component.html',
  styleUrls: ['./confirmation-rejection-proprties.component.scss']
})
export class ConfirmationRejectionProprtiesComponent implements OnInit {

  @Input()
  public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
