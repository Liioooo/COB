import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges
} from '@angular/core';
import {Page} from '../../models/page-interface';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';

@Directive({
  selector: '[appDragable]'
})
export class DragableDirective implements OnInit, OnChanges {

    private pos1; pos2; pos3; pos4;

    private lastDragPos;
    private mouseDown: boolean;

    private dragStartMouseX: number;
    private dragStartMouseY: number;
    private lastDragMouseX: number;
    private lastDragMouseY: number;

    private firstTimeExternalDrag = true;

    @Output()
    dragEnded = new EventEmitter<{x: number, y: number}>();

    @Input()
    appDragablePage: Page;

    constructor(
      private el: ElementRef<HTMLDivElement>,
      private pageViewGrid: PageViewGridService,
      private pageStructure: PageStructureService
    ) { }

    ngOnInit(): void {
      const pos = this.pageViewGrid.convertGridPosToPixelPos(this.appDragablePage.posX, this.appDragablePage.posY);
      this.el.nativeElement.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      this.lastDragPos = pos;
    }

    ngOnChanges(changes: SimpleChanges): void {
      const pos = this.pageViewGrid.convertGridPosToPixelPos(this.appDragablePage.posX, this.appDragablePage.posY);
      this.el.nativeElement.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      this.lastDragPos = pos;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.button === 0 && this.appDragablePage.isSelected) {
            this.pageStructure.setCurrentlySelectedDrag();
            const zoom = this.pageViewGrid.zoomLevel;
            this.mouseDown = true;
            this.pos3 = event.clientX / zoom;
            this.pos4 = event.clientY / zoom;
            this.dragStartMouseX = this.pos3;
            this.dragStartMouseY = this.pos4;
            this.lastDragMouseX = this.pos3;
            this.lastDragMouseY = this.pos4;
            this.el.nativeElement.style.zIndex = '2';
        }
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (this.appDragablePage.currentlyDragged) {
          const zoom = this.pageViewGrid.zoomLevel;
          if (!this.mouseDown && this.firstTimeExternalDrag) {
              this.firstTimeExternalDrag = false;
              this.pos3 = event.clientX / zoom;
              this.pos4 = event.clientY / zoom;
              this.el.nativeElement.style.zIndex = '2';
          }
          this.pos1 = this.pos3 - event.clientX / zoom;
          this.pos2 = this.pos4 - event.clientY / zoom;
          this.pos3 = event.clientX / zoom;
          this.pos4 = event.clientY / zoom;
          this.lastDragMouseY = this.pos4;
          this.lastDragMouseX = this.pos3;
          const pos: {y: number, x: number} = {x: 0, y: 0};
          if ((this.lastDragPos.y - this.pos2) >= 0) {
              pos.y = (this.lastDragPos.y - this.pos2);
          }
          if ((this.lastDragPos.x - this.pos1) >= 0) {
              pos.x = (this.lastDragPos.x - this.pos1);
          }
          this.el.nativeElement.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
          this.lastDragPos = pos;
    }
  }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
      this.el.nativeElement.style.zIndex = '1';
      this.pageStructure.pages.forEach(page => page.currentlyDragged = false);
      if (this.mouseDown) {
      // if (this.mouseDown && this.lastDragMouseX && this.lastDragMouseY && this.dragStartMouseX && this.dragStartMouseY) {
        this.dragEnded.emit({
            x: this.lastDragMouseX - this.dragStartMouseX,
            y: this.lastDragMouseY - this.dragStartMouseY
        });
      }
      if (this.appDragablePage.isSelected) {
        this.ngOnChanges(null);
      }
      this.mouseDown = false;
      this.firstTimeExternalDrag = true;
    }
}
