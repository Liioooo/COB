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

    private dragStartX: number;
    private dragStartY: number;

    private startedDraggingExternal = false;

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
            this.startedDraggingExternal = false;
            this.pageStructure.setCurrentlySelectedDrag();
            const zoom = this.pageViewGrid.zoomLevel;
            this.mouseDown = true;
            this.pos3 = event.clientX / zoom;
            this.pos4 = event.clientY / zoom;
            this.dragStartX = this.pos3;
            this.dragStartY = this.pos4;
            this.el.nativeElement.style.zIndex = '2';
        }
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (this.appDragablePage.currentlyDragged) {
          const zoom = this.pageViewGrid.zoomLevel;
          if (!this.mouseDown && !this.startedDraggingExternal) {
              this.startedDraggingExternal = true;
              this.pos3 = event.clientX / zoom;
              this.pos4 = event.clientY / zoom;
              this.dragStartX = this.pos3;
              this.dragStartY = this.pos4;
              this.el.nativeElement.style.zIndex = '2';
          }
          this.pos1 = this.pos3 - event.clientX / zoom;
          this.pos2 = this.pos4 - event.clientY / zoom;
          this.pos3 = event.clientX / zoom;
          this.pos4 = event.clientY / zoom;
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
        if (this.mouseDown) {
            this.pageStructure.selectedPages.forEach(page => page.currentlyDragged = false);
            this.el.nativeElement.style.zIndex = '1';
            const zoom = this.pageViewGrid.zoomLevel;
            if (this.distance(this.dragStartX, this.dragStartY, event.clientX / zoom, event.clientY / zoom) > 5) {
                if (!this.startedDraggingExternal) {
                    // this.dragEnded.emit({
                    //     posX: this.lastDragPos.x,
                    //     posY: this.lastDragPos.y
                    // });
                    this.dragEnded.emit({
                        x: this.lastDragPos.x - this.dragStartX,
                        y: this.lastDragPos.y - this.dragStartY
                    });
                }
            } else {
                this.pageStructure.updatePageById(this.appDragablePage.questionId, {
                    posX: this.appDragablePage.posX,
                    posY: this.appDragablePage.posY
                });
                this.ngOnChanges(null);
            }
        }
        this.mouseDown = false;
        this.startedDraggingExternal = false;
    }

    private distance(x1: number, y1: number, x2: number,  y2: number): number {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}
