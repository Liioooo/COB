import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Directive({
  selector: '[appSelectRect]'
})
export class SelectRectDirective implements OnInit {

    private mouseDown: boolean;
    private selectRect: HTMLDivElement;

    private rectPosX: number;
    private rectPosY: number;
    private rectWidth: number;
    private rectHeight: number;

    @Input()
    selectRectClass: string;

    constructor(
        private el: ElementRef<HTMLDivElement>,
        private renderer: Renderer2,
        private pageViewGrid: PageViewGridService
    ) { }

    ngOnInit(): void {
      this.selectRect = this.renderer.createElement('div');
      this.selectRect.style.display = 'none';
      this.selectRect.style.position = 'absolute';
      this.selectRect.classList.add(this.selectRectClass);
      this.renderer.appendChild(this.el.nativeElement, this.selectRect);
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.target === this.el.nativeElement.firstChild && !event.altKey) {
            this.mouseDown = true;
            this.selectRect.style.display = 'block';
            const zoom = this.pageViewGrid.zoomLevel;
            this.rectPosX = event.clientX / zoom;
            this.rectPosY = event.clientY / zoom;
            this.selectRect.style.top = this.rectPosY + 'px';
            this.selectRect.style.left = this.rectPosX + 'px';
            this.selectRect.style.width = '0px';
            this.selectRect.style.height = '0px';
        }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (this.mouseDown) {
          const zoom = this.pageViewGrid.zoomLevel;
          let toSet = event.clientX / zoom - this.rectPosX;
          this.rectWidth = toSet;
          if (toSet > 0) {
              this.selectRect.style.width = toSet + 'px';
          } else {
              this.rectPosX = event.clientX / zoom - toSet;
              this.selectRect.style.left = event.clientX / zoom + 'px';
              this.selectRect.style.width = -toSet + 'px';
          }
          toSet = event.clientY / zoom - this.rectPosY;
          this.rectHeight = toSet;
          if (toSet > 0) {
              this.selectRect.style.height = toSet + 'px';
          } else {
              this.rectPosY = event.clientY / zoom - toSet;
              this.selectRect.style.top = event.clientY / zoom + 'px';
              this.selectRect.style.height = -toSet + 'px';
          }
      }
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
      this.mouseDown = false;
      this.selectRect.style.display = 'none';
    }
}
