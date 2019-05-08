import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input, NgZone,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';
import {Page} from '../../models/page-interface';
import {fromEvent} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-draggable-arrow',
  templateUrl: './draggable-arrow.component.html',
  styleUrls: ['./draggable-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableArrowComponent implements OnChanges, OnDestroy, OnInit {

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

  private mouseDown: boolean = false;

  public connTargetX: number = 1000;
  public connTargetY: number = 1000;

  constructor(
      private pageViewGrid: PageViewGridService,
      private ngZone: NgZone,
      private changeDetRef: ChangeDetectorRef
  ) {
    this.ngZone.runOutsideAngular(() => {
        fromEvent<MouseEvent>(window, 'mousemove').pipe(
            untilDestroyed(this)
        ).subscribe(e => this.onMouseMove(e));
        fromEvent<MouseEvent>(window, 'mouseup').pipe(
            untilDestroyed(this)
        ).subscribe(e => this.onMouseUp(e));
    });
  }
  ngOnInit(): void {
      this.mouseDown = this.currentlyDragged;
  }

  ngOnDestroy(): void {
      // just there for untilDestroyed to work
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

  onMouseDown() {
    this.mouseDown = true;
  }

  onMouseMove(event: MouseEvent) {
    if (this.mouseDown) {
      this.currentlyDragged = true;
      const svgPos = this.svgElement.nativeElement.getBoundingClientRect();
      const svgPosX = svgPos.left;
      const svgPosY = svgPos.top + svgPos.height;
      this.connTargetX = (event.clientX / this.pageViewGrid.zoomLevel) - svgPosX;
      this.connTargetY = event.clientY / this.pageViewGrid.zoomLevel - svgPosY + 2000;
      this.changeDetRef.detectChanges();
    }
  }

  onMouseUp(event: MouseEvent) {
      if (this.currentlyDragged) {
          this.currentlyDragged = false;
          if (this.toPage) {
              this.calculateToPosition();
              this.changeDetRef.detectChanges();
          }
          this.connectionDragEnded.emit({
              x: (event.clientX - 50) / this.pageViewGrid.zoomLevel + this.pageViewGrid.currentScrollViewPos.x,
              y: (event.clientY) / this.pageViewGrid.zoomLevel + this.pageViewGrid.currentScrollViewPos.y
          });
      }
      this.mouseDown = false;
  }

  public get getPath(): string {
      return `M 1000,1000 L ${this.connTargetX},${this.connTargetY}`;
  }

}
