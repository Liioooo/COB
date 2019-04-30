import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Page} from '../../models/page-interface';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent implements OnInit {

  @Input()
  selectedPage: Page;

  constructor() {
  }

  ngOnInit() {
  }

  resetPage() {
    this.selectedPage.templateType = 'none';
    delete this.selectedPage.handover;
    delete this.selectedPage.handoverText;
    delete this.selectedPage.title;
    delete this.selectedPage.mandatory;
    delete this.selectedPage.helpTooltip;
    delete this.selectedPage.helpQuestion;
    delete this.selectedPage.shortName;
    delete this.selectedPage.selectionControls;
    delete this.selectedPage.sliderControl;
  }
}
