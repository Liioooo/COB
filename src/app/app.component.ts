import {ChangeDetectorRef, Component, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
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

  constructor(
    public pageStructure: PageStructureService,
    public pageViewGrid: PageViewGridService,
    private electronService: ElectronService,
    private changeRef: ChangeDetectorRef,
    matIconRegistry: MatIconRegistry,
    private ngZone: NgZone,
    private changeDetRef: ChangeDetectorRef
  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('fontawesomeRegular', 'far');
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyPressed(e));
    });
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('menuClick', (event, response) => this.handleMenuClick(event, response));
  }

  onKeyPressed(event: KeyboardEvent) {
    if (event.ctrlKey) {
      switch (event.code) {
        case 'KeyN':
          const pos = this.pageViewGrid.getPosForNewPage();
          this.pageStructure.addEmptyPage(pos.x, pos.y);
          this.changeDetRef.detectChanges();
          break;
        case 'KeyC':
          this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
          this.changeDetRef.detectChanges();
          break;
        case 'KeyX':
          this.pageStructure.cut(this.pageStructure.selectedPages);
          this.changeDetRef.detectChanges();
          break;
        case 'KeyV':
          const pos0 = this.pageViewGrid.getNextGridPositionMulti(this.pageStructure.clipboard, 0, 0, false);
          this.pageStructure.pasteClipboard(pos0.x, pos0.y);
          this.changeDetRef.detectChanges();
          break;
        case 'KeyA':
          this.pageStructure.selectedPages = [...this.pageStructure.pages];
          this.changeDetRef.detectChanges();
          break;
        case 'KeyD':
          this.pageStructure.clearSelection();
          this.changeDetRef.detectChanges();
          break;
      }
    } else {
      if (event.code === 'Delete') {
        this.pageStructure.removeSelectedPages();
        this.changeDetRef.detectChanges();
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
    } else {
      this.showRightClickMenu = false;
    }
  }
}

