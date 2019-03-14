import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appMainViewZoom]'
})
export class AppMainViewZoomDirective implements OnInit, OnChanges {

  private oldScrollX: number;
  private oldScrollY: number;

  constructor(private el: ElementRef<HTMLDivElement>, private pageViewGrid: PageViewGridService) { }

  @Input()
  zoomLevel: number;

  ngOnInit(): void {
    this.el.nativeElement.style.zoom = this.zoomLevel + '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.style.zoom = this.zoomLevel + '';
    this.el.nativeElement.scrollTo(this.oldScrollX, this.oldScrollY);
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

}
