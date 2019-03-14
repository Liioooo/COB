import { Component } from '@angular/core';
import {SidebarService} from './services/sidebar/sidebar.service';
import {PageViewGridService} from './services/page-view-grid/page-view-grid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'COB';

  constructor(public sidebarService: SidebarService, public pageViewGrid: PageViewGridService) {}

}
