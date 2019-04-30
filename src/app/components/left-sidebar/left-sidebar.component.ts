import {Component, OnInit} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  constructor(
    public pageStructure: PageStructureService,
    public pageViewGrid: PageViewGridService,
    public searchService: SearchService
  ) {
  }

  ngOnInit() {
  }

  public addPage(): void {
    const pos = this.pageViewGrid.getPosForNewPage();
    this.pageStructure.addEmptyPage(pos.x, pos.y);
  }

  public pasteClipboard() {
    const pos0 = this.pageViewGrid.getNextGridPositionMultiPix(this.pageStructure.clipboard, 0, 0, false);
    this.pageStructure.pasteClipboard(pos0.x, pos0.y);
  }
}
