import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-draggable-arrow',
  templateUrl: './draggable-arrow.component.html',
  styleUrls: ['./draggable-arrow.component.scss']
})
export class DraggableArrowComponent implements OnInit {

  @ViewChild('svgElement')
  private svgElement: ElementRef<SVGElement>;

  @Input()
  toPosition: {x: number, y: number};

  @Input()
  currentlyDragged: boolean;

  public connTargetX: number = 1000;
  public connTargetY: number = 1000;

  constructor(private pageViewGrid: PageViewGridService) { }

  ngOnInit() {
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

}
