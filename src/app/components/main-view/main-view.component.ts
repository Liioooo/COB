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
      const pos = this.pageViewGrid.getNextGridPosition(event.posX, event.posY, page);
      this.pageStructure.updatePageById(page.questionId, {posX: pos.x, posY: pos.y});
    }

    public update(index: number, item: Page): any {
      return item.questionId + item.isSelected;
    }

    public onMouseDown(event: MouseEvent): void {
      if (event.target === this.container.nativeElement && !event.altKey) {
        this.pageStructure.clearSelection();
      }
    }

    @HostListener('document:keyup', ['$event'])
    onKeyPressed(event: KeyboardEvent) {
        if (event.ctrlKey) {
            if (event.code === 'KeyC') {

            } else if (event.code === 'KeyV') {

            } else if (event.code === 'KeyA') {
                // select all
            }
        }
        if (event.code === 'Delete') {
            this.pageStructure.removeSelectedPages();
        }
    }
}
