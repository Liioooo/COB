import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
