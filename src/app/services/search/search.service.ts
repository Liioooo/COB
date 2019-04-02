import { Injectable } from '@angular/core';
import {PageStructureService} from '../PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  show: boolean = false;
  keyword: string = "";
  constructor(
    public pageStructure: PageStructureService
  ) { }

  toggle() {
    this.show = !this.show;
  }

  getResults(): Page[] | undefined {
    if (this.keyword === "") { return undefined; }
    const pages = this.pageStructure.pages.filter((page: Page) => page.questionId.includes(this.keyword));
    return pages.length === 0 ? undefined : pages;
  }

}
