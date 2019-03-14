import { Component, OnInit } from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    constructor(
        private pageStructure: PageStructureService,
        public pageViewGrid: PageViewGridService
    ) {
    }

    ngOnInit() {
    }

    addPage() {
        const pos = this.pageViewGrid.getPosForNewPage();
        this.pageStructure.addEmptyPage(pos.x, pos.y);
    }
}
