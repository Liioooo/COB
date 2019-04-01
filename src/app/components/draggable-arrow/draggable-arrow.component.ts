import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input, NgZone,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';
import {Page} from '../../models/page-interface';

@Component({
  selector: 'app-draggable-arrow',
  templateUrl: './draggable-arrow.component.html',
  styleUrls: ['./draggable-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableArrowComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('svgElement')
  private svgElement: ElementRef<SVGElement>;

  @Input()
  toPage: Page;

  @Input()
  fromPage: Page;

  @Input()
  currentlyDragged: boolean;

  @Output()
  connectionDragEnded = new EventEmitter<{x: number, y: number}>();

  public connTargetX: number = 1000;
  public connTargetY: number = 1000;

  constructor(
      private pageViewGrid: PageViewGridService,
      private ngZone: NgZone,
      private changeDetRef: ChangeDetectorRef
  ) {
    this.ngZone.runOutsideAngular(() => {
        window.addEventListener('mousemove', this.onMouseMove);
    });
  }

  ngOnInit() {
    if (this.toPage && this.fromPage) {
      this.calculateToPosition();
    }
  }

  ngOnDestroy(): void {
      window.removeEventListener('mousemove', this.onMouseMove);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.toPage && this.fromPage) {
      this.calculateToPosition();
    }
  }

  private calculateToPosition() {
      this.connTargetX = this.toPage.pixelPosX - this.fromPage.pixelPosX + 1000 - 80;
      this.connTargetY = this.toPage.pixelPosY - this.fromPage.pixelPosY + 1000;
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.currentlyDragged) {
      const svgPos = this.svgElement.nativeElement.getBoundingClientRect();
      const svgPosX = svgPos.left;
      const svgPosY = svgPos.top + svgPos.height;
      this.connTargetX = (event.clientX / this.pageViewGrid.zoomLevel) - svgPosX;
      this.connTargetY = event.clientY / this.pageViewGrid.zoomLevel - svgPosY + 2000;
      this.changeDetRef.detectChanges();
    }
  }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        if (this.currentlyDragged) {
            this.connectionDragEnded.emit({
                x: (event.clientX - 50) / this.pageViewGrid.zoomLevel + this.pageViewGrid.currentScrollViewPos.x,
                y: (event.clientY) / this.pageViewGrid.zoomLevel + this.pageViewGrid.currentScrollViewPos.y
            });
        }
    }

}
