import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../services/search/search.service';
import {Page} from '../../models/page-interface';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild("searchInput", { static: true }) searchInput;

  constructor(public searchService: SearchService, public pageStructureService: PageStructureService) { }

  ngOnInit() {
    this.searchInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.searchService.keyword = "";
    this.pageStructureService.results = [];
  }

  handleKeyDown() {
    try {
      if (this.pageStructureService.results[0]) {
        this.click(this.pageStructureService.results[0]);
      }
    } catch (e) {

    }
  }

  click(page: Page) {
    this.searchService.toggle();
    this.pageStructureService.triggerScrollToPage(page);
    this.searchService.keyword = "";
  }

  updateResults() {
    this.pageStructureService.search(this.searchService.keyword);
  }
}
