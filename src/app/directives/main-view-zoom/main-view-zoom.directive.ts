import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {filter} from 'rxjs/operators';

@Directive({
  selector: '[appMainViewZoom]'
})
export class AppMainViewZoomDirective implements OnInit, OnChanges {

    private oldScrollX: number;
    private oldScrollY: number;

    private oldSizeX: number;
    private oldSizeY: number;

    private movingMouseDown: boolean;

    constructor(
        private el: ElementRef<HTMLDivElement>,
        private pageViewGrid: PageViewGridService,
        private pageStructure: PageStructureService
    ) { }

    @Input()
    zoomLevel: number;

    ngOnInit(): void {
      this.el.nativeElement.style.zoom = this.zoomLevel + '';
      this.setViewPos();
      this.pageStructure.shouldScrollToPage.pipe(
        filter(toScrollTo => {
            const toScrollPos = this.pageViewGrid.convertGridPosToPixelPos(toScrollTo.posX, toScrollTo.posY);
            return toScrollPos.y < this.el.nativeElement.scrollTop + 60 ||
                   toScrollPos.y > this.el.nativeElement.scrollTop + this.el.nativeElement.offsetHeight - 60 ||
                   toScrollPos.x < this.el.nativeElement.scrollLeft + 60 ||
                   toScrollPos.x > this.el.nativeElement.scrollLeft + this.el.nativeElement.offsetWidth - 60;
        })
      ).subscribe(toScrollTo => {
          const toScrollPos = this.pageViewGrid.convertGridPosToPixelPos(toScrollTo.posX, toScrollTo.posY);
          this.el.nativeElement.scrollTo({
              left: toScrollPos.x - this.el.nativeElement.offsetWidth / 2,
              top: toScrollPos.y  - this.el.nativeElement.offsetHeight / 2,
              behavior: 'smooth'
          });
      });
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.el.nativeElement.style.zoom = this.zoomLevel + '';
      this.el.nativeElement.scrollTo(this.oldScrollX, this.oldScrollY);
      this.el.nativeElement.scrollTo(
          this.el.nativeElement.scrollLeft + (this.oldSizeX - this.el.nativeElement.offsetWidth) / 2,
          this.el.nativeElement.scrollTop + (this.oldSizeY - this.el.nativeElement.offsetHeight) / 2
      );
      this.oldSizeX = this.el.nativeElement.offsetWidth;
      this.oldSizeY = this.el.nativeElement.offsetHeight;
    }

    @HostListener('mousewheel', ['$event'])
    onZoom(event: WheelEvent) {
      this.setViewPos();
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
