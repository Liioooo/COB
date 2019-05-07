import {ChangeDetectorRef, Component, HostListener, NgZone, OnInit, ViewChild} from "@angular/core";
import {PageViewGridService} from "./services/page-view-grid/page-view-grid.service";
import {PageStructureService} from "./services/PageStructure/page-structure.service";
import {ElectronService} from "ngx-electron";
import {MatIconRegistry} from "@angular/material";
import {SearchService} from "./services/search/search.service";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {el} from '@angular/platform-browser/testing/src/browser_util';
import * as fs from "fs";
import {FileIOService} from './services/file-IO/file-io.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    fadeInOnEnterAnimation({duration: 50}),
    fadeOutOnLeaveAnimation({duration: 50})
  ]
})
export class AppComponent implements OnInit {

  @ViewChild("mainView") mainView: any;
  @ViewChild("search") search;



  public showRightClickMenu: boolean = false;
  public rcPos: { x: number, y: number };


  constructor(
    public pageStructure: PageStructureService,
    public pageViewGrid: PageViewGridService,
    private electronService: ElectronService,
    matIconRegistry: MatIconRegistry,
    private ngZone: NgZone,
    private changeDetRef: ChangeDetectorRef,
    public searchService: SearchService,
    private fileIO: FileIOService
  ) {
    matIconRegistry.registerFontClassAlias("fontawesome", "fa");
    matIconRegistry.registerFontClassAlias("fontawesomeRegular", "far");
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyPressed(e));
    });
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on("menuClick", (event, response) => this.handleMenuClick(event, response));
  }

  onKeyPressed(event: KeyboardEvent) {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        switch (event.code) {
          case 'KeyE':
              this.fileIO.exportJSONs();
              break;
          case 'KeyI':
            this.fileIO.importJSONs();
            break;
          case 'KeyS':
            this.fileIO.saveAs();
            break;
          case 'KeyN':
            this.fileIO.new();
            break;
        }
      } else {
        switch (event.code) {
          case "KeyN":
            const pos = this.pageViewGrid.getPosForNewPage();
            this.pageStructure.addEmptyPage(pos.x, pos.y);
            this.changeDetRef.detectChanges();
            break;
          case "KeyC":
            this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
            this.changeDetRef.detectChanges();
            break;
          case "KeyX":
            this.pageStructure.cut(this.pageStructure.selectedPages);
            this.changeDetRef.detectChanges();
            break;
          case "KeyV":
            const pos0 = this.pageViewGrid.getNextGridPositionMultiPix(this.pageStructure.clipboard, 0, 0, false);
            this.pageStructure.pasteClipboard(pos0.x, pos0.y);
            this.changeDetRef.detectChanges();
            break;
          case "KeyA":
            this.pageStructure.selectedPages = [...this.pageStructure.pages];
            this.changeDetRef.detectChanges();
            break;
          case "KeyD":
            this.pageStructure.clearSelection();
            this.changeDetRef.detectChanges();
            break;
          case "KeyF":
            this.searchService.toggle();
            break;
          case "KeyO":
            this.fileIO.open();
            break;
        }
      }
    } else if (event.shiftKey) {
        switch (event.code) {
          case "ArrowUp":
            this.moveSelected(0, -1);
            break;
          case "ArrowDown":
            this.moveSelected(0, 1);
            break;
          case "ArrowLeft":
            this.moveSelected(-1, 0);
            break;
          case "ArrowRight":
            this.moveSelected(1, 0);
            break;
        }
      } else if (!event.altKey) {
        switch (event.code) {
          case "Delete":
            this.pageStructure.removeSelectedPages();
            this.changeDetRef.detectChanges();
            break;
          case "Escape":
            if (this.searchService.show) { this.searchService.toggle(); }
            break;
          case "ArrowUp":
            this.pageViewGrid.moveSelection("UP");
            break;
          case "ArrowDown":
            this.pageViewGrid.moveSelection("DOWN");
            break;
          case "ArrowLeft":
            this.pageViewGrid.moveSelection("LEFT");
            break;
          case "ArrowRight":
            this.pageViewGrid.moveSelection("RIGHT");
            break;
        }
      }
  }

  private moveSelected(x: number, y: number): void {
    const pos = this.pageViewGrid.getNextGridPositionMulti(this.pageStructure.selectedPages, x, y, true);
    this.pageStructure.selectedPages.forEach(selPage => {
      selPage.posX += pos.x;
      selPage.posY += pos.y;
    });
    this.changeDetRef.detectChanges();
    this.changeDetRef.detectChanges();
  }

  private handleMenuClick(event: any, response: any) {
    switch (response) {
      case "newPage":
        const pos = this.pageViewGrid.getPosForNewPage();
        this.pageStructure.addEmptyPage(pos.x, pos.y);
        break;
      case "deletePage":
        this.pageStructure.removeSelectedPages();
        break;
      case "copyPage":
        this.pageStructure.addToClipboard(this.pageStructure.selectedPages);
        break;
      case "cutPage":
        this.pageStructure.cut(this.pageStructure.selectedPages);
        break;
      case "pastePage":
        const pos0 = this.pageViewGrid.getNextGridPositionMultiPix(this.pageStructure.clipboard, 0, 0, false);
        this.pageStructure.pasteClipboard(pos0.x, pos0.y);
        break;
      case "selectAll":
        this.pageStructure.selectedPages = this.pageStructure.pages;
        break;
      case "clearSelection":
        this.pageStructure.clearSelection();
        break;
      case "export":
        this.fileIO.exportJSONs();
        break;
      case "import":
        this.fileIO.importJSONs();
        break;
      case "saveAs":
        this.fileIO.saveAs();
        break;
      case "save":
        this.fileIO.save();
        break;
      case "openFile":
        this.fileIO.open();
        break;
    }
    this.changeDetRef.detectChanges();
  }

  public onMouseDown(event: MouseEvent): void {
    if (event.target !== this.mainView.container.nativeElement) {
      return;
    }
    if (this.search) {
      if (event.target !== this.search.nativeElement && this.searchService.show) {
        this.searchService.toggle();
      }
    }
    if (event.button === 2) {
      this.showRightClickMenu = true;
      this.rcPos = {x: event.clientX, y: event.clientY};
    } else {
      this.showRightClickMenu = false;
    }
  }
}

