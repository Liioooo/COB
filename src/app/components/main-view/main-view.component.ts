import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  @ViewChild('container')
  private container: ElementRef<HTMLDivElement>;

  private currentPageWithConnectionDrag: Page;

  constructor(
    public pageStructure: PageStructureService,
    public pageViewGrid: PageViewGridService,
    private changeDetRef: ChangeDetectorRef
  ) {
  }

  dragEnded(event) {
    const pos = this.pageViewGrid.getNextGridPositionMultiPix(this.pageStructure.selectedPages, event.x, event.y, true);
    this.pageStructure.selectedPages.forEach(selPage => {
      selPage.posX += pos.x;
      selPage.posY += pos.y;
    });
    this.changeDetRef.detectChanges();
    this.changeDetRef.detectChanges();
  }

  public update(index: number, item: Page): any {
    return item.questionId + item.isSelected + item.posX + item.posY;
  }

  public connectionUpdate0(index: number, item: Page): any {
      return item.questionId + item.isSelected + item.pixelPosX + item.pixelPosY;
  }

  public connectionUpdate1(index: number, item: any): any {
    return item.nextPage.pixelPosX + item.nextPage.pixelPosY;
  }

  public onMouseDownOnView(event: MouseEvent): void {
    if (event.target !== this.container.nativeElement) {
      return;
    }
    if (!event.altKey && this.pageStructure.selectedPages.length !== 0) {
      this.pageStructure.clearSelection();
    }
  }

  startConnectionDrag(page: Page) {
    this.currentPageWithConnectionDrag = page;
    page.draggingNewConnection = true;
  }

  connectionDragEndedNewConnection(dragEndPos: {x: number, y: number}) {
    if (this.currentPageWithConnectionDrag) {
      this.currentPageWithConnectionDrag.draggingNewConnection = false;
      const pageToConnect = this.pageViewGrid.getPageAtPosition(dragEndPos);
      if (pageToConnect) {
        this.pageStructure.connectPages(this.currentPageWithConnectionDrag, pageToConnect);
      }
      this.changeDetRef.detectChanges();
    }
  }

  connectionDragEndedOldConnection(dragEndPos: {x: number, y: number}, page: Page, oldToPage: Page) {
      const pageToConnect = this.pageViewGrid.getPageAtPosition(dragEndPos);
      this.pageStructure.deleteConnection(page, oldToPage);
      if (pageToConnect) {
          this.pageStructure.connectPages(page, pageToConnect);
      }
      this.changeDetRef.detectChanges();
  }
}
