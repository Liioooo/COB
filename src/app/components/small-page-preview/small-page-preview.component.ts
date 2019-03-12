import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-small-page-preview',
  templateUrl: './small-page-preview.component.html',
  styleUrls: ['./small-page-preview.component.scss']
})
export class SmallPagePreviewComponent implements OnInit {

    @Input()
    page: any; // TODO: use correct type

    @Output()
    selectedPage = new EventEmitter<any>(); // same as input

    private mouseDownStartTime: number;

    constructor() { }

    ngOnInit() {
    }

    onMouseDown() {
      this.mouseDownStartTime = performance.now();
   }

   onMouseUp() {
      if (performance.now() - this.mouseDownStartTime < 300) {
        this.selectedPage.emit(this.page);
      }
   }

}
