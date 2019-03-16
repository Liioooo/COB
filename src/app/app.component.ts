import {Component, HostListener} from '@angular/core';
import {PageViewGridService} from './services/page-view-grid/page-view-grid.service';
import {PageStructureService} from './services/PageStructure/page-structure.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'COB';

  constructor(public pageStructure: PageStructureService, public pageViewGrid: PageViewGridService) {}

    @HostListener('document:keyup', ['$event'])
    onKeyPressed(event: KeyboardEvent) {
        if (event.ctrlKey) {
            if (event.code === 'KeyC') {
                this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
            } else if (event.code === 'KeyX') {
                this.pageStructure.cut(this.pageStructure.selectedPages);
            } else if (event.code === 'KeyV') {
                this.pageStructure.pasteClipboard(0, 0);
            } else if (event.code === 'KeyA') {
                this.pageStructure.selectedPages = this.pageStructure.pages;
            }
        }
        if (event.code === 'Delete') {
            this.pageStructure.removeSelectedPages();
        }
    }

}
