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

    constructor(private pageStructure: PageStructureService) { }

    ngOnInit() {
    }

    onClick(event: MouseEvent) {
        if (event.ctrlKey) {
          this.pageStructure.switchSelection(this.page);
        } else {
          if (this.pageStructure.selectedPages.length === 1 && this.page.isSelected) {
            this.pageStructure.switchSelection(this.page);
          } else {
            this.pageStructure.selectedPages = [this.page];
          }
        }
    }
}
