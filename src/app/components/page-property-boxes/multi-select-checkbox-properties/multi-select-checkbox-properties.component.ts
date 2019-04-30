import {Component, Input} from '@angular/core';
import {Page} from '../../../models/page-interface';

@Component({
  selector: 'app-multi-select-checkbox-properties',
  templateUrl: './multi-select-checkbox-properties.component.html',
  styleUrls: ['./multi-select-checkbox-properties.component.scss']
})
export class MultiSelectCheckboxPropertiesComponent {

  @Input()
  public page: Page;

  constructor() {}

}
