import {Component, Input, OnInit} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';

@Component({
  selector: 'app-mini-page-menu',
  templateUrl: './mini-page-menu.component.html',
  styleUrls: ['./mini-page-menu.component.scss']
})
export class MiniPageMenuComponent implements OnInit {

  @Input()
  page: Page;

  constructor(private pageStructure: PageStructureService) {
  }

  ngOnInit() {
  }

  public delete(): void {
    this.pageStructure.removePage(this.page);
  }

  public copy(): void {
    this.pageStructure.addToClipboard([this.page]);
  }

  public cut(): void {
    this.pageStructure.cut([this.page]);
  }

}
