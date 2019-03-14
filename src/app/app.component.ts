import { Component } from '@angular/core';
import {SidebarService} from './services/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'COB';

  constructor(public sidebarService: SidebarService) {}

}
