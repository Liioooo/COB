import {
  Component, ElementRef,
  Input, NgZone, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {Page} from '../../models/page-interface';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {fromEvent} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-small-page-preview',
  templateUrl: './small-page-preview.component.html',
  styleUrls: ['./small-page-preview.component.scss']
})
export class SmallPagePreviewComponent implements OnDestroy, OnInit {

  @ViewChild('pageDiv', { static: true })
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
      fromEvent<MouseEvent>(window, 'mousedown').pipe(
          untilDestroyed(this)
      ).subscribe(e => this.mouseDown(e));
      fromEvent<MouseEvent>(this.pageDiv.nativeElement, 'mouseup').pipe(
          untilDestroyed(this)
      ).subscribe(e => this.mouseUp(e));
    });
  }



  ngOnDestroy(): void {
      // just there for untilDestroyed to work
  }

  mouseDown(event: MouseEvent) {
    this.startMousePosX = event.clientX;
    this.startMousePosY = event.clientY;
  }

  mouseUp(event: MouseEvent) {
    if (event.button === 0) {
      if (this.distance(this.startMousePosX, this.startMousePosY, event.clientX, event.clientY) > 5) {
        return;
      }
      this.ngZone.run(() => {
        if (event.ctrlKey) {
          this.pageStructure.switchSelection(this.page);
        } else {
          if (this.pageStructure.selectedPages.length === 1 && this.page.isSelected) {
            this.pageStructure.switchSelection(this.page);
          } else {
            this.pageStructure.selectedPages = [this.page];
          }
        }
      });
    }
  }

  private distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
