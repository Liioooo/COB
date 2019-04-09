import {
    ApplicationRef,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {filter} from 'rxjs/operators';
import {interval, Subscription} from 'rxjs';

@Directive({
  selector: '[appMainViewZoom]'
})
export class AppMainViewZoomDirective implements OnInit, OnChanges {

  private oldScrollX: number;
  private oldScrollY: number;

  private oldSizeX: number;
  private oldSizeY: number;

  private movingMouseDown: boolean;
  private movingKeyboardLeftRight: number;
  private movingKeyboardUpDown: number;

  private keyboardMoveInterval = interval(15);
  private keyboardMoveIntervalSubscription: Subscription;

  constructor(
    private el: ElementRef<HTMLDivElement>,
    private pageViewGrid: PageViewGridService,
    private pageStructure: PageStructureService,
    private ngZone: NgZone,
    private appRef: ApplicationRef
  ) {
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('mousemove', (e: MouseEvent) => this.onMouseMove(e));
      this.el.nativeElement.addEventListener('scroll', () => this.onScroll());
      this.el.nativeElement.addEventListener('mousewheel', (e: WheelEvent) => this.onMouseWheel(e));
      this.el.nativeElement.addEventListener('mousedown', (e: MouseEvent) => this.onMouseDown(e));
      window.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    });
  }

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
        left: toScrollPos.x - this.el.nativeElement.offsetWidth / 2 + 40,
        top: toScrollPos.y - this.el.nativeElement.offsetHeight / 2 + 30,
        behavior: 'smooth'
      });
      this.setViewPos();
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

  onMouseWheel(event: WheelEvent) {
    this.setViewPos();
    if (event.ctrlKey) {
      this.oldScrollX = this.el.nativeElement.scrollLeft;
      this.oldScrollY = this.el.nativeElement.scrollTop;
      if (event.deltaY < 0) {
        this.pageViewGrid.zoomLarger();
      } else {
        this.pageViewGrid.zoomSmaller();
      }
      this.appRef.tick();
    }
  }

  onMouseDown(event: MouseEvent) {
    const target: any = event.target;
    if (target.parentElement === this.el.nativeElement && event.button === 0 && event.altKey) {
      this.movingMouseDown = true;
      this.el.nativeElement.style.cursor = 'move';
    }
  }

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

  @HostListener('window:keyup')
  onKeyUp() {
    if (this.keyboardMoveIntervalSubscription) {
      this.keyboardMoveIntervalSubscription.unsubscribe();
    }
    delete this.keyboardMoveIntervalSubscription;
    this.movingKeyboardUpDown = 0;
    this.movingKeyboardLeftRight = 0;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
    if (event.altKey) {
      switch (event.key) {
        case 'ArrowLeft':
          this.movingKeyboardLeftRight = -1;
          break;
        case 'ArrowRight':
          this.movingKeyboardLeftRight = 1;
          break;
        case 'ArrowUp':
          this.movingKeyboardUpDown = -1;
          break;
        case 'ArrowDown':
          this.movingKeyboardUpDown = 1;
          break;
      }
      if (this.keyboardMoveIntervalSubscription) {
        return;
      }
      this.keyboardMoveIntervalSubscription = this.keyboardMoveInterval.subscribe(_ => {
        this.el.nativeElement.scrollLeft += this.movingKeyboardLeftRight * 4;
        this.el.nativeElement.scrollTop += this.movingKeyboardUpDown * 4;
        this.setViewPos();
      });
    }
  }

  onScroll() {
    this.setViewPos();
  }

  private setViewPos() {
    const nativeEl = this.el.nativeElement;
    const vp = {
      x: nativeEl.scrollLeft + nativeEl.offsetWidth / 2,
      y: nativeEl.scrollTop + nativeEl.offsetHeight / 2
    };
    this.pageViewGrid.setViewPosition(vp);
    this.pageViewGrid.setViewScrollPos({x: nativeEl.scrollLeft, y: nativeEl.scrollTop});
  }

}
