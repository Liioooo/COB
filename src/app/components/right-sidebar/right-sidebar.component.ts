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
export class RightSidebarComponent implements OnInit, OnChanges {

  @Input()
  selectedPage: Page;

  startPage;

  constructor(
    public pageStructureService: PageStructureService
    ) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onCheckboxChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.pageStructureService.startPage = this.selectedPage;
    } else {
      this.pageStructureService.startPage = this.pageStructureService.pages[0];
    }
  }

  isCurrentStartPage(): boolean {
    console.log(this.pageStructureService.startPage.questionId === this.selectedPage.questionId)
    return this.pageStructureService.startPage.questionId === this.selectedPage.questionId;
  }
}
