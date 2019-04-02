import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild("searchInput") searchInput;

  constructor(public searchService: SearchService) { }

  ngOnInit() {
    this.searchInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.searchService.keyword = "";
  }

  handleKeyDown() {
    try {
      const pages = this.searchService.getResults();
      if (pages[0]) {
        this.searchService.click(pages[0]);
      }
    } catch (e) {

    }
  }
}
