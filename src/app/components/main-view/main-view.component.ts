import {Component, HostListener, OnInit} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    private mouseDown: boolean;

    constructor(
        public pageStructure: PageStructureService,
        public pageViewGrid: PageViewGridService
    ) { }

    ngOnInit() {
    }

    dragEnded(event, page: Page) {
      const pos = this.pageViewGrid.getNextGridPosition(event.posX, event.posY, page);
      this.pageStructure.updatePageById(page.questionId, {posX: pos.x, posY: pos.y});
    }

    pageSelected(page: Page) {
    }

    // @HostListener('mousedown', ['$event'])
    // onMouseDown(event: MouseEvent) {
    //   if (event.button === 0) {
    //     this.mouseDown = true;
    //   }
    // }
    //
    // @HostListener('window:mouseup', ['$event'])
    // onMouseUp(event: MouseEvent) {
    //   if (this.mouseDown) {
    //     this.pageStructure.clearSelection();
    //   }
    //   this.mouseDown = false;
    // }
}
