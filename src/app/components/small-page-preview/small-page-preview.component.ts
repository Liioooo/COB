import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ElementRef,
    Input, NgZone, OnDestroy, OnInit,
    ViewChild
} from '@angular/core';
import {Page} from '../../models/page-interface';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';

@Component({
  selector: 'app-small-page-preview',
  templateUrl: './small-page-preview.component.html',
  styleUrls: ['./small-page-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallPagePreviewComponent implements OnDestroy, OnInit {

  @ViewChild('pageDiv')
  pageDiv: ElementRef<HTMLDivElement>;

  @Input()
  page: Page;

  private startMousePosX: number;
  private startMousePosY: number;

  constructor(
      private pageStructure: PageStructureService,
      private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousedown', this.mouseDown);
      this.pageDiv.nativeElement.addEventListener('mouseup', this.mouseUp);
    });
  }



  ngOnDestroy(): void {
      window.removeEventListener('mousedown', this.mouseDown);
      this.pageDiv.nativeElement.removeEventListener('mouseup', this.mouseUp);
  }

  mouseDown = (event: MouseEvent) => {
    this.startMousePosX = event.clientX;
    this.startMousePosY = event.clientY;
  }

  mouseUp = (event: MouseEvent) => {
    if (event.button === 0) {
      if (this.distance(this.startMousePosX, this.startMousePosY, event.clientX, event.clientY) > 5) {
        return;
      }
      if (event.ctrlKey) {
        this.pageStructure.switchSelection(this.page);
      } else {
        if (this.pageStructure.selectedPages.length === 1 && this.page.isSelected) {
          this.pageStructure.switchSelection(this.page);
        } else {
          this.pageStructure.selectedPages = [this.page];
        }
      }
      //this.changeDetRef.detectChanges();
    }
  }

  private distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
