import {Component, OnInit} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    constructor(public pageStructure: PageStructureService, public pageViewGrid: PageViewGridService) { }

    ngOnInit() {
    }

    dragEnded(event, page: Page) {
      const pos = this.pageViewGrid.convertPixelPosToGridPos(event.posX, event.posY);
      this.pageStructure.updatePageById(page.questionId, {posX: pos.x, posY: pos.y});
    }

}
