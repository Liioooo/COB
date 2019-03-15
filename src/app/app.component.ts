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

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'c') {
      this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
    } else if (event.ctrlKey && event.key === 'v') {
      this.pageStructure.pasteClipboard(0, 0);
    }
  }
}
