import { Component, OnInit } from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(public pageStructure: PageStructureService) { }

  ngOnInit() {
  }

}
