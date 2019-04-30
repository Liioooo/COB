import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Page} from '../../models/page-interface';
import {PageStructureService} from "../../services/PageStructure/page-structure.service";
import {MatCheckboxChange} from "@angular/material";
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent {

  @Input()
  selectedPage: Page;

  startPage;

  constructor(
    public pageStructureService: PageStructureService
    ) {}

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

  onCheckboxChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.pageStructureService.startPage = this.selectedPage;
    } else {
      this.pageStructureService.startPage = this.pageStructureService.pages[0];
    }
  }

  isCurrentStartPage(): boolean {
    return this.pageStructureService.startPage.questionId === this.selectedPage.questionId;
  }
}
