import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appMainViewZoom]'
})
export class AppMainViewZoomDirective implements OnInit, OnChanges {

  private mouseX: number;
  private mouseY: number;

  constructor(private el: ElementRef<HTMLDivElement>, private pageViewGrid: PageViewGridService) { }

  @Input()
  zoomLevel: number;

  ngOnInit(): void {
    this.el.nativeElement.style.zoom = this.zoomLevel + '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.style.zoom = this.zoomLevel + '';
    console.log(this.el.nativeElement.offsetWidth, this.mouseY);
    // this.el.nativeElement.scrollTo(this.el.nativeElement.offsetWidth / this.pageViewGrid.zoomLevel * 2, this.el.nativeElement.offsetHeight / this.pageViewGrid.zoomLevel * 2);
  }

  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.ctrlKey) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      if (event.deltaY < 0) {
        this.pageViewGrid.zoomLarger();
      } else {
        this.pageViewGrid.zoomSmaller();
      }
    }
  }

}
