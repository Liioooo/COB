import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  constructor(public searchService: SearchService) { }

  ngOnInit() {
  }

}
