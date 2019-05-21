import {ChangeDetectionStrategy, Component, Input, NgZone} from '@angular/core';
import {PageStructureService} from '../../services/PageStructure/page-structure.service';
import {Page} from '../../models/page-interface';

@Component({
  selector: 'app-mini-page-menu',
  templateUrl: './mini-page-menu.component.html',
  styleUrls: ['./mini-page-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniPageMenuComponent {

  @Input()
  page: Page;

  constructor(
      private pageStructure: PageStructureService,
      private ngZone: NgZone
  ) {
  }

  public delete(): void {
    this.ngZone.run(() => this.pageStructure.removePage(this.page));
  }

  public copy(): void {
    this.pageStructure.addToClipboard([this.page]);
  }

  public cut(): void {
    this.ngZone.run(() => this.pageStructure.cut([this.page]));
  }

}
