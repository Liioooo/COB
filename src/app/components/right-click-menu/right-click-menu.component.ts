import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-right-click-menu',
  templateUrl: './right-click-menu.component.html',
  styleUrls: ['./right-click-menu.component.scss']
})
export class RightClickMenuComponent implements OnChanges {

  @Input()
  position: { x: number, y: number };

  @Input()
  scrollOffset: { x: number, y: number };

  @ViewChild('main')
  private container: ElementRef<HTMLDivElement>;

  @Output()
  ready: EventEmitter<any> = new EventEmitter();

  constructor(public pageStructure: PageStructureService, public pageViewGrid: PageViewGridService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.container.nativeElement.style.transform =
      `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
  }

  public newPage(): void {
    const pos = this.pageViewGrid.getNextGridPosition((this.position.x / this.pageViewGrid.zoomLevel + this.scrollOffset.x),
        (this.position.y / this.pageViewGrid.zoomLevel + this.scrollOffset.y - 50));
    this.pageStructure.addEmptyPage(pos.x, pos.y);
    this.ready.emit();
  }

  public paste(): void {
    // TODO paste at mouse pos
    const pos = this.pageViewGrid.getNextGridPositionMulti(this.pageStructure.clipboard, 0, 0, false);
    this.pageStructure.pasteClipboard(pos.x, pos.y);
    this.ready.emit();
  }

  public selectAll(): void {
    this.pageStructure.selectedPages = [...this.pageStructure.pages];
    this.ready.emit();
  }
}
