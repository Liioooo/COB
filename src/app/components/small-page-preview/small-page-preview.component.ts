import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
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
export class SmallPagePreviewComponent implements OnInit {

    @Input()
    page: Page;

    @Output()
    selectedPage = new EventEmitter<Page>();

    @Output()
    mouseEnter = new EventEmitter<Page>();

    @Output()
    mouseLeave = new EventEmitter<Page>();

    private mouseDownStartTime: number;

    constructor(private ps: PageStructureService) { }

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
