import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appMainViewZoom]'
})
export class AppMainViewZoomDirective implements OnInit, OnChanges {

    private oldScrollX: number;
    private oldScrollY: number;

    private oldSizeX: number;
    private oldSizeY: number;

    private movingMouseDown: boolean;

    constructor(private el: ElementRef<HTMLDivElement>, private pageViewGrid: PageViewGridService) { }

    @Input()
    zoomLevel: number;

    ngOnInit(): void {
      this.el.nativeElement.style.zoom = this.zoomLevel + '';
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.el.nativeElement.style.zoom = this.zoomLevel + '';
      this.el.nativeElement.scrollTo(this.oldScrollX, this.oldScrollY);
      this.el.nativeElement.scrollTo(
          this.el.nativeElement.scrollLeft + (this.oldSizeX - this.el.nativeElement.offsetWidth) / 2,
          this.el.nativeElement.scrollTop + (this.oldSizeY - this.el.nativeElement.offsetHeight) / 2
      );
      this.setViewPos();
      this.oldSizeX = this.el.nativeElement.offsetWidth;
      this.oldSizeY = this.el.nativeElement.offsetHeight;
    }

    @HostListener('mousewheel', ['$event'])
    onZoom(event: WheelEvent) {
      if (event.ctrlKey) {
        this.oldScrollX = this.el.nativeElement.scrollLeft;
        this.oldScrollY = this.el.nativeElement.scrollTop;
        if (event.deltaY < 0) {
          this.pageViewGrid.zoomLarger();
        } else {
          this.pageViewGrid.zoomSmaller();
        }
      }
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
      const target: any = event.target;
      if (target.parentElement === this.el.nativeElement && event.button === 0 && event.altKey) {
        this.movingMouseDown = true;
        this.el.nativeElement.style.cursor = 'move';
      }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (this.movingMouseDown && event.altKey) {
          this.el.nativeElement.scrollLeft -= event.movementX / this.zoomLevel;
          this.el.nativeElement.scrollTop -= event.movementY / this.zoomLevel;
          this.setViewPos();
      } else {
        this.movingMouseDown = false;
        this.el.nativeElement.style.cursor = 'default';

      }
    }

    @HostListener('mouseup')
    onMouseUp() {
      this.movingMouseDown = false;
      this.el.nativeElement.style.cursor = 'default';
    }

    private setViewPos() {
      const nativeEl = this.el.nativeElement;
      const vp = {
        x: nativeEl.scrollLeft + nativeEl.offsetWidth / 2,
        y: nativeEl.scrollTop + nativeEl.offsetHeight / 2
      };
      this.pageViewGrid.setViewPosition(vp);
    }

}
