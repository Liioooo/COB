import {ApplicationRef, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {PageViewGridService} from './services/page-view-grid/page-view-grid.service';
import {PageStructureService} from './services/PageStructure/page-structure.service';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'COB';

    constructor(
        public pageStructure: PageStructureService,
        public pageViewGrid: PageViewGridService,
        private electronService: ElectronService,
        private changeRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.electronService.ipcRenderer.on('menuClick', (event, response) => this.handleMenuClick(event, response));
    }

    @HostListener('document:keydown', ['$event'])
    onKeyPressed(event: KeyboardEvent) {
        if (event.ctrlKey) {
            switch (event.code) {
                case 'KeyN':
                    const pos = this.pageViewGrid.getPosForNewPage();
                    this.pageStructure.addEmptyPage(pos.x, pos.y);
                    break;
                case 'KeyC':
                    this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
                    break;
                case 'KeyX':
                    this.pageStructure.cut(this.pageStructure.selectedPages);
                    break;
                case 'KeyV':
                    this.pageStructure.pasteClipboard(0, 0);
                    break;
                case 'KeyA':
                    this.pageStructure.selectedPages = [...this.pageStructure.pages];
                    break;
            }
        } else {
            if (event.code === 'Delete') {
                this.pageStructure.removeSelectedPages();
            }
        }
    }

    private handleMenuClick(event: any, response: any) {
        // console.log(response);
        switch (response) {
            case 'newPage':
                const pos = this.pageViewGrid.getPosForNewPage();
                this.pageStructure.addEmptyPage(pos.x, pos.y);
                break;
            case 'deletePage':
                this.pageStructure.removeSelectedPages();
                break;
            case 'copyPage':
                this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
                break;
            case 'cutPage':
                this.pageStructure.cut(this.pageStructure.selectedPages);
                break;
            case 'pastePage':
                this.pageStructure.pasteClipboard(0, 0);
                break;
            case 'selectAll':
                this.pageStructure.selectedPages = this.pageStructure.pages;
                break;
            case 'clearSelection':
                this.pageStructure.clearSelection();
                break;
        }
        this.changeRef.detectChanges();
    }

}
