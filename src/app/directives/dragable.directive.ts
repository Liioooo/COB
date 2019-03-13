import {Directive, DoCheck, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Page} from '../models/page-interface';
import {PageViewGridService} from '../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appDragable]'
})
export class DragableDirective implements OnInit, DoCheck {

  private pos1; pos2; pos3; pos4;

  private lastXGridPos: number;
  private lastYGridPos: number;

  @Output()
  dragEnded = new EventEmitter<{posX: number, posY: number}>();

  @Input()
  appDragablePage: Page;

  constructor(private el: ElementRef<HTMLDivElement>, private pageViewGrid: PageViewGridService) { }

    ngOnInit(): void {
      this.lastXGridPos = this.appDragablePage.posX;
      this.lastYGridPos = this.appDragablePage.posY;
      const pos = this.pageViewGrid.convertGridPosToPixelPos(this.appDragablePage.posX, this.appDragablePage.posY);
      this.el.nativeElement.style.top = pos.y + 'px';
      this.el.nativeElement.style.left = pos.x + 'px';
    }

    ngDoCheck() {
        console.log('changes');
        if (this.lastXGridPos !== this.appDragablePage.posX || this.lastYGridPos !== this.appDragablePage.posY) {
            const pos = this.pageViewGrid.convertGridPosToPixelPos(this.appDragablePage.posX, this.appDragablePage.posY);
            this.el.nativeElement.style.top = pos.y + 'px';
            this.el.nativeElement.style.left = pos.x + 'px';
            this.lastXGridPos = this.appDragablePage.posX;
            this.lastYGridPos = this.appDragablePage.posY;
        }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.pos3 = event.clientX;
        this.pos4 = event.clientY;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (event.buttons === 1) {
          this.pos1 = this.pos3 - event.clientX;
          this.pos2 = this.pos4 - event.clientY;
          this.pos3 = event.clientX;
          this.pos4 = event.clientY;
          if ((this.el.nativeElement.offsetTop - this.pos2) >= 0) {
              this.el.nativeElement.style.top = (this.el.nativeElement.offsetTop - this.pos2) + 'px';
          }
          if ((this.el.nativeElement.offsetLeft - this.pos1) >= 0) {
            this.el.nativeElement.style.left = (this.el.nativeElement.offsetLeft - this.pos1) + 'px';
          }
      }
    }

    @HostListener('mouseup')
    onMouseUp() {
        this.dragEnded.emit({
            posX: parseInt(this.el.nativeElement.style.top, 10),
            posY:  parseInt(this.el.nativeElement.style.left, 10)
        });
    }

}
