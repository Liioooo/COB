import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/sidebar/sidebar.service';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {PageViewGridService} from '../../services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  constructor(
      public sidebarService: SidebarService,
      private pageStructure: PageStructureService,
      private pageViewGrid: PageViewGridService
  ) { }

  ngOnInit() {
  }

  addPage() {
    const pos = this.pageViewGrid.getPosForNewPage();
    this.pageStructure.addPage({
      questionId: '' + Math.random(),
      templateType: 'AdvisorLogin',
      connections: [],
      posX: pos.x,
      posY: pos.y
    });
  }

}
