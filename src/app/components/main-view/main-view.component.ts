import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent implements OnInit {

  @ViewChild('container')
  private container: ElementRef<HTMLDivElement>;

  private currentPageWithConnectionDrag: Page;

  constructor(
    public pageStructure: PageStructureService,
    public pageViewGrid: PageViewGridService
  ) {
  }

  ngOnInit() {
  }

  dragEnded(event) {
    const pos = this.pageViewGrid.getNextGridPositionMulti(this.pageStructure.selectedPages, event.x, event.y, true);
    this.pageStructure.selectedPages.forEach(selPage => {
      selPage.posX += pos.x;
      selPage.posY += pos.y;
    });
  }

  public update(index: number, item: Page): any {
    return item.questionId + item.isSelected + item.posX + item.posY;
  }

  public connectionUpdate(index: number, item: any): any {
    return item.nextPage.posX + item.nextPage.posY;
  }

  public onMouseDownOnView(event: MouseEvent): void {
    if (event.target !== this.container.nativeElement) {
      return;
    }
    if (!event.altKey) {
      this.pageStructure.clearSelection();
    }
  }

  startConnectionDrag(page: Page) {
    this.currentPageWithConnectionDrag = page;
    page.draggingNewConnection = true;
  }

  connectionDragEnded(dragEndPos: {x: number, y: number}) {
    if (this.currentPageWithConnectionDrag) {
      this.currentPageWithConnectionDrag.draggingNewConnection = false;
      const pageToConnect = this.pageViewGrid.getPageAtPosition(dragEndPos);
      if (pageToConnect) {
        this.pageStructure.connectPages(this.currentPageWithConnectionDrag, pageToConnect);
      }
    }
  }

  public convertToConnectionDestination(fromPagePos: {x: number, y: number}, toPageGridPos: {x: number, y: number}): {x: number, y: number} {
    const toPixelPos = this.pageViewGrid.convertGridPosToPixelPos(toPageGridPos.x, toPageGridPos.y);
    toPixelPos.x = toPixelPos.x - fromPagePos.x + 1000 - 80;
    toPixelPos.y = toPixelPos.y - fromPagePos.y + 1000;
    return toPixelPos;
  }
}
