import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appMainViewZoom]'
})
export class AppMainViewZoomDirective implements OnInit, OnChanges {

  constructor(private el: ElementRef<HTMLDivElement>, private pageViewGrid: PageViewGridService) { }

  @Input()
  zoomLevel: number;

  ngOnInit(): void {
    this.el.nativeElement.style.zoom = this.zoomLevel + '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.style.zoom = this.zoomLevel + '';
  }

  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.ctrlKey) {
      if (event.deltaY < 0) {
        this.pageViewGrid.zoomLarger();
      } else {
        this.pageViewGrid.zoomSmaller();
      }
      //this.el.nativeElement.scrollTo((this.el.nativeElement.scrollTop + event.clientY) / this.zoomLevel, (this.el.nativeElement.scrollLeft + event.clientX - 50) / this.zoomLevel);
    }
  }

}
