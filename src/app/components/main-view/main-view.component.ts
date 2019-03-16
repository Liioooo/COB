import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    @ViewChild('container')
    private container: ElementRef<HTMLDivElement>;

    constructor(
        public pageStructure: PageStructureService,
        public pageViewGrid: PageViewGridService
    ) { }

    ngOnInit() {
    }

    dragEnded(event, page: Page) {
      // use correct function
      const pos = this.pageViewGrid.getNextGridPosition(event.posX, event.posY, page);
      page.posX = pos.x;
      page.posY = pos.y;
    }

    public update(index: number, item: Page): any {
      return item.questionId + item.isSelected + item.posX + item.posY;
    }

    public onMouseDown(event: MouseEvent): void {
      if (event.target === this.container.nativeElement && !event.altKey) {
        this.pageStructure.clearSelection();
      }
    }
}
