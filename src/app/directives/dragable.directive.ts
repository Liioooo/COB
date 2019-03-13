import {Directive, DoCheck, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Page} from '../models/page-interface';
import {PageViewGridService} from '../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appDragable]'
})
export class DragableDirective implements OnInit, DoCheck {

    private pos1; pos2; pos3; pos4;

    private lastXGridPos: number;
    private lastYGridPos: number;

    private lastDragPos;
    private mouseDown: boolean;

    @Output()
    dragEnded = new EventEmitter<{posX: number, posY: number}>();

    @Input()
    appDragablePage: Page;

    constructor(private el: ElementRef<HTMLDivElement>, private pageViewGrid: PageViewGridService) { }

    ngOnInit(): void {
      const pos = this.pageViewGrid.convertGridPosToPixelPos(this.appDragablePage.posX, this.appDragablePage.posY);
      this.el.nativeElement.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      this.lastDragPos = pos;
    }

    ngDoCheck() {
        if (!this.mouseDown && (this.lastXGridPos !== this.appDragablePage.posX || this.lastYGridPos !== this.appDragablePage.posY)) {
            const pos = this.pageViewGrid.convertGridPosToPixelPos(this.appDragablePage.posX, this.appDragablePage.posY);
            this.el.nativeElement.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
            this.lastDragPos = pos;
            this.lastXGridPos = this.appDragablePage.posX;
            this.lastYGridPos = this.appDragablePage.posY;
        }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            this.mouseDown = true;
            this.pos3 = event.clientX;
            this.pos4 = event.clientY;
            this.el.nativeElement.style.zIndex = '2';
        }
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (this.mouseDown) {
          this.pos1 = this.pos3 - event.clientX;
          this.pos2 = this.pos4 - event.clientY;
          this.pos3 = event.clientX;
          this.pos4 = event.clientY;
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

    @HostListener('window:mouseup')
    onMouseUp() {
        if (this.mouseDown) {
            this.el.nativeElement.style.zIndex = '1';
            this.dragEnded.emit({
                posX: this.lastDragPos.x,
                posY: this.lastDragPos.y
            });
        }
        this.mouseDown = false;
    }

}
