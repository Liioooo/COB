import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-draggable-arrow',
  templateUrl: './draggable-arrow.component.html',
  styleUrls: ['./draggable-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableArrowComponent implements OnInit, OnChanges {

  @ViewChild('svgElement')
  private svgElement: ElementRef<SVGElement>;

  @Input()
  toPosition: {x: number, y: number};

  @Input()
  currentlyDragged: boolean;

  @Output()
  connectionDragEnded = new EventEmitter<{x: number, y: number}>();

  public connTargetX: number = 1000;
  public connTargetY: number = 1000;

  constructor(private pageViewGrid: PageViewGridService) { }

  ngOnInit() {
    if (this.toPosition) {
      this.connTargetX = this.toPosition.x;
      this.connTargetY = this.toPosition.y;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.toPosition) {
      this.connTargetX = this.toPosition.x;
      this.connTargetY = this.toPosition.y;
    }
  }



  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.currentlyDragged) {
      const svgPos = this.svgElement.nativeElement.getBoundingClientRect();
      const svgPosX = svgPos.left;
      const svgPosY = svgPos.top + svgPos.height;
      this.connTargetX = (event.clientX / this.pageViewGrid.zoomLevel) - svgPosX;
      this.connTargetY = event.clientY / this.pageViewGrid.zoomLevel - svgPosY + 2000;
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
