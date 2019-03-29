import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {PageViewGridService} from './services/page-view-grid/page-view-grid.service';
import {PageStructureService} from './services/PageStructure/page-structure.service';
import {ElectronService} from 'ngx-electron';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('mainView')
  public mainView: any;


  public showRightClickMenu: boolean = false;
  public rcPos: { x: number, y: number };
  public scrollPos: { x: number, y: number };

  constructor(
    public pageStructure: PageStructureService,
    public pageViewGrid: PageViewGridService,
    private electronService: ElectronService,
    private changeRef: ChangeDetectorRef,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('fontawesomeRegular', 'far');
  }

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
          const pos0 = this.pageViewGrid.getNextGridPositionMulti(this.pageStructure.clipboard, 0, 0, false);
          this.pageStructure.pasteClipboard(pos0.x, pos0.y);
          break;
        case 'KeyA':
          this.pageStructure.selectedPages = [...this.pageStructure.pages];
          break;
        case 'KeyD':
          this.pageStructure.clearSelection();
          break;
      }
    } else {
      if (event.code === 'Delete') {
        this.pageStructure.removeSelectedPages();
      }
    }
  }

  private handleMenuClick(event: any, response: any) {
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
        const pos0 = this.pageViewGrid.getNextGridPositionMulti(this.pageStructure.clipboard, 0, 0, false);
        this.pageStructure.pasteClipboard(pos0.x, pos0.y);
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

  public onMouseDown(event: MouseEvent): void {
    if (event.target !== this.mainView.container.nativeElement) {
      return;
    }
    if (event.button === 2) {
      this.showRightClickMenu = true;
      this.rcPos = {x: event.clientX, y: event.clientY};
      this.scrollPos = {
        x: this.mainView.container.nativeElement.parentElement.scrollLeft,
        y: this.mainView.container.nativeElement.parentElement.scrollTop
      };
    } else {
      this.showRightClickMenu = false;
    }
  }
}

